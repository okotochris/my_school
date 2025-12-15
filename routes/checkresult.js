const express = require('express');
const Blog = require("../schema/data.js"); //junior class
const SBlog = require("../schema/datas.js"); // sinior class
const PBlog = require("../schema/primary.js"); //basic class
const nuseryBlog = require("../schema/nursery.js"); // nursery
const Studentpassport = require("../schema/goldenPassport.js");
const Blacklist = require("../schema/blacklist.js");
const schoolPfofile = require("../schema/schoolProfile");
const router = express.Router()

//NEW EDITION STUDENT RESULT
router.post("/result", async (req, res) => {
  let clas = req.body.class;
  let term = req.body.term;
  let id = req.body.studentId;
  let name = req.body.userName;
  try {
    let data = await Studentpassport.findOne({ studentId: id });
    let student = await Blacklist.findOne({ studentId: id });

    if (student) {
      res.render("blacklistfile", { student });
    }

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
        res.render("error", { name: name });
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
module.exports = router;