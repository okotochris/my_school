const express = require('express')

const router = express.Router()

router.get('/result_check_guide', (req, res)=>{
    res.render('result_check_guide')
})
router.get('/waec', (req, res)=>{
    res.render('waec')
})
router.get('/jamb', (req, res)=>{
    res.render('jamb')
})
router.get('/post-utme', (req, res)=>{
    res.render('post-utme')
})
router.get('/neco', (req, res)=>{
    res.render('neco')
})
router.get('/nabteb', (req, res)=>{
    res.render('nabteb')
})
module.exports = router;
