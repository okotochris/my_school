const express = require('express')
const isAuthenticated = require('../utility/authenticated.js')
const schoolPfofile = require("../schema/schoolProfile");
const ABlog = require("../schema/admin.js");
const Blacklist = require("../schema/blacklist.js");
const StudentResult = require('../schema/studentResult.js')
const StudentProfile = require('../schema/studentProfile.js')

const router = express.Router()

//KHRISTAL TECH SUMMAR DETAILS 
router.get('/summary', isAuthenticated, async (req, res)=>{
  try{
    const school = await schoolPfofile.find()
    res.render('summary', {school})
  }
  catch(err){
    console.log(err)
  }
})
router.get("/api/analysis", isAuthenticated, async (req, res) => {

    try {
        const schoolName = req.session.school;

        const [
            totalStaff,
            totalStudents,
            totalNursery,
            totalBasic,
            totalJunior,
            totalSenior,
            totalBlacklist,
            gradeSummary
        ] = await Promise.all([
            ABlog.countDocuments({ school: schoolName }),

            StudentProfile.countDocuments({
                schoolName
            }),

            StudentProfile.countDocuments({
                schoolName,
                class: { $regex: /^NURSERY/i }
            }),

            StudentProfile.countDocuments({
                schoolName,
                class: { $regex: /^BASIC/i }
            }),

            StudentProfile.countDocuments({
                schoolName,
                class: { $regex: /^JSS/i }
            }),

            StudentProfile.countDocuments({
                schoolName,
                class: { $regex: /^SS/i }
            }),

            Blacklist.countDocuments({
                school: schoolName
            }),

            getAllClassGradePercentages(schoolName)
        ]);
        return res.json({
            totalStaff,
            totalStudents,
            totalBlacklist,
            totalNursery,
            totalBasic,
            totalJunior,
            totalSenior,
            gradeSummary
        });
       
    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: "Server error"
        });
    }
});


async function getAllClassGradePercentages(schoolName) {
    try {
        const summary = await StudentResult.aggregate([
            {
                $match: { schoolName }
            },
            {
                $unwind: "$subjects"
            },
            {
                $group: {
                    _id: {
                        $toUpper: "$subjects.grade"
                    },
                    count: { $sum: 1 }
                }
            }
        ]);

        const counts = {
            A: 0,
            B: 0,
            C: 0,
            D: 0,
            F: 0
        };

        let totalGrades = 0;

        summary.forEach(item => {
            if (counts.hasOwnProperty(item._id)) {
                counts[item._id] = item.count;
                totalGrades += item.count;
            }
        });

        const percentages = {};

        Object.keys(counts).forEach(grade => {
            percentages[grade] = totalGrades
                ? ((counts[grade] / totalGrades) * 100).toFixed(2)
                : "0.00";
        });

        return {
            totalGrades,
            counts,
            percentages
        };

    } catch (err) {
        console.error(err);

        return {
            totalGrades: 0,
            counts: { A: 0, B: 0, C: 0, D: 0, F: 0 },
            percentages: { A: "0.00", B: "0.00", C: "0.00", D: "0.00", F: "0.00" }
        };
    }
}
module.exports = router
