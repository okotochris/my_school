const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const blogschema = new Schema({
    eng: {
        type:String,
       
    },
    eng1st:{
        type:String,
       
    },
    eng2nd:{
        type:String,
        
    },
    engexam:{
        type:String,
       
    },
    engG:{
        type:String,
        
    },
    engscore:{
        type:String,
        
    },
    mth:{
        type: String,
        
    },
    mth1st:{
        type: String,
       
    },
    mth2nd:{
        type: String,
        
    },
    mthexam:{
        type: String,
       
    },
    mthscore:{
        type: String,
       
    },
    mthG:{
        type: String,
       
    },
    bsc:{
        type: String,
        
    },
    bsc1st:{
        type: String,
        
    },
    bsc2nd:{
        type: String,
       
    },
    bscexam:{
        type: String,
        
    },
    bscscore:{
        type: String,
        
    },
    bscG:{
        type: String,
        
    },
    btc:{
        type: String, 
    },
    btc1st:{
        type: String 
    },
    btc2nd:{
        type: String 
    },
    btcexam:{
        type: String,
    },
    btcscore:{
        type: String,
    },
    btcG:{
        type: String,
        
    },
    hec:{
        type: String, 
    },
    hec1st:{
        type: String,
      },
    hec2nd:{
        type: String,
    },
    hecexam:{
        type: String,
   
    },
    hecscore:{
        type: String,
   
    },
    hecG:{
        type: String,

    },
    fre:{
        type: String,

    },
    fre1st:{
        type: String,
 
    },
    fre2nd:{
        type: String,
     
    },
    freexam:{
        type: String,
    },
    frescore:{
        type: String,
    },
    freG:{
        type: String,
    },
    agr:{
        type: String,
     
    },
    agr1st:{
        type: String,
      
    },
    agr2nd:{
        type: String,
        
    },
    agrexam:{
        type: String,
    },
    agrscore:{
        type: String,
    },
    agrG:{type: String},
    csc:{
        type: String,
       
    },
    csc1st:{
        type: String,
      
    },
    csc2nd:{
        type: String,
       
    },
    cscexam:{
        type: String,
    },
    cscscore:{
        type: String,
    },
    cscG:{
        type: String,
       
    },
    crs:{
        type: String,
       
    },
    crs1st:{
        type: String,
        
    },
    crs2nd:{
        type: String,
       
    },
    crsexam:{
        type: String,
    },
    crsscore:{
        type: String,
    },
    crsG:{
        type: String,
       
    },
    ped:{
        type: String,
       
    },
    ped1st:{
        type: String,
        
    },
    ped2nd:{
        type: String,
        
    },
    pedexam:{
        type: String,
    },
    pedscore:{
        type: String,
    },
    pedG:{
        type: String,
       
    },
    cra:{
        type: String,
        
    },
    cra1st:{
        type: String,
        
    },
    cra2nd:{
        type: String,
        
    },
    craexam:{
        type: String,
    },

    crascore:{
        type: String,
    },
    craG:{
        type: String,
       
    },
    hiy:{
        type: String,
    },
    hiy1st:{
        type: String,
        
    },
    hiy2nd:{
        type: String,
        
    },
    hiyexam:{
        type: String,
    },
    hiyscore:{
        type: String,
    },
    hiyG:{
        type: String,
    },
    std:{
        type: String,
       
    },
    std1st:{
        type: String,
        
    },
    std2nd:{
        type: String,
       
    },
    stdexam:{
        type: String,
    },
    stdscore:{
        type: String,
    },
    stdG:{
        type: String,
        
    },
    ced:{
        type: String,
       
    },
    ced1st:{
        type: String,
       
    },
    ced2nd:{
        type: String,
        
    },
    cedexam:{
        type: String,
    },
    cedscore:{
        type: String,
    },
    cedG:{
        type: String,
    },
    bst:{
        type: String,
    },
    bst1st:{
        type: String,
    },
    bst2nd:{
        type: String,
    },
    bstexam:{
        type: String,
    },
    bstscore:{
        type: String,
    },
    bstG:{
        type: String,
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

}, {timestamps:true })
const Blog = mongoose.model('Blog', blogschema)
module.exports = Blog;
