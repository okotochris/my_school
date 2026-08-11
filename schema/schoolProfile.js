const{ mongoose} = require('mongoose');

const profile = new mongoose.Schema({
    schoolName:{
        type: String,
        require: true,
        unique: true
    },
    schoolEmail:{
        type: String,
        require: true,
        unique: true
    },
    fees:{
        type: Number,
        default: 0,
    },
    address:{
        type: String,
        require: true,
    },
    image:{
        logo:String,
        public_id:String
    },
    phone:{
        type: String,
        require: true,
    },
    about:String
}, {timestamp: true})


const schoolPfofile = mongoose.model( 'schoolPfofile', profile);
module.exports = schoolPfofile;