const express = require("express");
const StudentProfile = require("../schema/studentProfile.js");
const StudentResult = require("../schema/studentResult.js"); // nursery
const isAuthenticated = require("../utility/authenticated.js");
const Attendance = require("../schema/attendance.js");
const router = express.Router();

router.get("/api/is_uploaded", async (req, res) => {
  try {
    const { sClass, term, id, sSection } = req.query;
    const result = await StudentResult.findOne({
      studentClass: sClass,
      term: term,
      studentId: id,
      section: sSection,
    });
    if (!result) {
      res.status(404).json({ message: "no result found" });
      return;
    }
    res.status(200).json({ msg: "result uploaded" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "server error" });
  }
});
router.get("/api/get_result", async (req, res) => {
  try {
    const { studentId } = req.query;
    const studentResult = await StudentResult.find({ studentId: studentId });

    if (studentResult.length > 0) {
      res.status(200).json(studentResult);
    } else {
      res.status(404).json({ msg: "result not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "server error" });
  }
});

router.get("/api/student", async (req, res) => {
  const { studentClass } = req.body;
  try {
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
//STUDENT PERFOMANCE API CALL
router.get("/studentperfomance", async (req, res) => {
  try {
    let studentClass = req.query.class;
    let newClass = studentClass.split(" ");
    let schoolName = req.session.school || "no school";
    result = await StudentResult.find({
      studentClass: new RegExp("^" + req.query.class),
      section: req.query.section,
      schoolName: { $regex: schoolName, $options: "i" },
    });

    if (!result) {
      return res.status(404).json({ message: "Data not found" });
    }
    res.json(result);
  } catch (err) {
    console.log(err);
  }
});
//searching student ID base on student name API CALL
router.get("/getstudentid", async (req, res) => {
  try {
    let student_name = req.query.student_name;
    let school = req.session.school;
    let studentId = await StudentProfile.find({
      schoolName: school,
      fullname: { $regex: student_name, $options: "i" },
    });
    if (!studentId) {
      res.status(404).json({ message: "Student not found" });
      return;
    }
    res.status(200).json(studentId);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

//getting student id by classname API CALL
router.get("/getclassid", async (req, res) => {
  let studentClass = req.query.class;
  let schoolName = req.session.school;
  try {
    let studentId = await StudentProfile.find({
      schoolName,
      class: { $regex: studentClass, $options: "i" },
    });

    res.json(studentId);
  } catch (err) {
    console.log(err);
  }
});

//GET all student base on class
router.get("/get-attendance/:className", async (req, res) => {
  try {
    let schoolName = req.session.school;
    const { className } = req.params;

    let query = {
      schoolName,
    };

    if (["SS", "JSS", "BASIC", "NURSERY"].includes(className.toUpperCase())) {
      query.class = {
        $regex: `^${className}\\s`,
        $options: "i",
      };
    } else {
      query.class = className;
    }

    const students = await StudentProfile.find(query);
    if (students.length == 0) {
      return res.status(404).json({ message: "No student found" });
    }
    res.status(200).json({ students });
  } catch (err) {
    console.log(err);
  }
});

//SAVE STUDENT ATTENDANCE
router.post('/api/upload-attendace', isAuthenticated, async(req, res)=>{
  req.body.schoolName = schoolName= req.session.school;
    try{
      const result = await Attendance.create(req.body)
      if(!result){
        res.status(404).json({message:"School not forund"})
        return
      }
      res.status(200).json({message:'saved'})
    }catch(err){
      res.status(500).json({message:"Server error"})
      console.log(err)
    }
})
module.exports = router;
