const express = require('express')

const router = express.Router()

router.get('/myschool/quiz', (req, res)=>{

    try {
        res.render('exam/quiz')
    } catch (error) {
        res.status(500)
        console.log(error)
    }
})

router.get('/myschool/quiz/exam', (req, res)=>{
    res.render('exam/exam')
})
router.get('/myschool/quiz/exam/summary', (req, res)=>{
    res.render('exam/exam-summary')
})
router.get('/myschool/quiz/exam_intro', (req, res)=>{
    res.render('exam/exam_intro')
})

module.exports = router