const express = require('express');
const schoolPfofile = require('../schema/schoolProfile') 
const isAuthenticated = require('../utility/authenticated.js')
const ABlog = require('../schema/admin.js')
const Blacklist = require('../schema/blacklist.js')
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

module.exports = router;