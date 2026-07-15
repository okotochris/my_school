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
module.exports = router