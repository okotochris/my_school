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
    resultTemplate:{
        type:String,
        default:'template-1'
    },
    headTeacher:{
        name:String,
        signature:String,
        public_id:String,
    },
    state:String,
    motto:String,
}, {timestamp: true})


const schoolPfofile = mongoose.model( 'schoolPfofile', profile);
module.exports = schoolPfofile;