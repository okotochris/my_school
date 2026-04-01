const express = require('express')
const Blog = require("../schema/data.js"); //junior class
const SBlog = require("../schema/datas.js"); // sinior class
const PBlog = require("../schema/primary.js"); //basic class
const nuseryBlog = require("../schema/nursery.js"); // nursery
const router = express.Router()

router.get('/api/is_uploaded', async(req, res)=>{
    try {
        const {sClass, term, id, sSection} = req.query
        const studentClass = sClass.split(" ")
        const studentC = studentClass[0]
        if(studentC == "SS"){
             const result  =  await SBlog.findOne({class:sClass, term:term, studentId:id, section:sSection})
            if(result){
                res.status(200).json({msg:"result uploaded"})
                return;
            }
            return res.status(404).json({msg:"result not found"})

        }else if(studentC == "JSS"){
            const result  =  await Blog.findOne({class:sClass, term:term, studentId:id, section:sSection})
            if(result){
                res.status(200).json({msg:"result uploaded"})
                return;
            }
            return res.status(404).json({msg:"result not found"})
        }else if(studentC == "BASIC"){
            const result  =  await PBlog.findOne({class:sClass, term:term, studentId:id, section:sSection})
            if(result){
                res.status(200).json({msg:"result uploaded"})
                return;
            }
            return res.status(404).json({msg:"result not found"})
        }else{
         
             const result  =  await nuseryBlog.findOne({class:sClass, term:term, studentId:id, section:sSection})
                   if(result){
                     res.status(200).json({msg:"result uploaded"})
                    return;
                   }
           
            return res.status(404).json({msg:"result not found"})
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({msg:"server error"})
    }
})
router.get('/api/get_result', async(req, res)=>{
    try {
        const studentResult = []
        const {studentId} = req.query
        console.log(studentId)
        const student = await PBlog.find({studentId: studentId})
        studentResult.push(...student)
        const student2 = await Blog.find({studentId: studentId})
        studentResult.push(...student2)
        const student3 = await SBlog.find({studentId: studentId})
        studentResult.push(...student3)
            const student4 = await nuseryBlog.find({studentId: studentId})
        studentResult.push(...student4)

        if(studentResult.length > 0){
            res.status(200).json(studentResult)
        } else{
            res.status(404).json({msg:"result not found"})
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({msg:"server error"})
    }
})
module.exports =  router