const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assignmentSchema = new Schema({

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

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    instructions: {
        type: String,
        default: ''
    },

    dueDate: {
        type: Date,
        required: true
    },

    attachment: {
        url: {
            type: String,
            default: ''
        },
        public_id: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ''
        }
    },

    marks: {
        type: Number,
        default: 100
    },

    status: {
        type: String,
        enum: ['draft', 'published', 'closed'],
        default: 'draft'
    }

}, { timestamps: true });

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;