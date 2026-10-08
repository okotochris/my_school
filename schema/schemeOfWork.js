const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemeOfWorkSchema = new Schema({
    schoolName: {
        type: String,
        required: true
    },

    teacherId: {
        type: String,
       
    },

    teacherName: {
        type: String,
       
    },

    session: {
        type: String,
       
    },

    term: {
        type: String,
        
    },

    studentClass: {
        type: String,
        required: true
    },

    subject: {
        type: String,
        required: true
    },

    weeks: [
        {
            week: {
                type: Number,
                
            },

            topic: {
                type: String,
                default: ''
            },

            subtopics: {
                type: String,
                default: ''
            },

            objectives: {
                type: String,
                default: ''
            },

            activities: {
                type: String,
                default: ''
            },

            resources: {
                type: String,
                default: ''
            }
        }
    ],

    additionalInformation: {
        type: String,
        default: ''
    },

    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft'
    }

}, { timestamps: true });

const SchemeOfWork = mongoose.model('SchemeOfWork', schemeOfWorkSchema);

module.exports = SchemeOfWork;