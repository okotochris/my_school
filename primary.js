const mongoose = require('mongoose')

Schema = mongoose.Schema;

blogSchema = new Schema({
    mth:{
        type: String
    },
    mth1st:{
        type:String
    },
    mth2nd:{
        type:String
    }, 
    mthG:{
        type: String
    },
    mthexam:{
        type:String
    },
    eng:{
        type:String
    },
    userName:{
        type: String,
        required: true
    },
    studentId:{
        type: String,
        required: true
    },
    class:{
        type: String,
        required: true
    },
    term:{
        type: String,
        required: true
    },
    schoolName:{
        type: String,
        required: true
    },
    Treport:{
        String
    },
    section:{
        type:String
    },
    schoolAdd:{
        type: String,
        required: true
    },
}, {timestamp: true})
const Blog = mongoose.model('Blogp', blogSchema)

module.exports = Blog