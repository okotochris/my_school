const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    schoolName: {
        type: String,
        required: true
    },

    studentClass: {
        type: String,
        required: true
    },

    term: {
        type: String,
        required: true
    },

    session: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    attendance: {
        type: Map,
        of: {
            type: String,
            enum: ["present", "absent", "late", "excused"]
        },
        default: {}
    }

}, {
    timestamps: true
});

attendanceSchema.index(
    {
        schoolName: 1,
        class: 1,
        term: 1,
        session: 1,
        date: 1
    },
    { unique: true }
);

module.exports = mongoose.model("Attendance", attendanceSchema);