const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lessonNoteSchema = new Schema({

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

    week: {
        type: Number,
        required: true
    },

    topic: {
        type: String,
        required: true
    },

    subTopic: {
        type: String,
        default: ''
    },

    learningObjectives: {
        type: String,
        default: ''
    },

    lessonContent: {
        type: String,
        default: ''
    },

    teachingActivities: {
        type: String,
        default: ''
    },

    evaluation: {
        type: String,
        default: ''
    },

    assignment: {
        type: String,
        default: ''
    },

    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft'
    }

}, { timestamps: true });


const LessonNote = mongoose.model('LessonNote', lessonNoteSchema);

module.exports = LessonNote;