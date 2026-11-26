const express = require("express");
const puppeteer = require("puppeteer");
const StudentProfile = require("../schema/studentProfile");
const School = require("../schema/schoolProfile");
const StudentResult = require("../schema/studentResult");
const isAuthenticated = require('../utility/authenticated.js');
const router = express.Router();

// ===============================
// PDF DOWNLOAD
// ===============================

router.get('/result/pdf-view', async (req, res) => {
  try {
    const { session, sclass, term, schoolName } = req.query;

    if (!session || !term || !schoolName) {
      return res.status(400).send('Missing result selection details.');
    }

    const filter = {
      section: session,
      term,
      schoolName
    };

    // Only filter by class when one is supplied
    if (sclass) {
      filter.studentClass = sclass;
    }

    const [school, results] = await Promise.all([
      School.findOne({ schoolName }).lean(),
      StudentResult.find(filter).sort({ studentClass: 1, fullname: 1 }).lean()
    ]);

    if (!school) {
      return res.status(404).send('School not found.');
    }

    if (!results.length) {
      return res.status(404).send('No results found.');
    }

    return res.render(`resultTemplate/${school.resultTemplate}`, {
      results,
      school,
      sclass
    });

  } catch (error) {
    console.error(error);
    return res.status(500).send('Unable to load results.');
  }
});
router.get('/results/pdf', async (req, res) => {
  let browser;

  try {
    const { session, sclass, term, schoolName } = req.query;

    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    await page.setViewport({
      width: 794,
      height: 1123,
      deviceScaleFactor: 2
    });

   const params = new URLSearchParams({
    session,
    term,
    schoolName
});

if (sclass) {
  params.set('sclass', sclass);
}

await page.goto(
  `${process.env.DOMAINNAME}/result/pdf-view?${params.toString()}`,
  { waitUntil: 'networkidle0' }
);
    
    await page.emulateMediaType('print');

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="students-results.pdf"'
    );

    return res.send(pdf);

  } catch (error) {
    console.error('PDF generation error:', error);
    return res.status(500).send('Unable to generate PDF.');
  } finally {
    if (browser) await browser.close();
  }
});
router.get('/results/image', async (req, res) => {
  let browser;

  try {
    const { session, sclass, term, schoolName } = req.query;

    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    await page.setViewport({
      width: 794,
      height: 1123,
      deviceScaleFactor: 2
    });

  const params = new URLSearchParams({
  session,
  term,
  schoolName
});

if (sclass) {
  params.set('sclass', sclass);
}


    const response = await page.goto(
      `${process.env.DOMAINNAME}/result/pdf-view?${params}`,
      { waitUntil: 'networkidle0' }
    );

    if (!response || !response.ok()) {
      throw new Error('Unable to load results page');
    }

    await page.emulateMediaType('print');

    const image = await page.screenshot({
      type: 'jpeg',
      quality: 95,
      fullPage: true
    });

    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="students-results.jpg"'
    );

    return res.send(image);

  } catch (error) {
    console.error('Image generation error:', error);
    return res.status(500).send('Unable to generate image.');
  } finally {
    if (browser) await browser.close();
  }
});

module.exports = router;
