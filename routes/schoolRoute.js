const express = require('express');
const schoolPfofile = require('../schema/schoolProfile') 
const isAuthenticated = require('../utility/authenticated.js')
const StudentProfile = require('../schema/studentProfile.js')
const Teacher = require('../schema/admin.js')
const Blacklist = require('../schema/blacklist.js')
const Attendance = require('../schema/attendance.js')
const Subject = require('../schema/subject.js')
const upload = require('../middleware/upload.js')
const cloudinary = require('../middleware/cloudinary.js')
const router = express.Router()
const schoolSection = require('../utility/schoolSection.js')


async function schoolFees(school){
    const data  = await schoolPfofile.findOne({schoolName:school})
    return data.fees;
}
//BLACKLIST API
router.get("/blacklist", isAuthenticated, async (req, res) => {
    const role= req.session.role
    const fees = await schoolFees(req.session.school)
  try {
    let school = req.session.school;
    const data = await Blacklist.find({ school: school });
    res.render("blacklist", { data, school: req.session.school, fees, role, title:"Black List" });
  } catch (err) {
    console.log(err);
  }
});

router.get('/staffmanagement', isAuthenticated, async (req, res)=>{
  const role= req.session.role
  if(role !== "admin"){
    res.redirect('/admin')
  }
  const fees = await schoolFees(req.session.school)
  const staff = (await Teacher.find({school:req.session.school}))
  res.render('staff', { school: req.session.school, fees, staff, role, title:"Staff Management" })
})
//GET ALL TEACHER IN A SCHOOOL
router.get('/api/teachers', async(req, res)=>{
    try {
        const teachers = await Teacher.find({school:req.session.school})
        res.status(200).json({teachers, message:"successful"})
    } catch (error) {
        res.status(500).json({message:'server error'})
    }
})
//GET SUBJECT OF A CLASS
router.get('/api/all_subject', async(req, res)=>{
    try {
        const subject = await Subject.find({schoolName:req.session.school})
        
        res.status(200).json({subject})
    } catch (error) {
        res.status(500).json({message:"Server error"})
        console.log(error)
    }
})
//UPLOAD SUBJECT
router.post('/api/upload-subject', async (req, res) => {
  
    try {

        const { subjectObj, subjectClass } = req.body;

        const schoolName = req.session.school;

        let subject = await Subject.findOne({
            schoolName,
            subjectClass
        });

        // First time for this class
        if (!subject) {

            subject = await Subject.create({
                schoolName,
                subjectClass,
                subjects: subjectObj
            });

            return res.status(201).json({
                message: "Subjects created successfully.",
                data: subject
            });

        }

        // Existing subject names
        const existingSubjects = subject.subjects.map(s =>
            s.subjectName.toLowerCase().trim()
        );

        // Keep only subjects that don't already exist
        const newSubjects = subjectObj.filter(s =>
            !existingSubjects.includes(
                s.subjectName.toLowerCase().trim()
            )
        );

        // If everything already exists
        if (newSubjects.length === 0) {
            return res.status(200).json({
                message: "All selected subjects already exist."
            });
        }

        // Add only the new ones
        subject.subjects.push(...newSubjects);

        await subject.save();

        res.status(200).json({
            message: `${newSubjects.length} subject(s) added successfully.`,
            added: newSubjects
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error"
        });

    }
});

//DELETE SUBJECT
router.delete("/api/subject/:class/:subjectId", async (req, res) => {
    try {
        const { class: subjectClass, subjectId } = req.params;

        const schoolName = req.session.school;

        const subject = await Subject.findOne({
            schoolName,
            subjectClass
        });

        if (!subject) {
            return res.status(404).json({
                message: "Class not found."
            });
        }

        subject.subjects = subject.subjects.filter(
            item => item._id.toString() !== subjectId
        );

        await subject.save();

        res.status(200).json({
            message: "Subject deleted successfully."
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Server error."
        });

    }
});


//STUDENT ID FORM
router.get("/studentid", isAuthenticated, async(req, res) => {
   const role= req.session.role
    const fees = await schoolFees(req.session.school)
    res.render("studentid", { school: req.session.school, fees, role, title:"Student ID" });
});


//STUDENT GRADING
router.get("/studentgrade", async (req, res) => {
   const role= req.session.role
       const fees = await schoolFees(req.session.school)
  res.render("studentgrade", { school: req.session.school, fees, role, title:"Student Grade" });
});

//UPDATING STUDENT RECORD PAGE
router.get("/update", isAuthenticated, async(req, res) => {
  const role= req.session.role
    const fees = await schoolFees(req.session.school)
  res.render("update", { school: req.session.school, fees, role, title:"Update Info" });
  
});
//generating student id and passport page
router.get("/generateid", isAuthenticated, async(req, res) => {
  const role= req.session.role
  const fees = await schoolFees(req.session.school)
  res.render("generateid", { school: req.session.school, fees, role, title: "Onboard Student"});
});

