const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({

    shcoolName: {
        type:String,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    subject: {
        type: String,
       
    },
    term: {
        type: String,
        required: true
    },
    session: {
        type: String,
        required: true
    },

    attendance: {
        type: Map,
        of: {
            type: String,
            enum: ["Present", "Absent", "Late", "Excused"]
        },
        default: {}
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Attendance", attendanceSchema);