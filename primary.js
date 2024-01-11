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
    mthG:{
        type: String
    },
    mthexam:{
        type:String
    },
    mthscore:{
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
    engexam:{
        type:String
    },
    engscore:{
        type:String
    },
    engG:{
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
    rnvexam:{
        type:String
    },
    rnvscore:{
        type:String
    },
    rnvG:{
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
    bstexam:{
        type:String
    },
    bstscore:{
        type:String
    },
    bstG:{
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
    pvsexam:{
        type:String
    },
    pvsscore:{
        type:String
    },
    pvsG:{
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
    qurexam:{
        type:String
    },
    qurscore:{
        type:String
    },
    qurG:{
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
    verexam:{
        type:String
    },
    verscore:{
        type:String
    },
    verG:{
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
    vstexam:{
        type:String
    },
    vstscore:{
        type:String
    },
    vstG:{
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
    craexam:{
        type:String
    },
    crascore:{
        type:String
    },
    craG:{
        type:String
    },
    spe:{
        type:String
    },
    spe1st:{
        type:String
    },
    spe2nd:{
        type:String
    }, 
    speexam:{
        type:String
    },
    spescore:{
        type:String
    },
    speG:{
        type:String
    },
    hwr:{
        type:String
    },
    hwr1st:{
        type:String
    },
    hwr2nd:{
        type:String
    }, 
    hwrexam:{
        type:String
    },
    hwrscore:{
        type:String
    },
    hwrG:{
        type:String
    },
    mus:{
        type:String
    },
    mus1st:{
        type:String
    },
    mus2nd:{
        type:String
    }, 
    musexam:{
        type:String
    },
    musscore:{
        type:String
    },
    musG:{
        type:String
    },
    red:{
        type:String
    },
    red1st:{
        type:String
    },
    red2nd:{
        type:String
    }, 
    redexam:{
        type:String
    },
    redscore:{
        type:String
    },
    redG:{
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
    section:{
        type:String
    },
    schoolAdd:{
        type: String,
        required: true
    },
}, {timestamp: true})
const Blog = mongoose.model('Blogp', blogSchema)

module.exports = Blog