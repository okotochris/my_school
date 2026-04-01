const mongoose = require('mongoose');
const { Schema } = mongoose;

const subjectSchema = new Schema({
  schoolName: { type: String, required: true },
  studentClass: { type: String, required: true },
  subjects: [
    {
      subjectName: { type: String, required: true },
      subjectCode: String, // optional
      teacherName: String  // optional
    }
  ]
}, { timestamps: true });

// Optional: prevent duplicate school+class
subjectSchema.index({ schoolName: 1, studentClass: 1 }, { unique: true });

const Subject = mongoose.model('Subject', subjectSchema);
module.exports = Subject;