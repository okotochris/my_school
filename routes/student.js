const express = require('express');
const News = require('../schema/news')
const Assignment = require('../schema/assignment');
const { Page } = require('openai/pagination.js');
const router = express.Router();

router.get('/student/dashboard', (req, res) => {
    const announcement = News.find().sort({createdAt:-1})
    .limit(3)
    res.render('student/dashboard', {
        title: 'Student dashboard',
        announcement
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
        title: 'Student Announcement',
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
router.get('/api/student/assignment/:studentClass/:school', async (req, res) => {
    const { school, studentClass } = req.params;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const startingIndex = (page - 1) * limit;

        const totalAssignments = await Assignment.countDocuments({
            school,
            studentClass
        });

        const totalPages = Math.ceil(totalAssignments / limit);
        const assignment = await Assignment.find({
            school,
            studentClass
        })
        .skip(startingIndex)
        .limit(limit);

        const prevPage = page > 1
            ? {
                page: page - 1,
                limit
            }
            : null;

        const nextPage = page < totalPages
            ? {
                page: page + 1,
                limit
            }
            : null;

        res.status(200).json({
            assignment,
            prevPage,
            nextPage,
            currentPage: page,
            totalPages
        });

    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: 'Server error'
        });
    }
});
module.exports = router;