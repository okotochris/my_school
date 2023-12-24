const mongoose = require('mongoose')

let Schema = mongoose.Schema
let blogSchema = new Schema({
    user_name:{
        type:String
    },
    email:{
        type:String
    },
    gender:{
        type:String
    },
   date:{
        type:String
    },
    password:{
        type:String
    },
    number:{
        type:String
    },
    date:{
        type:String
    },
   
}, {timestamps: true})

const Blog = mongoose.model("Bloga", blogSchema)
module.exports = Blog;