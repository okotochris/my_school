const express = require('express')
const router = express.Router()
const upload = require("../middleware/upload.js");
const cloudinary = require("../middleware/cloudinary.js");
const StudentResult = require('../schema/studentResult.js')
const SchoolProfile = require('../schema/schoolProfile.js');
const Teacher = require('../schema/admin.js')
const isAuthenticated = require('../utility/authenticated.js')
const StudentProfile = require('../schema/studentProfile.js')
const bcrypt = require('bcrypt')
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
router.patch('/myschool/reset-password', async (req, res) => {

    try {

        const { email, password } = req.body;

        const isRegistered = await Teacher.findOne({ email });

        if (!isRegistered) {
            return res.status(404).json({
                message: "Email not registered"
            });
        }

        const newPassword = await bcrypt.hash(password.trim(), 10);

        await Teacher.findOneAndUpdate(
            { email },
            { password: newPassword }
        );

        res.status(200).json({
            message: "Password has been updated"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Server error"
        });
    }

});

router.patch(
    '/admin/school-settings',

    upload.fields([
        { name: 'logo', maxCount: 1 },
        { name: 'headTeacherSign', maxCount: 1 }
    ]),

    async (req, res) => {

        const {
            schoolName,
            schoolEmail,
            fees,
            address,
            phone,
            resultTemplate,
            headTeacher,
            headTeacherSignature,
            state,
            motto
        } = req.body;

        try {

            // ==========================================
            // FIND SCHOOL
            // ==========================================

            const schoolInfo = await SchoolProfile.findOne({
                schoolName: req.session.school
            });


            // ==========================================
            // CHECK IF SCHOOL EXISTS
            // ==========================================

            if (!schoolInfo) {

                return res.status(404).json({
                    message: "School not found"
                });

            }


            // ==========================================
            // STORE OLD SCHOOL NAME
            // ==========================================

            const oldSchoolName = schoolInfo.schoolName;


            // ==========================================
            // UPDATE SCHOOL INFORMATION
            // ==========================================

            schoolInfo.schoolName = schoolName;
            schoolInfo.schoolEmail = schoolEmail;
            schoolInfo.fees = fees;
            schoolInfo.address = address;
            schoolInfo.phone = phone;
            schoolInfo.resultTemplate = resultTemplate;
            schoolInfo.headTeacher.name =  headTeacher;
            schoolInfo.headTeacher.signature = headTeacherSignature;
            schoolInfo.state = state;
            schoolInfo.motto = motto;


            // ==========================================
            // UPDATE SCHOOL LOGO
            // ==========================================

            const schoolLogo = req.files?.logo?.[0];


            if (schoolLogo) {

                // Get old Cloudinary public ID
                const publicId = schoolInfo.image?.public_id;


                // Delete old logo
                if (publicId) {

                    await cloudinary.uploader.destroy(publicId);

                }


                // Upload new logo
                const uploadedLogo =
                    await cloudinary.uploader.upload(
                        schoolLogo.path
                    );


                // Save new logo information
                schoolInfo.image.logo =
                    uploadedLogo.secure_url;

                schoolInfo.image.public_id =
                    uploadedLogo.public_id;

            }


            // ==========================================
            // UPDATE HEAD TEACHER SIGNATURE
            // ==========================================

            const headTeacherSignFile =
                req.files?.headTeacherSign?.[0];


            if (headTeacherSignFile) {

                // Get old signature public ID
                const publicId =
                    schoolInfo.headTeacher?.public_id;


                // Delete old signature
                if (publicId) {

                    await cloudinary.uploader.destroy(publicId);

                }


                // Upload new signature
                const uploadedHeadTeacherSign =
                    await cloudinary.uploader.upload(
                        headTeacherSignFile.path
                    );


                // Save new signature information
                schoolInfo.headTeacher.signature =
                    uploadedHeadTeacherSign.secure_url;

                schoolInfo.headTeacher.public_id =
                    uploadedHeadTeacherSign.public_id;

            }


            // ==========================================
            // CHECK IF SCHOOL NAME HAS CHANGED
            // ==========================================

            if (schoolName !== oldSchoolName) {


                // ==========================================
                // UPDATE ALL TEACHERS
                // ==========================================

                await Teacher.updateMany(

                    {
                        
                          school: oldSchoolName
                    },

                    {
                        $set: {                
                          school: schoolName
                        }
                    }

                );


                // ==========================================
                // UPDATE ALL STUDENTS
                // ==========================================

                await StudentProfile.updateMany(

                    {
                        schoolName: oldSchoolName
                    },

                    {
                        $set: {
                            schoolName: schoolName
                        }
                    }

                );


                // ==========================================
                // UPDATE SESSION SCHOOL NAME
                // ==========================================

                req.session.school = schoolName;

            }


            // ==========================================
            // SAVE SCHOOL
            // ==========================================

            await schoolInfo.save();


            // ==========================================
            // RESPONSE
            // ==========================================

            return res.status(200).json({

                message: "School settings updated successfully",

                school: schoolInfo

            });


        } catch (err) {

            console.error("School settings update error:", err);


            return res.status(500).json({

                message: "Server error"

            });

        }

    }
);
module.exports = router;