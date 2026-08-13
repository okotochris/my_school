const express = require('express');

const router = express.Router();

router.get('/student/dashboard', (req, res) => {
    res.render('student/dashboard', {
        title: 'Student Page'
    });
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
module.exports = router;