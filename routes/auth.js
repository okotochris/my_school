const express = require('express')
const Staff = require("../schema/admin.js");
const SchoolPfofile = require('../schema/schoolProfile.js')
const upload = require("../middleware/upload.js");
const cloudinary = require("../middleware/cloudinary.js");
const bcrypt = require("bcrypt");


const router = express.Router()
//saving admin login


router.post("/admin_form", upload.single('school-logo'), async (req, res) => {
  try{
    const {public_id, secure_url} = await cloudinary.uploader.upload(req.file.path, {
      folder: "school-logos"
    });
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    await Staff.create(req.body);
    console.log(public_id, secure_url )
    await SchoolPfofile.create({
      schoolName: req.body.school,
      schoolEmail: req.body.email,
      address: req.body.address,
      phone: req.body.phone,
      image: {
      logo: secure_url,
      public_id: public_id
    }
    });
    res.status(200).json({msg:"Admin created successfully"})
  }catch(err){
    console.log(err)
    res.status(500).json({msg:"server error"})
  }
 
});
router.post("/login", async (req, res) => {
  const user = req.body.user;
  const password = req.body.password;
  try {
    let data = await Staff.findOne({ email: user, password: password });
    if(!data){
     return res.status(404).json({msg:"Invalid login details"})
    }
    let schoolName = data.school 
    let role = data.role;
    let id = data._id
    let schoolFee = await SchoolPfofile.findOne({schoolName})
    
    if (data && schoolFee) {
      req.session.visited = true;
      req.session.user = user;
      req.session.role = role
      const school = data.school;
      const fees = schoolFee.fees;
      req.session.school = school;
      req.session.fees = fees;
      req.session.userId = id
      const redirectTo = req.session.returnTo || "/admin";
      delete req.session.returnTo; // Clear returnTo after use
      res.status(200).json(redirectTo);
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

//LOGOUT API
router.get("/logout", (req, res) => {
  req.session.destroy();
  //res.clearCookie('connect.sid'); 
  res.redirect("login");
});
module.exports = router;