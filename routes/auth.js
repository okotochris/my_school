const express = require('express')
const Staff = require("../schema/admin.js");
const SchoolPfofile = require('../schema/schoolProfile.js')
const StudentProfile = require('../schema/studentProfile.js')
const upload = require("../middleware/upload.js");
const cloudinary = require("../middleware/cloudinary.js");
const bcrypt = require("bcrypt");


const router = express.Router()

//ADD STAFF 
router.post('/admin/add-staff', upload.single('school-logo'), async(req, res)=>{
 
  try{
    req.body.school = req.session.school 
    req.body.password = await bcrypt.hash(req.body.password, 10);
    await Staff.create(req.body);
    res.status(200).json({msg:"Admin created successfully"})
  }catch(err){
    console.log(err)
    res.status(500).json({msg:"server error"})
  }
})
//saving admin login
router.post("/admin_form", upload.single('school-logo'), async (req, res) => {

  try{
    if(req.body.role == 'admin'){
      const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "school-logos"
        });
        const public_id = result.public_id || null
        const secure_url = result.secure_url || null
        await SchoolPfofile.create({
          schoolName: req.body.school,
          schoolEmail: req.body.email,
          address: req.body.address,
          phone: req.body.phone,
          motto: req.body.motto,
          image: {
          logo: secure_url,
          public_id: public_id
        }
        });
      }
    const hashedPassword = await bcrypt.hash(req.body.password.trim(), 10);
    req.body.password = hashedPassword;
    await Staff.create(req.body);
    res.status(200).json({msg:'successful'})
  }catch(err){
    console.log(err)
    res.status(500).json({msg:"server error"})
  }
 
});
router.post("/login", async (req, res) => {
 
   try {
    let user = await Staff.findOne({ email: req.body.user });
    if(!user){
     return res.status(404).json({msg:"Invalid login details"})
    }
    const isPasswordCorrect = await bcrypt.compare(req.body.password.trim(), user.password)
    if(!isPasswordCorrect){
      return res.status(403).json({msg:'wrong email or password'})
    }
    let schoolName = user.school 
    let role = user.role;
    let id = user._id
    let userSchool = await SchoolPfofile.findOne({schoolName})
    
    if (user && userSchool) {
      req.session.visited = true;
      req.session.user = user;
      req.session.role = role
      const school = user.school;
      const fees = userSchool.fees;
      req.session.school = school;
      req.session.fees = fees;
      req.session.userId = id
      const redirectTo = req.session.returnTo || "/admin";
      delete req.session.returnTo; // Clear returnTo after use
      user = user.toObject()
      delete user.password
      res.status(200).json({redirectTo, user, school:userSchool});
    } else {
      res.redirect("login");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({msg:"server error"})
  }
});
//LOGING IN TO ACCESSS SCHOOL RESULT PAGE
router.get("/login", (req, res) => {
  res.render("login");
});
//ADMIN LOGIN
router.get('/admin-login', (req, res)=>{
  res.render('admin-login')
})
router.get('/student/student-login', (req, res)=>{
  res.render('student/student-login')
})
//LOGOUT API
router.get("/logout", (req, res) => {
  req.session.destroy();
  //res.clearCookie('connect.sid'); 
  res.redirect("login");
});

//STUDENT LOGIN
router.post('/student/login', async (req, res) => {

    const { studentId, firstName } = req.body;

    try {

       const student = await StudentProfile.findOne({
          studentId: studentId,
          fullname: {
              $regex: firstName,
              $options: "i"
          }
      });

        if (!student) {
            return res.status(401).json({
                message: "Invalid Student ID or First Name"
            });
        }

        req.session.studentId = student.studentId;
        req.session.student = student;

        res.status(200).json({
            message: "Login successful",
            student
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
});
module.exports = router;