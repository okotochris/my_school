const express = require('express');
const News = require('../schema/news')

const router = express.Router();

router.get('/student/dashboard', (req, res) => {
    
});

router.get('/student/profile', (req, res) => {
    res.render('student/profile', {
        title: 'Student Profile'
    });
});
router.get('/student/timetable', (req, res) => {
    res.render('student/timetable', {
        title: 'Student Timetable'
    });
});

router.get('/student/announcements', (req, res) => {
    res.render('student/announcement', {
        title: 'Student Announcement'
    });
});
router.get('/student/assignments', (req, res) => {
    res.render('student/assignments', {
        title: 'Student Assignments'
    });
});

router.get('/student/marks', (req, res) => {
    res.render('student/marks', {
        title: 'Student Marks'
    });
}
);
router.get('/student/settings', (req, res) => {
    res.render('student/settings', {
        title: 'Student Settings'
    });
})

router.get('/student/fees', (req, res) => {
    res.render('student/fees', {
        title: 'Student Fees'
    });
})

router.get('/student/exam', (req, res) => {
    res.render('student/exam', {
        title: 'Student Exam'
    });
})

router.get('/student/results', (req, res) => {
    res.render('student/result', {
        title: 'Student Result'
    });
});

//GET NEWS
router.get('/student/news/:studentClass/:schoolName', async(req, res)=>{
    try {
       const news = await News.find({studentClass, schoolName})
       res.status(200).json({message:'ok', news})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'server error'})
    }

})
//GET ASSIGNMENT
router.get('/student/assignment/:studentClass/:schoolName', async(req, res)=>{
    try {
       const news = await News.find({studentClass, schoolName})
       res.status(200).json({message:'ok', news})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'server error'})
    }

})
module.exports = router;