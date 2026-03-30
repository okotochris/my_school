const express = require('express')
const Studentpassport = require("../schema/goldenPassport.js");
const PBlog = require("../schema/primary.js"); //basic class
const nuseryBlog = require("../schema/nursery.js"); // nursery
const Blog = require("../schema/data.js"); //junior class
const SBlog = require("../schema/datas.js"); // sinior class
const router = express.Router()
const upload = require("../middleware/upload.js");
const cloudinary = require("../middleware/cloudinary.js");
const fs = require("fs");

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
  if (userName) updateData.userName = userName;
  if (addmissionNo) updateData.addmissionNo = addmissionNo;
  if (dobValue) updateData.dob = dobValue;
  if (gender) updateData.gender = gender;
  if (classValue) updateData.class = classValue;
  if (req.session.school) updateData.schoolName = req.session.school;
  if (image) updateData.passport = image.secure_url;

  try {
    const updatedStudent = await Studentpassport.findOneAndUpdate(
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
router.patch("/update_basic_result", async (req, res) => {
let { studentId, term, class: sClass } = req.body;
  studentId = studentId.trim()
 
  try {
    let updated = await PBlog.findOneAndUpdate(
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

//UPDATING NURSERY
router.patch("/update_nursery_result", async (req, res) => {
  let { studentId, term, class: sClass } = req.body;
   studentId = studentId.trim()
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
  const { studentId, term, class: sClass } = req.body;
  try {
    let updated = await Blog.findOneAndUpdate(
      { studentId, term, class:sClass },
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
    console.log(err)
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