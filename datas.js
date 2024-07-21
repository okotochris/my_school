const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const blogschema = new Schema({
    eng:{
        type: String
    },
    eng1st:{
        type: String,
       
    },
    eng2nd:{
        type: String,
        
    },
    engcca:{
        type: String,
        
    },
    engexam:{
        type: String,
    },
    engscore:{
        type: String,
    },
    engG:{
        type: String,
    },
    engRemark:{
        type: String,
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
    mthRemark:{
        type: String,
    },
    mthcca:{
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
    bio:{
        type: String,  
    },
    bio1st:{
        type: String,  
    },
    bio2nd:{
        type: String, 
    },
    bioexam:{
        type: String,  
    },
    bioscore:{
        type: String,  
    },
    bioG:{
        type: String, 
    },
    bioRemark:{
        type: String,
    },
    biocca:{
        type: String,
    },
    gov:{
        type: String,  
    },
    gov1st:{
        type: String,  
    },
    gov2nd:{
        type: String,  
    },
    govexam:{
        type: String,  
    },
    govscore:{
        type: String,  
    },
    govG:{
        type: String,  
    },
    govRemark:{
        type: String,
    },
    govcca:{
        type: String,
    },
    fmt:{
        type: String, 
    },
    fmt1st:{
        type: String 
    },
    fmt2nd:{
        type: String 
    },
    fmtexam:{
        type: String,
    },
    fmtscore:{
        type: String,
    },
    fmtG:{
        type: String,  
    },
    fmtRemark:{
        type: String,
    },
    fmtcca:{
        type: String,
    },
    eco:{
        type: String, 
    },
    eco1st:{
        type: String,
      },
    eco2nd:{
        type: String,
    },
    ecoexam:{
        type: String,
    },
    ecoscore:{
        type: String,
    },
    ecoG:{
        type: String,
    },
    ecoRemark:{
        type: String,
    },
    ecocca:{
        type: String,
    },
    lit:{
        type: String,

    },
    lit1st:{
        type: String,
 
    },
    lit2nd:{
        type: String,
     
    },
    litexam:{
        type: String,
    },
    litscore:{
        type: String,
    },
    litG:{
        type: String,
    
    },
    litRemark:{
        type: String,
    },
    litcca:{
        type: String,
    },
    cst:{
        type: String,
     
    },
    cst1st:{
        type: String,
      
    },
    cst2nd:{
        type: String,
        
    },
    cstexam:{
        type: String,
    },
    csscore:{
        type: String,
    },
    cstG:{
        type: String,
       
    },
    cstRemark:{
        type: String,
    },
    cstcca:{
        type: String,
    },
    civ:{type:String},
    civ1st:{
        type: String,
      
    },
    civ2nd:{
        type: String,
       
    },
    civexam:{
        type: String,
    },
    civscore:{
        type: String,
    },
    civG:{
        type: String,
       
    },
    civRemark:{
        type: String,
    },
    civcca:{
        type: String,
    },
    che:{
        type: String,
       
    },
    che1st:{
        type: String,
        
    },
    che2nd:{
        type: String,
       
    },
    cheexam:{
        type: String,
    },
    chescore:{
        type: String,
    },
    cheG:{
        type: String,
       
    },
    cheRemark:{
        type: String,
    },
    checca:{
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
    agrG:{
        type: String,
       
    },
    agrRemark:{
        type: String,
    },
    agrcca:{
        type: String,
    },
    geo:{
        type: String,
        
    },
    geo1st:{
        type: String,
        
    },
    geo2nd:{
        type: String,
        
    },
    geoexam:{
        type: String,
    },
    geoscore:{
        type: String,
    },
    geoG:{
        type: String,
       
    },
    geoRemark:{
        type: String,
    },
    geocca:{
        type: String,
    },
    phy:{
        type: String,
    },
    phy1st:{
        type: String,
        
    },
    phy2nd:{
        type: String,
        
    },
    phyexam:{
        type: String,
    },
    physcore:{
        type: String,
    },
    phyG:{
        type: String,
       
    },
    phyRemark:{
        type: String,
    },
    phycca:{
        type: String,
    },
    com:{
        type: String,
       
    },
    com1st:{
        type: String,
        
    },
    com2nd:{
        type: String,
       
    },
    comexam:{
        type: String,
    },
    comscore:{
        type: String,
    },
    comG:{
        type: String,
        
    },
    comRemark:{
        type: String,
    },
    comcca:{
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
    crsRemark:{
        type: String,
    },
    crscca:{
        type: String,
    },
    acc:{
        type: String,
    },
    acc1st:{
        type: String,
    },
    acc2nd:{
        type: String,
    },
    accexam:{
        type: String,
    },
    accscore:{
        type: String,
    },
    accG:{
        type: String,
    },
    accRemark:{
        type: String,
    },
    acccca:{
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
        required: true
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
const Blogs = mongoose.model('Sblog', blogschema)
module.exports = Blogs;
