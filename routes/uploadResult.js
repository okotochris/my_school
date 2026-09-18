const express =  require ('express')
const Subject = require('../schema/subject')
const isAuthenticated = require('../utility/authenticated.js')
const StudentResult = require('../schema/studentResult.js')
const SchoolPfofile = require('../schema/schoolProfile.js')
const router = express.Router()


router.get('/upload_result/:subjectclass', isAuthenticated, async(req, res)=>{
    const  userClass = req.params.subjectclass
    try {
     const subject = await Subject.findOne({
    schoolName: req.session.school,
    subjectClass: new RegExp(`^${userClass}$`, "i")
    });

        res.render('uploadresult', {subject})
    } catch (error) {
        console.log(error)
    }
})
router.post('/upload-student-result', isAuthenticated, async(req, res)=>{
    try{
       const schoolName = req.session.school;
       req.body.schoolName = schoolName
       const result = await StudentResult.create(req.body)
       res.status(200).json({message:"result uploaded"})
       await SchoolPfofile.findOneAndUpdate(
        { schoolName },
        { $inc: { fees: 500 } },
        { new: true } // Return updated document
    );
        
    }catch(err){
        console.log(err)
    }
})

//UPDATE SCHOOL FEES FROM SUPER ADMIN DASHBOARD
router.patch('/update-school-fees', isAuthenticated, async(req, res)=>{
    try{
        const { _id, fees } = req.body;
        const updatedSchool = await SchoolPfofile.findOneAndUpdate(
            { _id },
            { fees },
            { new: true } // Return the updated document
        );
        res.status(200).json({ message: "School fees updated successfully", school: updatedSchool });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating school fees" });
    }
});
module.exports = router