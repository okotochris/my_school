const express = require('express')
const Studentpassport = require("../schema/goldenPassport.js");
const PBlog = require("../schema/primary.js"); //basic class
const nuseryBlog = require("../schema/nursery.js"); // nursery
const Blog = require("../schema/data.js"); //junior class
const SBlog = require("../schema/datas.js"); // sinior class
const router = express.Router()

router.patch("/update-student", async (req, res) => {
  const { studentId, userName, addmissionNo, dob, classN, gender } = req.body; 
  try {
    const updatedStudent = await Studentpassport.findOneAndUpdate(
      { studentId }, // Use studentId to identify the student
      {
        userName,
        addmissionNo,
        dob,
        gender,
        class: classN,
        schoolName: req.session.school,
      },
      { new: true } // Return the updated document
    );

    if (updatedStudent) {
      res.status(200).json(updatedStudent);
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//UPDATING BASIC SCHOOL RESULT
router.patch("/update_basic_result", async (req, res) => {
let { studentId, term, class: sClass } = req.body;
  studentId = studentId.trim()
 
  try {
    let updated = await PBlog.findOneAndUpdate(
      { studentId, term, class:sClass },
      req.body,
      { new: true }
    );
    console.log(updated)
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
//UPDATING NURSERY
router.patch("/update_nursery_result", async (req, res) => {
  let { studentId, term, class: sClass } = req.body;
   studentId = studentId.trim()
  console.log(studentId, term, sClass)
  try {
    let updated = await nuseryBlog.findOneAndUpdate(
      { studentId, term, class:sClass },
      req.body,
      { new: true }
    );
    if (updated) {
      res.status(200).send("Updated successfully");
    } else {
      res.status(404).send("result not found");
    }
  } catch {
    res.status(500).send(err);
  }
});
//UPDATING JUNIOR SCHOOL RESULT
router.patch("/update_junior_result", async (req, res) => {
  const { studentId, term, sClass } = req.body;
  try {
    let updated = await Blog.findOneAndUpdate(
      { studentId, term, sClass },
      req.body,
      { new: true }
    );
    if (updated) {
      res.status(200).send("Updated successfully");
    } else {
      res.status(404).send("result not found");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});
//UPDATING SENIOR SCHOOL RESULT
router.patch("/update_senior_result", async (req, res) => {
  const { studentId, term, sClass } = req.body;
  try {
    let updated = await SBlog.findOneAndUpdate(
      { studentId, term, sClass },
      req.body,
      { new: true }
    );
    if (updated) {
      res.status(200).send("Updated successfully");
    } else {
      res.status(404).send("result not found");
    }
  } catch (err) {
    res.status(500).send('server error');
  }
});
//UPDATE STUDENT CLASS
router.patch("/updatestudentclass", async (req, res) => {
  let studentId = req.body.studentId;
  try {
    let student = await Studentpassport.findOneAndUpdate(
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

module.exports = router;