const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const blogschema = new Schema({
    schoolName:String,
    fullname:String,
    eng:String,
    mth:String,
    mth1st:String,
    mth2nd:String,
    mthca:String,
    mthexam:String,
    mthscore:String,
    mthG:String,
    mthRemark:String,
    vst:String,
    vst1st :String,
    vst2nd:String,
    vstca:String,
    vstexam:String,
    vstscore:String,
    vstG:String,
    vstRemark:String,
    qur:String,
    qur1st:String,
    qur2nd:String,
    qurca:String,
    qurexam:String,
    qurscore:String,
    qurG:String,
    qurRemark:String,
    ver:String,
    ver1st:String,
    ver2nd:String,
    verca:String,
    verexam:String,
    verscore:String,
    verG:String,
    verRemark:String,
    sen:String,
    sen1st:String,
    sen2nd:String,
    senca:String,
    senexam:String,
    senscore:String,
    senG:String,
    senRemark:String,
    cst:String,
    cst1st:String,
    cst2nd:String,
    cstca:String,
    cstexam:String,
    cstscore:String,
    cstG:String,
    cstRemark:String,
    cra:String,
    cra1st:String,
    cra2nd:String,
    craca:String,
    craexam:String,
    crascore:String,
    craG:String,
    craRemark:String,
    pvs:String,
    pvs1st:String,
    pvs2nd:String,
    pvsca:String,
    pvsexam:String,
    pvsscore:String,
    pvsG:String,
    pvsRemark:String,
    rnv:String,
    rnv1st:String,
    rnv2nd:String,
    rnvca:String,
    rnvexam:String,
    rnvscore:String,
    rnvG:String,
    rnvRemark:String,
    plf:String,
    plf1st:String,
    plf2nd:String,
    plfca:String,
    plfexam:String,
    plfscore:String,
    plfG:String,
    plfRemark:String,
    crs:String,
    eng1st:String,
    eng2nd:String,
    engca:String,
    engexam:String,
    engscore:String,
    engG:String,
    engRemark:String,
    addmissionNo:String,
    class:{
        type: String,
        required: true
    },
    Treport:{
        type: String
    },
    term:{
        type: String,
        required: true
    },
    average:{
        type:String
    },
    No_subj:{
        type:String
    },
    score_obtainable:{
        type:String
    },
    score_obtain:{
        type:String
    },
    schoolName:{
        type: String,
        required: true
    },
    Treport:{
        type:String
    },
    section:{
        type:String
    },
    schoolAdd:{
        type: String,
       
    },
    absent:{
        type:String
    },
    present:{
        type:String
    },
    tReport:{
        type:String
    },
    promote:{
        type:String
    },
    fees:{
        type:String
    },
    nextterm:{
        type:String
    }
}, {timestamps:true })
const Blogs = mongoose.model('blogn', blogschema)
module.exports = Blogs;
