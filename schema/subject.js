const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    schoolName: {
      type: String,
      required: true,
      trim: true,
    },

    subjectClass: {
      type: String,
      required: true,
      trim: true,
    },

    classTeacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      default: null,
    },

    subjects: [
      {
        subjectName: {
          type: String,
          required: true,
          trim: true,
        },

        subjectCode: {
          type: String,
          default: null,
        },

        teacherId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Teacher",
          default: null,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// One document per school + class
subjectSchema.index(
  {
    schoolName: 1,
    subjectClass: 1,
  },
  {
    unique: true,
  }
);

module.exports = mongoose.model("Subject", subjectSchema);