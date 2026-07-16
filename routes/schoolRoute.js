const express = require('express');
const schoolPfofile = require('../schema/schoolProfile') 
const isAuthenticated = require('../utility/authenticated.js')
const StudentProfile = require('../schema/studentProfile.js')
const ABlog = require('../schema/admin.js')
const Blacklist = require('../schema/blacklist.js')
const Attendance = require('../schema/attendance.js')
const router = express.Router()



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
  const staff = (await ABlog.find({school:req.session.school}))
  res.render('staff', { school: req.session.school, fees, staff, role, title:"Staff Management" })
})

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


router.get('/admin/school-setting', async(req, res)=>{
  const student = await StudentProfile.findOne({ studentId: req.params.studentId});
   res.render("school_settings", { student, school: req.session.school, title: "Student Profile" });
})

router.get('/admin/exam-settings', isAuthenticated, async(req, res)=>{
  const role= req.session.role
  const fees = await schoolFees(req.session.school)
    res.render('exam_settings', { school: req.session.school, fees, role, title: "Onboard Student"})
})
router.get('/admin/upload-question', isAuthenticated, async(req, res)=>{
  const role= req.session.role
  const fees = await schoolFees(req.session.school)
    res.render('upload_question', { school: req.session.school, fees, role, title: "Onboard Student"})
})
router.get('/admin/attendance', isAuthenticated, async(req, res)=>{
  const role= req.session.role
  const fees = await schoolFees(req.session.school)
    res.render('attendance', { school: req.session.school, fees, role, title: "Onboard Student"})
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


module.exports = router;