const mongoose = require('mongoose')

Schema = mongoose.Schema;

blogSchema = new Schema({
    mth:{
        type: String
    },
    mth1st:{
        type:String
    },
    mth2nd:{
        type:String
    }, 
    mthca:{
        type:String
    }, 
    mthG:{
        type: String
    },
    mthexam:{
        type:String
    },
    mthscore:{
        type:String
    },
    mthRemark:{
        type:String
    },
    eng:{
        type:String
    },
    eng1st:{
        type:String
    },
    eng2nd:{
        type:String
    },
    engca:{
        type:String
    }, 
    engexam:{
        type:String
    },
    engscore:{
        type:String
    },
    engG:{
        type: String
    },
    engRemark:{
        type: String
    },
    rnv:{
        type:String
    },
    rnv1st:{
        type:String
    },
    rnv2nd:{
        type:String
    }, 
    rnvca:{
        type:String
    }, 
    rnvexam:{
        type:String
    },
    rnvscore:{
        type:String
    },
    rnvG:{
        type: String
    },
    rnvRemark:{
        type: String
    },
    bst:{
        type:String
    },
    bst1st:{
        type:String
    },
    bst2nd:{
        type:String
    }, 
    bstca:{
        type:String
    }, 
    bstexam:{
        type:String
    },
    bstscore:{
        type:String
    },
    bstG:{
        type: String
    },
    bstRemark:{
        type: String
    },
    pvs:{
        type:String
    },
    pvs1st:{
        type:String
    },
    pvs2nd:{
        type:String
    },
    pvsca:{
        type:String
    }, 
    pvsexam:{
        type:String
    },
    pvsscore:{
        type:String
    },
    pvsG:{
        type: String
    },
    pvsRemark:{
        type: String
    },
    qur:{
        type:String
    },
    qur1st:{
        type:String
    },
    qur2nd:{
        type:String
    },
    qurca:{
        type:String
    }, 
    qurexam:{
        type:String
    },
    qurscore:{
        type:String
    },
    qurG:{
        type:String
    },
    qurRemark:{
        type:String
    },
    ver:{
        type:String
    },
    ver1st:{
        type:String
    },
    ver2nd:{
        type:String
    },
    verca:{
        type:String
    }, 
    verexam:{
        type:String
    },
    verscore:{
        type:String
    },
    verG:{
        type:String
    },
    verRemark:{
        type:String
    },
    vst:{
        type:String
    },
    vst1st:{
        type:String
    },
    vst2nd:{
        type:String
    },
    vstca:{
        type:String
    }, 
    vstexam:{
        type:String
    },
    vstscore:{
        type:String
    },
    vstG:{
        type:String
    },
    vstRemark:{
        type:String
    },
    cra:{
        type:String
    },
    cra1st:{
        type:String
    },
    cra2nd:{
        type:String
    },
    craca:{
        type:String
    }, 
    craexam:{
        type:String
    },
    crascore:{
        type:String
    },
    craG:{
        type:String
    },
    craRemark:{
        type:String
    },
    userName:{
        type: String,
        required: true
    },
    studentId:{
        type: String,
        required: true
    },
    absent:{
        type:String
    },
    present:{
        type:String
    },
    class:{
        type: String,
        required: true
    },
    term:{
        type: String,
        required: true
    },
    schoolName:{
        type: String,
        required: true
    },
    Treport:{
        type: String
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
    section:{
        type:String
    },
    schoolAdd:{
        type: String,
        required: true
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
}, {timestamps: true})
const Blog = mongoose.model('Blogn', blogSchema)

module.exports = Blog