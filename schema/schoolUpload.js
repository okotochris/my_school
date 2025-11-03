const mongoose = require('mongoose')

let Schema = mongoose.Schema;

const schoolUpload =  new Schema({
    title:{
        type: String,
        require: true,
    },
    content:{
        type: String,
        require: true,
    }, 
    file:{
        type:String,
    }
})
