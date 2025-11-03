const mongoose = require('mongoose')

const data = new mongoose.Schema({
studentName:{
    type: String,
    require: true,
},
studentId:{
    type: String,
    require: true,
},
school:{
    type: String,
    require: true
}
}, {timestamps: true})

const Blacklist = mongoose.model('Blacklist', data)

module.exports = Blacklist;