const express = require('express')
const isAuthenticated = require('../utility/authenticated.js')
const schoolPfofile = require("../schema/schoolProfile");
const Blog = require("../schema/data.js"); //junior class
const SBlog = require("../schema/datas.js"); // sinior class
const ABlog = require("../schema/admin.js");
const PBlog = require("../schema/primary.js"); //basic class
const Blacklist = require("../schema/blacklist.js");
const nuseryBlog = require("../schema/nursery.js"); // nursery
const Studentpassport = require("../schema/goldenPassport.js");

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

router.get('/api/analysis', isAuthenticated, async (req, res) => {
  try {
    const school = req.session.school;
    // Run all queries in parallel for better performance
    const [
      totalStaff,
      totalStudent,
      totalNursery,
      totalBasic,
      totalJss,
      totalSS,
      totalBlacklist,
      gradeSummary
    ] = await Promise.all([
      ABlog.countDocuments({ school }),
      Studentpassport.countDocuments({ schoolName: school }),
      Studentpassport.countDocuments({ schoolName: school, class: { $regex: /^NURSERY/i } }),
      Studentpassport.countDocuments({ schoolName: school, class: { $regex: /^BASIC/i } }),
      Studentpassport.countDocuments({ schoolName: school, class: { $regex: /^JSS/i } }),
      Studentpassport.countDocuments({
        schoolName: school,
        class: { $in: ["SS 1", "SS 2", "SS 3"] },
      }),
      Blacklist.countDocuments({ school }),
      getAllClassGradePercentages(school), // your grade percentage helper
    ]);

    // Respond with everything together
    res.status(200).json({
      totalStaff,
      totalStudent,
      totalBlacklist,
      totalNursery,
      totalBasic,
      totalJss,
      totalSS,
      gradeSummary, // includes totalGrades, counts, percentages
    });
  } catch (err) {
    console.error("Error in /api/analysis:", err);
    res.status(500).json({ msg: "Server error" });
  }
});


async function getAllClassGradePercentages(schoolName) {
  try {
    // Combine all documents from each schema
    const allDocs = [
      ...(await Blog.find({ schoolName })),
      ...(await nuseryBlog.find({ schoolName })),
      ...(await SBlog.find({ schoolName })),
      ...(await PBlog.find({ schoolName }))
    ];

    if (!allDocs.length) {
      return { message: "No results found for this school" };
    }

    const counts = { A: 0, B: 0, C: 0, D: 0, F: 0 };
    let totalGrades = 0;

    // Loop through each document
    for (const doc of allDocs) {
      const obj = doc.toObject();

      // Loop through fields and find grade keys
      for (const [key, value] of Object.entries(obj)) {
        if (key.endsWith("G") && value) {
          const grade = value.toUpperCase().trim();
          if (["A", "B", "C", "D", "F"].includes(grade)) {
            counts[grade]++;
            totalGrades++;
          }
        }
      }
    }

    // Calculate percentages
    const percentages = {};
    for (const [grade, count] of Object.entries(counts)) {
      percentages[grade] = totalGrades
        ? ((count / totalGrades) * 100).toFixed(2)
        : "0.00";
    }

    return {
      totalGrades,
      counts,
      percentages
    };
  } catch (error) {
    console.error("Error calculating grade percentages:", error);
    return null;
  }
}

module.exports = router
