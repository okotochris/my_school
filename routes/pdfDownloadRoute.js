const { execFile } = require('child_process');
const { promisify } = require('util');
const fs = require('fs/promises');
const os = require('os');
const path = require('path');
const execFileAsync = promisify(execFile);
const express = require('express');
const puppeteer = require('puppeteer');
const isAuthenticated = require('../utility/authenticated.js');
const StudentProfile = require('../schema/studentProfile.js');
const SchoolProfile = require('../schema/schoolProfile');

const router = express.Router();
const jobs = new Map();

/* ======================= HELPERS ======================= */

class HttpError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}

// ---- progress jobs ----
function startJob(req) {
    const jobId = req.query.jobId ? String(req.query.jobId) : null;
    if (!jobId) return null;

    const job = {
        school: req.session.school,
        total: 0,
        completed: 0,
        percent: 0,
        stage: 'Preparing…',
        status: 'preparing'
    };
    jobs.set(jobId, job);
    setTimeout(() => jobs.delete(jobId), 10 * 60 * 1000).unref();   // forget it after 10 minutes
    return job;
}

function progress(job, percent, stage) {
    if (!job) return;
    job.status = 'processing';
    job.percent = Math.max(job.percent, Math.min(Math.round(percent), 100));
    if (stage) job.stage = stage;
}

function finishJob(job) {
    if (!job) return;
    job.status = 'completed';
    job.percent = 100;
    job.stage = 'Done';
}

function failJob(job, message) {
    if (!job) return;
    job.status = 'failed';
    job.error = message;
    job.stage = 'Failed';
}

// Rewrites Chromium's PDF as plain PDF 1.4 so CorelDRAW can open it.
// Falls back to the original buffer if Ghostscript isn't available.
async function makeCorelSafe(buf) {
    const gs = process.env.GS_PATH || (process.platform === 'win32' ? 'gswin64c' : 'gs');
    const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'cards-'));
    const inFile = path.join(dir, 'in.pdf');
    const outFile = path.join(dir, 'out.pdf');
    try {
        await fs.writeFile(inFile, buf);
        await execFileAsync(gs, [
            '-dBATCH', '-dNOPAUSE', '-dQUIET',
            '-sDEVICE=pdfwrite',
            '-dCompatibilityLevel=1.4',
            '-dPDFSETTINGS=/prepress',
            '-dEmbedAllFonts=true',
            `-sOutputFile=${outFile}`,
            inFile
        ]);
        return await fs.readFile(outFile);
    } catch (e) {
        console.error('Ghostscript step failed, sending original PDF:', e.message);
        return buf;
    } finally {
        await fs.rm(dir, { recursive: true, force: true });
    }
}

// Works with old archiver (function) and newer archiver (ZipArchive class)
async function createZip(opts) {
    const mod = await import('archiver');
    const lib = mod.default || mod;
    if (typeof lib === 'function') return lib('zip', opts);
    if (typeof mod.ZipArchive === 'function') return new mod.ZipArchive(opts);
    if (lib && typeof lib.ZipArchive === 'function') return new lib.ZipArchive(opts);
    throw new Error('Unsupported archiver version. Run: npm install archiver@7');
}

function readOptions(req) {
    return {
        selectedClass: String(req.query.class || 'ALL'),
        primary: req.query.primary || '#0b2a4a',
        secondary: req.query.secondary || '#17619a'
    };
}

// Loads students + school and renders the print template to an HTML string
async function renderCardsHtml(req, res, { selectedClass, primary, secondary }, exportMode) {
    const query = { schoolName: req.session.school };
    if (selectedClass !== 'ALL') query.class = selectedClass;

    const students = await StudentProfile.find(query).sort({ fullname: 1 }).lean();

    if (!students.length) {
        throw new HttpError(
            404,
            `No students found for ${selectedClass === 'ALL' ? 'this school' : selectedClass}`
        );
    }

    const schoolInfo = await SchoolProfile.findOne({ schoolName: req.session.school }).lean();

    return new Promise((resolve, reject) => {
        res.render(
            'student-card-print',
            { student: students, schoolInfo, selectedClass, primary, secondary, exportMode },
            (err, html) => (err ? reject(err) : resolve(html))
        );
    });
}

