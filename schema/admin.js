const mongoose = require('mongoose')

let Schema = mongoose.Schema
let blogSchema = new Schema({
    user_name:{
        type:String
    },
    email:{
        type:String
    },
    school:{
        type:String
    },
    gender:{
        type:String
    },
    password:{
        type:String
    },
    phoneContact:{
        type:String
    },
    role:{
        type:String
    },
    signature:{
        image:String,
        public_id:String
    },
    passport:{
        image:String,
        public_id:String
    },
    classControl:{
        subject:String,
        studentClass:[String]
    }
   
}, {timestamps: true})

const Blog = mongoose.model("Bloga", blogSchema)
module.exports = Blog;