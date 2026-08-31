const express = require('express')
const puppeteer = require('puppeteer')

const router = express.Router()

router.get('/result/:id/pdf', async (req, res) => {

    try {

        const browser = await puppeteer.launch({
            headless: true
        });

        const page = await browser.newPage();

        await page.goto(
            `https://myschoolresult.com/result/${req.params.id}`,
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


        res.setHeader(
            'Content-Type',
            'application/pdf'
        );

        res.setHeader(
            'Content-Disposition',
            'attachment; filename="student-result.pdf"'
        );

        res.send(pdf);

    } catch (error) {

        console.error(error);

        res.status(500).send(
            'Unable to generate PDF'
        );
    }

});

router.get('/result/:id/jpg', async (req, res) => {
    try {
        const browser = await puppeteer.launch({
            headless: true
        });

        const page = await browser.newPage();

        await page.goto(
            `https://myschoolresult.com/result/${req.params.id}`,
            {
                waitUntil: 'networkidle0'
            }
        );

        const image = await page.screenshot({
            type: 'jpeg',
            quality: 95,
            fullPage: true
        });

        await browser.close();

        res.setHeader(
            'Content-Type',
            'image/jpeg'
        );

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

module.export = router;