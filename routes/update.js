const express = require('express')
const router = express.Router()
const upload = require("../middleware/upload.js");
const cloudinary = require("../middleware/cloudinary.js");
const StudentResult = require('../schema/studentResult.js')
const isAuthenticated = require('../utility/authenticated.js')
const StudentProfile = require('../schema/studentProfile.js')
const fs = require("fs");

//UPDATE STUDENT PROFILE
router.patch("/update-student", upload.single("passport"), async (req, res) => {
  const { studentId, userName, addmissionNo, dobValue, classValue, gender } = req.body;

  if (!studentId) {
    return res.status(400).json({ message: "studentId is required" });
  }

  let image = null;
  if (req.file) {
    image = await cloudinary.uploader.upload(req.file.path);
    fs.unlinkSync(req.file.path); // remove local file
  }

  const updateData = {};
  if (userName) updateData.fullname = userName;
  if (addmissionNo) updateData.addmissionNo = addmissionNo;
  if (dobValue) updateData.dob = dobValue;
  if (gender) updateData.gender = gender;
  if (classValue) updateData.class = classValue;
  if (req.session.school) updateData.schoolName = req.session.school;
  if (image) updateData.passport = image.secure_url;

  try {
    const updatedStudent = await StudentProfile.findOneAndUpdate(
      { studentId },
      updateData,
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(updatedStudent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//UPDATING BASIC SCHOOL RESULT
router.patch("/update_student_result", async (req, res) => {
let { studentId, term, class: sClass } = req.body;
  studentId = studentId.trim()
 
  try {
    let updated = await PBlog.StudentResult(
      { studentId, term, class:sClass },
      req.body,
      { new: true }
    );

    if (updated) {
      res.status(200).send("updated successfully");
    } else {
      res.status(400).send("file not found");
    }
  } catch (err) {
    console.log(err)
    res.status(500).send("server error");
  }
});

//UPDATE STUDENT CLASS
router.patch("/updatestudentclass", async (req, res) => {
  let studentId = req.body.studentId;
  try {
    let student = await StudentProfile.findOneAndUpdate(
      { studentId },
      { class: req.body.studentClass },
      { new: true }
    );
    if (student.ok) {
      res.send("updated");
    }
  } catch (err) {
    console.log(err);
  }
});
//UPDATE UPDATE STUDENT
router.get("/update-result", isAuthenticated, (req, res) => {
  res.render("update_result");
});

module.exports = router;