const express = require('express');
const Blog = require("../schema/data.js"); //junior class
const SBlog = require("../schema/datas.js"); // sinior class
const PBlog = require("../schema/primary.js"); //basic class
const nuseryBlog = require("../schema/nursery.js"); // nursery
const StudentProfile = require('../schema/studentProfile.js')
const Blacklist = require("../schema/blacklist.js");
const StudentResult = require('../schema/studentResult.js')
const schoolPfofile = require("../schema/schoolProfile");
const router = express.Router()



//view student result from home page
router.post("/result", async (req, res) => {
  let clas = req.body.class;
  let term = req.body.term;
  let id = req.body.studentId;
  let name = ''
  try {

    //checking if student has been blacklisted
    let blackListStudent = await Blacklist.findOne({ studentId: id });
    if (blackListStudent) {
      res.render("blacklistfile", { blackListStudent });
      return
    }
      let student = await StudentProfile.findOne({ studentId: id });
      name = StudentProfile.fullname;
    //UPDATED RESULT LOGIC
    const result = await StudentResult.findOne({ studentId: id, studentClass: clas, term })
    if(result){
      //check if school has made payment
       let schoolName = student.schoolName.toLowerCase().toLocaleLowerCase().trim();
        const payment = await isOutStandingPayment(schoolName)
        if(!payment){
            return res.render('block_school', {school: schoolName})
        }
      //CREATE SCHOOL TEMPLATE
      const resultTemplate = schoolName.split(" ").join("-");
      return  res.render(resultTemplate, { result, student });
     
    }

    //checking old result
    let data = student

    let studentClass = clas.split(" ");
    if (studentClass[0] === "BASIC") {
      let details = await PBlog.find({ studentId: id, class: clas, term: term })
        .sort({ createdArt: -1 })
        .limit(1);
      details = details[0];
     
      if (details != null) {
        let schoolName = details.schoolName.toLowerCase().trim();
        const payment = await isOutStandingPayment(schoolName)
        if(!payment){
            return res.render('block_school', {school: schoolName})
        }
        let resultTemplate = schoolName.split(" ");
        resultTemplate = resultTemplate.join("-");
        resultTemplate = `${resultTemplate}-basic`;

        res.render(resultTemplate, { result: data, details });
      } else {
        res.render("error", { name });
      }
    } else if (studentClass[0] === "JSS") {
      let details = await Blog.find({ studentId: id, class: clas, term: term })
        .sort({ createdArt: -1 })
        .limit(1);
      details = details[0];
      if (details != null) {
        let schoolName = details.schoolName.toLowerCase().trim();
        const payment = await isOutStandingPayment(schoolName)
        if(!payment){
            return res.render('block_school', {school: schoolName})
        }
        let resultTemplate = schoolName.split(" ");
        resultTemplate = resultTemplate.join("-");
        resultTemplate = `${resultTemplate}-jss`;

        res.render(resultTemplate, { result: data, details });
      } else {
        res.render("error", { name: name });
      }
    } else if (studentClass[0] === "SS") {
      let details = await SBlog.find({ studentId: id, class: clas, term: term })
        .sort({ createdArt: -1 })
        .limit(1);
      details = details[0];

      if (details != null) {
        let schoolName = details.schoolName.toLowerCase().trim();
        const payment = await isOutStandingPayment(schoolName)
        if(!payment){
            return res.render('block_school', {school: schoolName})
        }
        let resultTemplate = schoolName.split(" ");
        resultTemplate = resultTemplate.join("-");
        resultTemplate = `${resultTemplate}-ss`;

        res.render(resultTemplate, { result: data, details });
      } else {
        res.render("error", { name: name });
      }
    } else if (studentClass[0] === "NURSERY" || studentClass[1] === "NURSERY") {
      let details = await nuseryBlog
        .find({ studentId: id, class: clas, term: term })
        .sort({ createdAt: -1 })
        .limit(1);
      details = details[0];
      if (details != null) {
        let schoolName = details.schoolName.toLowerCase().trim();
        const payment = await isOutStandingPayment(schoolName)
        if(!payment){
            return res.render('block_school', {school: schoolName})
        }
        let resultTemplate = schoolName.split(" ");
        resultTemplate = resultTemplate.join("-");
        resultTemplate = `${resultTemplate}-nursery`;
        res.render(resultTemplate, { result: data, details });
      } else {
        res.render("error", { name: name });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

async function isOutStandingPayment(school){
     const data = await schoolPfofile.findOne({
        schoolName: { $regex: `^${school}$`, $options: 'i' }
        });
     if(data && data.fees > 0){
        return 
     }
     return true
}

//view student result from student profile page
router.get('/view-student-result', async(req, res)=>{
    if(!req.session){
      res.render('login')
    }
    const {term, sclass, school, studentId} = req.query
     const result = await StudentResult.findOne({studentId, studentClass: sclass, term, schoolName: school})
     const student = await StudentProfile.findOne({studentId})
      //CREATE SCHOOL TEMPLATE
      const resultTemplate = school.split(" ").join("-");
      return  res.render(resultTemplate, { result, student });

});

router.delete('/api/delete_result', async(req, res)=>{
  const {dataId, sclass} = req.body
  try {
    let deletedResult;
    if(sclass.toLowerCase().includes('basic')){
        deletedResult = await PBlog.findByIdAndDelete(dataId);
    } else if(sclass.toLowerCase().includes('jss')){
        deletedResult = await Blog.findByIdAndDelete(dataId);
    } else if(sclass.toLowerCase().includes('ss')){     
        deletedResult = await SBlog.findByIdAndDelete(dataId);
    } else if(sclass.toLowerCase().includes('nursery')){
        deletedResult = await nuseryBlog.findByIdAndDelete(dataId);
    }
    if(deletedResult){
        return res.json({message: "Result deleted successfully"})
    }
    res.status(404).json({message: "Result not found"})
  } catch (err) {
    console.log(err);
    res.status(500).json({message: "Server error"})
  }
})

module.exports = router;