const express = require('express')
const ABlog = require("../schema/admin.js");
const schoolPfofile = require('../schema/schoolProfile.js')

const router = express.Router()
//saving admin login


router.post("/admin_form", async (req, res) => {
  const { user_name, school } = req.body

  const Ablog = new ABlog(req.body);
  Ablog.save()
    .then((result) => {
       req.session.visited = true;
       req.session.user = user_name;
       req.session.school = school;
        req.session.role = 'admin'
       req.session.fees = 38000;
       res.status(200).json("/admin")
    })
    .catch((err) => {
      console.log(err);
    });
 
});
router.post("/login", async (req, res) => {
  const user = req.body.user;
  const password = req.body.password;
  try {
    let data = await ABlog.findOne({ email: user, password: password });
    if(!data){
     return res.status(404).json({msg:"Invalid login details"})
    }
    let schoolName = data.school 
    let role = data.role;
    let schoolFee = await schoolPfofile.findOne({schoolName})
    
    if (data && schoolFee) {
      req.session.visited = true;
      req.session.user = user;
      req.session.role = role
      const school = data.school;
      const fees = schoolFee.fees;
      req.session.school = school;
      req.session.fees = fees;
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
module.exports = router;