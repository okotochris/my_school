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
   
   
}, {timestamps: true})

const Blog = mongoose.model("Bloga", blogSchema)
module.exports = Blog;