const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogschema = new Schema({
    fullname: {
        type: String,
        required: true,
        unique:true
    },
    studentId: {
        type: String,
        required: true
    },
    schoolsession: {
        type: String,
        required: true
    },
    addmissionNo: {
        type: String
    },
    dob: {
        type: String,
    },
    class:{
        type: String,
        required: true
    },
    passport: {
        type: String,
    },
    gender:{
        type:String
    },
    schoolName:{
        type: String,
        required: true
    }
}, { timestamps: true });

const Studentpassport = mongoose.model('StudentProfile', blogschema);
module.exports = Studentpassport;