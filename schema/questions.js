const mongoose = require('mongoose')
const questionSchema = new mongoose.Schema({
    schoolName: String,
    subject: {
        type: String,
        required: true,
        index: true
    },

    studentClass: {
        type: String,
        required: true,
        index: true
    },

    topic: {
        type: String,
        required: true,
        index: true
    },
    question:[
       {
            text:String,
            image:String
        }
    ],

    options: [{
         text:{
             type: String,
            required: true
        },

       image:{
         type: String,
            
       }
    }],

    answer: {
        type: Number, // 0,1,2,3
        required: true
    },

    explanation: String,

    difficulty: {
        type: String,
        enum: ["Easy", "Medium", "Hard"],
        default: "Medium"
    },

    term: String,
    session: String,

},{
    timestamps:true
});