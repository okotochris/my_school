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
    },

    address:String,

    email:String,

    house:String,


    // ==========================================
    // GUARDIAN INFORMATION
    // ==========================================

    guardian: {
        name: {
            type: String,
            default: ''
        },

        relationship: {
            type: String,
            default: ''
        },

        phone: {
            type: String,
            default: ''
        },

        email: {
            type: String,
            default: ''
        },

        address: {
            type: String,
            default: ''
        },

        state: {
            type: String,
            default: ''
        },

        lga: {
            type: String,
            default: ''
        }
    },


    // ==========================================
    // EMERGENCY CONTACT
    // ==========================================

    emergencyContact: {
        name: {
            type: String,
            default: ''
        },

        phone: {
            type: String,
            default: ''
        }
    }

}, { timestamps: true });

const Studentpassport = mongoose.model('StudentProfile', blogschema);

module.exports = Studentpassport;

