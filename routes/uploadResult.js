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


module.exports = router