const express = require('express')
const puppeteer = require('puppeteer');
const StudentProfile = require('../schema/studentProfile')
const School = require('../schema/schoolProfile')
const StudentResult = require('../schema/studentResult')

const router = express.Router()

// ===============================
// PDF DOWNLOAD
// ===============================

router.get('/result/:id/pdf', async (req, res) => {

    try {

        const { default: puppeteer } = await import('puppeteer');

        const resultData = await StudentResult.findById(req.params.id);

        if (!resultData) {
            return res.status(404).send('Result not found');
        }

        const browser = await puppeteer.launch({
            headless: true
        });

        const page = await browser.newPage();

        await page.goto(
            `${process.env.DOMAINNAME}/result/pdf-view/${resultData._id}`,
            {
                waitUntil: 'networkidle0'
            }
        );

        const pdf = await page.pdf({
            format: 'A4',
            printBackground: true,
            preferCSSPageSize: true
        });

        await browser.close();

        res.setHeader('Content-Type', 'application/pdf');

        res.setHeader(
            'Content-Disposition',
            'attachment; filename="student-result.pdf"'
        );

        res.send(pdf);

    } catch (error) {

        console.error(error);

        res.status(500).send('Unable to generate PDF');
    }

});

router.get('/result/:id/image', async (req, res) => {

    try {

        const { default: puppeteer } = await import('puppeteer');

        // Find the result
        const resultData = await StudentResult.findById(req.params.id);

        if (!resultData) {
            return res.status(404).send('Result not found');
        }

        const browser = await puppeteer.launch({
            headless: true
        });

        const page = await browser.newPage();

        // A4-like size
        await page.setViewport({
            width: 794,
            height: 1123,
            deviceScaleFactor: 2
        });

        // Open result page
        await page.goto(
            `${process.env.DOMAINNAME}/result/pdf-view/${resultData._id}`,
            {
                waitUntil: 'networkidle0'
            }
        );

        // Apply print CSS
        await page.emulateMediaType('print');

        // Take screenshot
        const image = await page.screenshot({
            type: 'jpeg',
            quality: 95,
            fullPage: true
        });

        await browser.close();

        res.setHeader('Content-Type', 'image/jpeg');

        res.setHeader(
            'Content-Disposition',
            'attachment; filename="student-result.jpg"'
        );

        res.send(image);

    } catch (error) {

        console.error(error);

        res.status(500).send(
            'Unable to generate result image'
        );
    }

});

// ===============================
// PAGE PUPPETEER CAPTURES
// ===============================

router.get('/result/pdf-view/:id', async (req, res) => {

    try {
        const result = await StudentResult.findById(req.params.id);
        if (!result) {
            return res.status(404).send('Result not found');
        }
        const schoolName = result.schoolName
  
        const school = await School.findOne({schoolName})

        const studentId = result.studentId
        const student = await StudentProfile.findOne({studentId})

        const resultTemplate = `resultTemplate/${school.resultTemplate}`
        // Example:
        // determine the school from resultData
        // then select the appropriate EJS template

        res.render(resultTemplate, {
            result, school, student
        });

    } catch (error) {

        console.error(error);

        res.status(500).send('Unable to load result');
    }

});


module.exports = router;