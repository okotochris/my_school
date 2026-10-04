const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        subject: {
            type: String,
            required: true,
            trim: true
        },

        studentClass: {
            type: String,
            required: true,
            trim: true
        },

        school: {
            type: String,
            required: true,
            trim: true
        },

        teacher: {
            type: String,
            trim: true
        },

        dueDate: {
            type: Date,
            required: true
        },

        dueTime: {
            type: String
        },

        attachment: {
            url: {
                type: String,
                default: ''
            },
            public_id: {
                type: String,
                default: ''
            }
        },

        allowSubmission: {
            type: Boolean,
            default: true
        },

        notifyStudents: {
            type: Boolean,
            default: true
        },

        status: {
            type: String,
            enum: ['active', 'closed'],
            default: 'active'
        }
    },
    {
        timestamps: true
    }
);

// Unique assignment per school + class + subject + title
assignmentSchema.index(
    {
        school: 1,
        studentClass: 1,
        subject: 1,
        title: 1
    },
    {
        unique: true
    }
);

module.exports = mongoose.model('Assignment', assignmentSchema);