// Opens the HTML in Chromium and waits for styles, fonts and images (each with its own limit)
async function openPage(html, { deviceScaleFactor }) {
    const browser = await puppeteer.launch({
        headless: 'new',   // removes the deprecation warning on your Puppeteer version
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(120000);
        page.setDefaultTimeout(120000);

        // Track what is still loading so a timeout tells us which URL is the problem
        const pending = new Map();
        page.on('request', r => pending.set(r, r.url()));
        page.on('requestfinished', r => pending.delete(r));
        page.on('requestfailed', r => {
            pending.delete(r);
            console.warn('Request failed:', r.url().slice(0, 120), r.failure() && r.failure().errorText);
        });

        await page.setViewport({ width: 1240, height: 1754, deviceScaleFactor });

        try {
            await page.setContent(html, { waitUntil: 'domcontentloaded', timeout: 60000 });
        } catch (err) {
            console.error('Page still loading after 60s. Pending requests:',
                [...pending.values()].map(u => u.slice(0, 120)));
            throw err;
        }

        // 1. Tailwind (CDN) must have generated its styles: body has class bg-white
        try {
            await page.waitForFunction(
                () => getComputedStyle(document.body).backgroundColor === 'rgb(255, 255, 255)',
                { timeout: 30000 }
            );
        } catch {
            console.error('Tailwind did not apply. Pending requests:',
                [...pending.values()].map(u => u.slice(0, 120)));
            throw new HttpError(500, 'Tailwind CSS did not load. The server could not reach cdn.tailwindcss.com.');
        }

        // 2. Fonts and images, each with a cap so one slow file cannot block the export
        await page.evaluate(async () => {
            const cap = (p, ms) => Promise.race([p, new Promise(r => setTimeout(r, ms))]);

            await cap(document.fonts.ready, 10000);

            await Promise.all(
                Array.from(document.images).map(img =>
                    img.complete
                        ? Promise.resolve()
                        : cap(new Promise(res => { img.onload = res; img.onerror = res; }), 20000)
                )
            );
        });

        // Let layout settle after the last image
        await new Promise(r => setTimeout(r, 300));

        return { browser, page };
    } catch (err) {
        await browser.close().catch(() => {});
        throw err;
    }
}
function sendError(res, error, fallbackMessage) {
    console.error(fallbackMessage, error);
    if (!res.headersSent) {
        return res.status(error.status || 500).send(error.status ? error.message : fallbackMessage);
    }
    if (!res.writableEnded) res.destroy(error);
}

/* ======================= PDF ROUTE ======================= */

async function downloadPdf(req, res) {
    let browser;
    const job = startJob(req);

    try {
        const options = readOptions(req);

        progress(job, 5, 'Loading students…');
        const html = await renderCardsHtml(req, res, options, 'pdf');

        progress(job, 20, 'Building cards…');
        let page;
        ({ browser, page } = await openPage(html, { deviceScaleFactor: 1 }));

        progress(job, 40, 'Creating the PDF…');
        const raw = await page.pdf({
            format: 'A4',
            printBackground: true,
            preferCSSPageSize: true,
            tagged: false,
            outline: false,
            margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' }
        });

        progress(job, 75, 'Optimising for CorelDRAW…');
        const pdf = await makeCorelSafe(Buffer.from(raw));

        progress(job, 95, 'Sending the file…');

        const filename = `${options.selectedClass === 'ALL'
            ? 'all-students'
            : options.selectedClass.replace(/[^a-z0-9_-]/gi, '-')}-student-id-cards.pdf`;

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.setHeader('Content-Length', pdf.length);
        res.end(pdf);

        finishJob(job);

    } catch (error) {
        failJob(job, error.status ? error.message : 'PDF export failed');
        return sendError(res, error, 'Failed to generate the PDF.');
    } finally {
        if (browser) await browser.close().catch(() => {});
    }
}

router.get('/admin/student-card/download/pdf', isAuthenticated, downloadPdf);

/* ======================= PNG ROUTE ======================= */

router.get('/admin/student-card/download/png', isAuthenticated, async (req, res) => {
    let browser;
    const job = startJob(req);

    try {
        if (!job) throw new HttpError(400, 'Missing progress job ID');

        const options = readOptions(req);

        progress(job, 5, 'Loading students…');
        const html = await renderCardsHtml(req, res, options, 'png');

        progress(job, 15, 'Building cards…');
        // deviceScaleFactor 3 -> 660 x 1050 px per card (about 300 dpi for CR80)
        let page;
        ({ browser, page } = await openPage(html, { deviceScaleFactor: 3 }));

        const cards = await page.$$('.id-card');
        if (!cards.length) {
            throw new HttpError(500, 'No .id-card elements found. Check the class name in your EJS template.');
        }

        // Create the zip before any headers are sent, so a failure here still returns a clean error
        const archive = await createZip({ zlib: { level: 6 } });

        job.total = cards.length;
        progress(job, 20, `Capturing card 0 of ${cards.length}…`);

        const safeClass = options.selectedClass.replace(/[^a-z0-9_-]/gi, '-');

        res.setHeader('Content-Type', 'application/zip');
        res.setHeader('Content-Disposition', `attachment; filename="${safeClass}-student-cards-png.zip"`);

        archive.on('warning', err => console.warn('ZIP warning:', err.message));
        archive.on('error', err => {
            console.error('ZIP archive error:', err);
            failJob(job, 'PNG export failed');
            if (!res.headersSent) res.status(500).send('Failed to create the ZIP.');
            else res.destroy(err);
        });

        archive.pipe(res);

        for (let i = 0; i < cards.length; i++) {
            const image = await cards[i].screenshot({ type: 'png' });
            const base = await cards[i].evaluate(el => el.dataset.file);

            archive.append(image, {
                name: `${base || `card-${String(i + 1).padStart(3, '0')}`}.png`
            });

            job.completed = i + 1;
            // cards fill the 20% to 95% part of the bar
            progress(job, 20 + ((i + 1) / cards.length) * 75, `Capturing card ${i + 1} of ${cards.length}…`);
        }

        progress(job, 97, 'Packing the ZIP…');
        await archive.finalize();
        finishJob(job);

    } catch (error) {
        failJob(job, error.status ? error.message : 'PNG export failed');
        return sendError(res, error, 'Failed to export student card images.');
    } finally {
        if (browser) await browser.close().catch(() => {});
    }
});

/* ======================= PROGRESS ROUTE ======================= */

router.get('/admin/student-card/download/progress/:jobId', isAuthenticated, (req, res) => {
    const job = jobs.get(req.params.jobId);

    // Only the school that started the job can read its progress
    if (!job || job.school !== req.session.school) {
        return res.status(404).json({ error: 'Progress job not found' });
    }

    const { total, completed, percent, stage, status, error } = job;
    res.setHeader('Cache-Control', 'no-store');
    res.json({ total, completed, percent, stage, status, error });
});

/* Old URL kept so older pages keep working: same as /pdf */
router.get('/admin/student-card/download', isAuthenticated, downloadPdf);

module.exports = router;