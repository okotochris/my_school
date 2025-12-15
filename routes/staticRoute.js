const express = require('express')

const router = express.Router()

router.get('/privacy-policy', (req, res) => res.render('privacy-policy'));
router.get('/terms-of-service', (req, res) => res.render('terms-of-service'));
router.get('/contact', (req, res) => res.render('contact'));
module.exports = router