router.get("/student-profile/:studentId", async (req, res) => {
    try {
        const student = await StudentProfile.findOne({ studentId: req.params.studentId});
        if (!student) {
            return res.status(404).send("Student not found");
        }
        res.render("student-profile", { student, school: req.session.school, title: "Student Profile" });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/admin/exam-settings', isAuthenticated, async(req, res)=>{
  const role= req.session.role
  const fees = await schoolFees(req.session.school)
    res.render('exam_settings', { school: req.session.school, fees, role, title: "Exam settings"})
})
router.get('/admin/upload-question', isAuthenticated, async(req, res)=>{
  const role= req.session.role
  const fees = await schoolFees(req.session.school)
    res.render('upload_question', { school: req.session.school, fees, role, title: "Upload question"})
})
router.get('/admin/attendance', isAuthenticated, async(req, res)=>{
  const role= req.session.role
  const fees = await schoolFees(req.session.school)
    res.render('attendance', { school: req.session.school, fees, role, title: "Student Attendance", schoolSection})
})

//ATTENCE ROUTER
router.post("/admin/update_attendance", isAuthenticated, async (req, res) => {
    const {
        studentClass,
        term,
        session,
        date,
        attendance: attendanceData
    } = req.body;

    try {

        const schoolName = req.session.school;

        if (!schoolName) {
            return res.status(404).json({
                message: "School not found."
            });
        }
        const existingAttendance = await Attendance.findOne({
            schoolName,
            class: studentClass,
            term,
            session,
            date
        });

        if (existingAttendance) {
            return res.status(409).json({
                message: "Attendance has already been taken for this class today."
            });
        }

      
        const record = new Attendance({
            schoolName,
            class: studentClass,
            term,
            session,
            date,
            attendance: attendanceData
        });

        await record.save();

        return res.status(200).json({
            message: "Attendance saved successfully."
        });

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            message: "Server error."
        });

    }

});

router.patch(
  '/api/assign-class-teacher',
  upload.fields([
    { name: 'passport', maxCount: 1 },
    { name: 'signature', maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      const { classes, teacher, phoneContact } = req.body;

      const passport = req.files?.passport?.[0];
      const signature = req.files?.signature?.[0];

      // Upload if present, otherwise null
      const passportResult = passport
        ? await cloudinary.uploader.upload(passport.path, { folder: 'passport' })
        : null;

      const signatureResult = signature
        ? await cloudinary.uploader.upload(signature.path, { folder: 'signature' })
        : null;

      // Safely extract values (null if no upload)
      const passportUrl = passportResult?.secure_url || null;
      const passportPublicId = passportResult?.public_id || null;

      const signatureUrl = signatureResult?.secure_url || null;
      const signaturePublicId = signatureResult?.public_id || null;

      // Update teacher record
      const teacherInfo = await Teacher.findOneAndUpdate(
        { user_name: teacher, school: req.session.school },
        {
          classControl: { studentClass: classes },
          phoneContact,
          passport: {
            image: passportUrl,
            public_id: passportPublicId
          },
          signature: {
            image: signatureUrl,
            public_id: signaturePublicId
          }
        },
        { new: true } // return updated doc
      );

      res.status(200).json({
        message: 'Teacher assigned successfully',
        teacherInfo
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

router.get('/admin/assign-class-teacher', isAuthenticated, async (req, res) => {
    const role= req.session.role
    const fees = await schoolFees(req.session.school)
     const teachers = await Teacher.find({ classControl: { $ne: null }, school: req.session.school }).sort({updatedAt: -1});
    res.render('assign-class-teacher', {
        school: req.session.school,
        fees,
        role,
        teachers,
        title: 'Assign Class Teacher'
    });
});
router.delete('/api/assign-class-teacher/:teacherId', async (req, res) => {
    try {
        const { teacherId } = req.params;
        await Teacher.findByIdAndUpdate(teacherId, { classControl: null });
        res.status(200).json({ message: 'Teacher unassigned successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/admin/school-setting', isAuthenticated, async(req, res)=>{
    const role= req.session.role
    const fees = await schoolFees(req.session.school)
    const teachers = await Teacher.find({ classControl: { $ne: null }, school: req.session.school }).sort({updatedAt: -1});
  
    res.render('school_settings', { school: req.session.school, fees, role, teachers, title: "School Management Settings"})
        
})
router.get('/admin/subject-management', isAuthenticated, async(req, res)=>{
    const role= req.session.role
    const fees = await schoolFees(req.session.school)
    const teachers = await Teacher.find({ classControl: { $ne: null }, school: req.session.school }).sort({updatedAt: -1});
  
    res.render('subject-management', { school: req.session.school, fees, role, teachers, title: "Subject Management Settings"})
        
})
router.get('/admin/timetable', isAuthenticated, async(req, res)=>{
    const role= req.session.role
    const fees = await schoolFees(req.session.school)
    const teachers = await Teacher.find({ classControl: { $ne: null }, school: req.session.school }).sort({updatedAt: -1});
  
    res.render('timetable', { school: req.session.school, fees, role, teachers, title: "Timetable Management"})
        
})
module.exports = router;