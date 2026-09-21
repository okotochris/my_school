const mongoose = require('mongoose')

const assignmentSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    duration:String,
    teacherName:String
}, {timestamps:true})

const Assignment = mongoose.model('Assignment', assignmentSchema)

module.exports = Assignment