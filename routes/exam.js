const express = require('express')

const router = express.Router()

router.get('/myschool/quiz', (req, res)=>{

    try {
        res.render('quiz')
    } catch (error) {
        res.status(500)
        console.log(error)
    }
})

router.get('/myschool/quiz/exam', (req, res)=>{
    res.render('exam')
})
router.get('/myschool/quiz/exam/summary', (req, res)=>{
    res.render('exam-summary')
})
router.get('/myschool/quiz/exam_intro', (req, res)=>{
    res.render('exam_intro')
})

module.exports = router