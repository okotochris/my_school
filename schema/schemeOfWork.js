const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemeOfWorkSchema = new Schema({
    schoolName: {
        type: String,
        required: true
    },

    teacherId: {
        type: String,
        required: true
    },

    teacherName: {
        type: String,
        required: true
    },

    session: {
        type: String,
        required: true
    },

    term: {
        type: String,
        required: true
    },

    class: {
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
                required: true
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