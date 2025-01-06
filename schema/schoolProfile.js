const{ mongoose} = require('mongoose');

const profile = new mongoose.Schema({
    schoolName:{
        type: String,
        require: true,
    },
    fee:{
        type: String,
        require: true,
    },
    address:{
        type: String,
        require: true,
    }
}, {timestamp: true})

const schoolPfofile = mongoose.model( 'schoolPfofile', profile)