const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogschema = new Schema({
    userName: {
        type: String,
        required: true
    },
    studentId: {
        type: String,
        required: true
    },
    addmissionNo: {
        type: String
    },
    dob: {
        type: String,
        required: true
    },
    passport: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Studentpassport = mongoose.model('Studentpassport', blogschema);
module.exports = Studentpassport;