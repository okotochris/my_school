const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema(
    {
        schoolName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },

        studentClass: {
            type: String,
            required: true,
            trim: true,
            index: true
        },

        day: {
            type: String,
            required: true,
            enum: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday'
            ],
            index: true
        },

        subject: {
            type: String,
            required: true,
            trim: true
        },

        teacher: {
            type: String,
            trim: true,
            default: ''
        },

        room: {
            type: String,
            trim: true,
            default: ''
        },

        startTime: {
            type: String,
            required: true
        },

        endTime: {
            type: String,
            required: true
        },

        period: {
            type: Number,
            required: true
        },

        type: {
            type: String,
            enum: ['lesson', 'break', 'assembly', 'exam', 'other'],
            default: 'lesson'
        },

        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active'
        }
    },
    {
        timestamps: true
    }
);

// Prevent the same class from having two subjects
// in the same period on the same day.
timetableSchema.index(
    {
        school: 1,
        studentClass: 1,
        day: 1,
        period: 1
    },
    {
        unique: true
    }
);

module.exports = mongoose.model('Timetable', timetableSchema);