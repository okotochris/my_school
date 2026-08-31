const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentResultSchema = new Schema({
  fullname: { type: String, required: true },
  studentId: { type: String, required: true },
  studentClass: { type: String, required: true },
  section: String,
  term: { type: String, required: true },
  schoolName: { type: String, required: true },
  subjects: [
    {
      subjectName: { type: String, required: true },
      firstTest: { type: Number, default: 0 },
      secondTest: { type: Number, default: 0 },
      cca: { type: Number, default: 0 },
      exam: { type: Number, default: 0 },
      total: { type: Number, default: 0 }, // calculated total
      grade: String,
      remark: String
    }
  ],
  average: { type: Number, default: 0 },
  score_obtainable: { type: Number, default: 0 },
  score_obtain: { type: Number, default: 0 },
  promote: String,
  nextTerm: String,
  No_subj:String,
  fees: Number,
 
    present: { type: Number, default: 0 },
    absent: { type: Number, default: 0 },


    Treport: String,
    tReport: String,
    classTeacherSignatre:String,
    classTeacherName:String,
  
}, { timestamps: true });

const StudentResult = mongoose.model('StudentResult', studentResultSchema);
module.exports = StudentResult;