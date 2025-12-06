const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    schoolname:{
        type:String,
        require:true,
    },
        type:String,
    amount:{
        type:String,
        require:true
    },
    staffName:{
        type:String,
    },
    refId:{
        type:String
    },
    tx_ref:{
        type:String,
    }
},{timestamps:true})

paymentHistory = mongoose.model("paymentHistory", paymentSchema)
module.exports = paymentHistory;