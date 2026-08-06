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
    number:{
        type:String
    },
    role:{
        type:String
    },
    signature:{
        type:String
    },
    profilePicture:{
        type:String
    },
    classConrol:{
        subject:String,
        studentClass:String
    }
   
}, {timestamps: true})

const Blog = mongoose.model("Bloga", blogSchema)
module.exports = Blog;