const express = require('express');
const News = require('../schema/news')
const Assignment = require('../schema/assignment');
const { Page } = require('openai/pagination.js');
const upload = require('../middleware/upload')
const LessonNote = require('../schema/lessonNote')
const cloudinary = require('../middleware/cloudinary')
const Timetable = require('../schema/timeTable.js')
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
router.get('/student/assignments', (req, res) => {
    res.render('student/assignments', {
        title: 'Student Assignments'
    });
});
router.get('/student/assignment/:_id', async(req, res)=>{
    try{
        const _id = req.params._id
        const assignment = await Assignment.findOne({_id})
        res.render('student/assignment-details', {assignment, title:'Assignment'})
    }catch(err){
        console.log(err)
    }
})
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

router.patch(
    '/api/student/update-profile',
    upload.single('passport'),
    async (req, res) => {
        try {
            const { studentId } = req.body;

            if (!studentId) {
                return res.status(400).json({
                    success: false,
                    message: 'Student ID is required.'
                });
            }

            // Find student first
            const student = await StudentProfile.findOne({ studentId });

            if (!student) {
                return res.status(404).json({
                    success: false,
                    message: 'Student not found.'
                });
            }

            // Only allow students to update these fields
            const allowedUpdates = {
                fullname: req.body.fullname,
                dob: req.body.dob,
                gender: req.body.gender,
                email: req.body.email,
                address: req.body.address,
                house: req.body.house,

                // Guardian information
                'guardian.name': req.body.guardianName,
                'guardian.relationship': req.body.relationship,
                'guardian.phone': req.body.guardianPhone,
                'guardian.email': req.body.guardianEmail,
                'guardian.address': req.body.guardianAddress,
                'guardian.state': req.body.guardianState,
                'guardian.lga': req.body.guardianLga,

                // Emergency contact
                'emergencyContact.name': req.body.emergencyName,
                'emergencyContact.phone': req.body.emergencyPhone
            };

            // Remove undefined fields
            Object.keys(allowedUpdates).forEach(key => {
                if (allowedUpdates[key] === undefined) {
                    delete allowedUpdates[key];
                }
            });

            // Upload new passport if selected
            if (req.file) {
                const result = await cloudinary.uploader.upload(req.file.path);

                allowedUpdates.passport = result.secure_url;
            }

            // Update student
            const updatedStudent = await StudentProfile.findOneAndUpdate(
                { studentId },
                { $set: allowedUpdates },
                {
                    new: true,
                    runValidators: true
                }
            );

            return res.status(200).json({
                success: true,
                message: 'Student profile updated successfully.',
                student: updatedStudent
            });

        } catch (error) {
            console.error('Student profile update error:', error);

            return res.status(500).json({
                success: false,
                message: 'Unable to update student profile.'
            });
        }
    }
);
router.get('/student/lesson-note', (req, res)=>{
    res.render('student/lesson-note', {title:'Lesson Note'})
})
router.get('/student/lesson-notes', async (req, res) => {
    console.log(req.query)
    try {

        const { school, class: studentClass } = req.query;

        const lessonNotes = await LessonNote.find({
            schoolName: school,
            class: studentClass,
            status: 'published'
        }).sort({
            week: 1,
            createdAt: -1
        });
        res.json({
            success: true,
            data: lessonNotes
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: 'Unable to get lesson notes'
        });

    }

});
router.get("/student/lesson-notes/:_id", async (req, res) => {
    try {
        const { _id } = req.params;
       
        const lessonNote = await LessonNote.findOne({
            _id,
            status: "published"
        });

        if (!lessonNote) {
            res.redirect()
        }

          res.render('student/lesson-note-detail', {title:'Lesson Note', lessonNote}) 

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Unable to get lesson note"
        });
    }
});
router.get('/student/announcements', (req, res) => {

    res.render('student/announcement', {
        title: 'Student Announcement',
    });
});
router.get('/student/announcement/:_id', async (req, res) => {
    try {
        const { _id } = req.params;

        const announcement = await News.findOne({
            _id,
            status: 'published'
        });

        if (!announcement) {
            return res.status(404).json({
                success: false,
                message: 'Announcement not found'
            });
        }
    
        res.render('student/announcement-details', {
            title: 'Announcement',
            announcement
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: 'Unable to get announcement'
        });

    }
});
router.get('/student/announcement-all/:schoolName', async (req, res) => {
    try {

        const { schoolName } = req.params;
        console.log('School Name:', schoolName);
        if (!schoolName) {
            return res.status(401).json({
                message: 'Student not authenticated'
            });
        }

        const announcements = await News.find({
            school: schoolName,
        })
        .sort({ publishedAt: -1 })
        .lean();

        console.log('Announcements:', announcements);
        res.json({
            announcements
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: 'Server error'
        });

    }
});

router.get('/admin/timetable/:class/:school', async (req, res) => {
    try {
        const school = req.params.school;
        const studentClass = req.params.class;
        const timetable = await Timetable.find({
            schoolName: school,
            studentClass: studentClass,
            status: 'active'
        })
        .sort({
            period: 1,
            startTime: 1
        })
        .lean();
        res.status(200).json(timetable)
    } catch (err) {
        console.error('Timetable detail error:', err);
        res.status(500).send('Server error');
    }
});

module.exports = router;