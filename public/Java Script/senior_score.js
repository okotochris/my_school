// calculating the grade of student 

let engscore = document.getElementById('engscore')
let mthscore = document.getElementById('mthscore')
let bioscore = document.getElementById('bioscore')
let govscore = document.getElementById('govscore')
let fmtscore = document.getElementById('fmtscore')
let ecoscore = document.getElementById('ecoscore')
let litscore = document.getElementById('litscore')
let cstscore = document.getElementById('cstscore')
let civscore = document.getElementById('civscore')
let chescore = document.getElementById('chescore')
let agrscore = document.getElementById('agrscore')
let geoscore = document.getElementById('geoscore')
let physcore = document.getElementById('physcore')
let comscore = document.getElementById('comscore')
let crsscore = document.getElementById('crsscore')
let accscore = document.getElementById('accscore')
let mktscore = document.getElementById('mktscore')
let term = document.getElementById('Sterm')
let cal = document.getElementById('Calc')
let sclass = document.getElementById('Sclass')
let report = document.getElementById("Treport")






//ENGLISH
engscore.onmouseover = function(){
    let x = Number(document.getElementById('eng2nd').value)
    let x2 = Number(document.getElementById('eng1st').value)
    let x3 = Number(document.getElementById('engexam').value)
    let x4 = Number(document.getElementById('engcca').value)
    let grade = document.getElementById('engG')
    let Remark = document.getElementById('engRemark')
    let score = engscore;
    comput(x, x2, x3, x4, score, grade, Remark)
}

// MATHES
mthscore.onmouseover = function(){
    let x = Number(document.getElementById('mth2nd').value)
    let x2 = Number(document.getElementById('mth1st').value)
    let x3 = Number(document.getElementById('mthexam').value)
    let x4 = Number(document.getElementById('mthcca').value)
    let grade = document.getElementById('mthG')
    let Remark = document.getElementById('mthRemark')
    let score = mthscore;
    comput(x, x2, x3, x4, score, grade, Remark)   
}
//BIOLOGY
bioscore.onmouseover = function(){
    let x = Number(document.getElementById('bio2nd').value)
    let x2 = Number(document.getElementById('bio1st').value)
    let x3 = Number(document.getElementById('bioexam').value)
    let x4 = Number(document.getElementById('biocca').value)
    let grade = document.getElementById('bioG')
    let Remark = document.getElementById('bioRemark')
    let score = bioscore;
    comput(x, x2, x3, x4, score, grade, Remark)   
}
//GOVERNMENT
govscore.onmouseover = function(){
    let x = Number(document.getElementById('gov2nd').value)
    let x2 = Number(document.getElementById('gov1st').value)
    let x3 = Number(document.getElementById('govexam').value)
    let x4 = Number(document.getElementById('govcca').value)
    let grade = document.getElementById('govG')
    let Remark = document.getElementById('govRemark')
    let score = govscore;
    comput(x, x2, x3, x4, score, grade, Remark)   
    
}
// FURTHER MATHES 
fmtscore.onmouseover = function(){
    let x = Number(document.getElementById('fmt2nd').value)
    let x2 = Number(document.getElementById('fmt1st').value)
    let x3 = Number(document.getElementById('fmtexam').value)
    let x4 = Number(document.getElementById('fmtcca').value)
    let grade = document.getElementById('fmtG')
    let Remark = document.getElementById('fmtRemark')
    let score = fmtscore;
    comput(x, x2, x3, x4, score, grade, Remark)
}
// ECONOMICS
ecoscore.onmouseover = function(){
    let x = Number(document.getElementById('eco2nd').value)
    let x2 = Number(document.getElementById('eco1st').value)
    let x3 = Number(document.getElementById('ecoexam').value)
    let x4 = Number(document.getElementById('ecocca').value)
    let grade = document.getElementById('ecoG')
    let Remark = document.getElementById('ecoRemark')
    let score = ecoscore;
    comput(x, x2, x3, x4, score, grade, Remark)
}

// LICTRATURE 
litscore.onmouseover = function(){
    let x = Number(document.getElementById('lit2nd').value)
    let x2 = Number(document.getElementById('lit1st').value)
    let x3 = Number(document.getElementById('litexam').value)
    let x4 = Number(document.getElementById('litcca').value)
    let grade = document.getElementById('litG')
    let Remark = document.getElementById('litRemark')
    let score = litscore;
    comput(x, x2, x3, x4, score, grade, Remark)
}
//COMPUTER SCIENCE
cstscore.onmouseover = function(){
    let x = Number(document.getElementById('cst2nd').value)
    let x2 = Number(document.getElementById('cst1st').value)
    let x3 = Number(document.getElementById('cstexam').value)
    let x4 = Number(document.getElementById('cstcca').value)
    let grade = document.getElementById('cstG')
    let Remark = document.getElementById('cstRemark')
    let score = cstscore;
    comput(x, x2, x3, x4, score, grade, Remark)
}

//CIVI EDUCATION 
civscore.onmouseover = function(){
    let x = Number(document.getElementById('civ2nd').value)
    let x2 = Number(document.getElementById('civ1st').value)
    let x3 = Number(document.getElementById('civexam').value)
    let x4 = Number(document.getElementById('civcca').value)
    let grade = document.getElementById('civG')
    let Remark = document.getElementById('civRemark')
    let score = civscore;
    comput(x, x2, x3, x4, score, grade, Remark)
}

//CHEMISTRY 
chescore.onmouseover = function(){
    let x = Number(document.getElementById('che2nd').value)
    let x2 = Number(document.getElementById('che1st').value)
    let x3 = Number(document.getElementById('cheexam').value)
    let x4 = Number(document.getElementById('checca').value)
    let grade = document.getElementById('cheG')
    let Remark = document.getElementById('cheRemark')
    let score = chescore;
    comput(x, x2, x3, x4, score, grade, Remark)
}//AGRICUTURAL STUDY
agrscore.onmouseover = function(){
    let x = Number(document.getElementById('agr2nd').value)
    let x2 = Number(document.getElementById('agr1st').value)
    let x3 = Number(document.getElementById('agrexam').value)
    let x4 = Number(document.getElementById('agrcca').value)
    let grade = document.getElementById('agrG')
    let Remark = document.getElementById('agrRemark')
    let score = agrscore;
    comput(x, x2, x3, x4, score, grade, Remark)
}

//GEOGRAPHY
geoscore.onmouseover = function(){
    let x = Number(document.getElementById('geo2nd').value)
    let x2 = Number(document.getElementById('geo1st').value)
    let x3 = Number(document.getElementById('geoexam').value)
    let x4 = Number(document.getElementById('geocca').value)
    let grade = document.getElementById('geoG')
    let Remark = document.getElementById('geoRemark')
    let score = geoscore;
    comput(x, x2, x3, x4, score, grade, Remark)
}

physcore.onmouseover = function(){
    let x = Number(document.getElementById('phy2nd').value)
    let x2 = Number(document.getElementById('phy1st').value)
    let x3 = Number(document.getElementById('phyexam').value)
    let x4 = Number(document.getElementById('phycca').value)
    let grade = document.getElementById('phyG')
    let Remark = document.getElementById('phyRemark')
    let score = physcore;
    comput(x, x2, x3, x4, score, grade, Remark)
}

//COMMERCE 
comscore.onmouseover = function(){
    let x = Number(document.getElementById('com2nd').value)
    let x2 = Number(document.getElementById('com1st').value)
    let x3 = Number(document.getElementById('comexam').value)
    let x4 = Number(document.getElementById('comcca').value)
    let grade = document.getElementById('comG')
    let Remark = document.getElementById('comRemark')
    let score = comscore;
    comput(x, x2, x3, x4, score, grade, Remark)
}

// CRS
crsscore.onmouseover = function(){
    let x = Number(document.getElementById('crs2nd').value)
    let x2 = Number(document.getElementById('crs1st').value)
    let x3 = Number(document.getElementById('crsexam').value)
    let x4 = Number(document.getElementById('crscca').value)
    let grade = document.getElementById('crsG')
    let Remark = document.getElementById('crsRemark')
    let score = crsscore;
    comput(x, x2, x3, x4, score, grade, Remark)
}

//ACCOUNTING 
accscore.onmouseover = function(){
    let x = Number(document.getElementById('acc2nd').value)
    let x2 = Number(document.getElementById('acc1st').value)
    let x3 = Number(document.getElementById('accexam').value)
    let x4 = Number(document.getElementById('acccca').value)
    let grade = document.getElementById('accG')
    let Remark = document.getElementById('accRemark')
    let score = accscore;
    comput(x, x2, x3, x4, score, grade, Remark)
}
//MARKETING 
mktscore.onmouseover = function(){
    let x = Number(document.getElementById('mkt2nd').value)
    let x2 = Number(document.getElementById('mkt1st').value)
    let x3 = Number(document.getElementById('mktexam').value)
    let x4 = Number(document.getElementById('mktcca').value)
    let grade = document.getElementById('mktG')
    let Remark = document.getElementById('mktRemark')
    let score = mktscore;
    comput(x, x2, x3, x4, score, grade, Remark)
}

// CACULATING THE GRADE POINT
function comput(x, x2, x3, x4, score, grade, Remark){
    if(x > 0 || x2 > 0 || x3 > 0 || x4 > 0){  
        score.value = x + x2 + x3 + x4;
    }
    else{
        score.value = ""
    }
     x4 = Number(score.value)
    if(x4 > 79){
        grade.value = "A+"
        Remark.value = "Excellent"
    }
    else if (x4 > 69){
        grade.value = "A"
        Remark.value = "Very Good"
    }
    else if(x4 > 59 && x4 < 70){
        grade.value = "B" 
        Remark.value = "Credit"
    }
    else if(x4 > 49 && x4 < 60){
        grade.value = "C"
        Remark.value = "Merit"
    }
    else if(x4 > 39 && x4 < 50){
        grade.value = "D"
        Remark.value = "Pass"
    }
    else if(x4 > 0 && x4 < 40){
        grade.value = "F"
        Remark.value = "Fail"
    }
    else{
        grade.value = ""
    }
}


//CACULATING AVERAGE SCORE
let average = document.getElementById('average')
let No_subj = document.getElementById('No_subj')
let score_obtainable = document.getElementById('score_obtainable')
let score_obtain = document.getElementById('score_obtain')

cal.onclick= function(event){
    event.preventDefault()
    // converting name to upper case before uploading 
    let userNameElement = document.getElementById('userName')
    let userName = userNameElement.value.toUpperCase()
    userNameElement.value = userName;

    let course = 0;
    let total = Number(govscore.value) + Number(bioscore.value) + Number(mthscore.value)+ Number(engscore.value) + Number(fmtscore.value) + Number(ecoscore.value) + Number(litscore.value) + Number(cstscore.value) + Number(civscore.value) + Number(chescore.value) + Number(agrscore.value) + Number(geoscore.value) + Number(physcore.value) + Number(comscore.value) + Number(crsscore.value) + Number(mktscore.value) + Number(accscore.value)
        if(govscore.value != ""){
            course++;
        }
        if(bioscore.value != ""){
            course++;
        }
        if(mthscore.value != ""){
            course++;
        }
        if(engscore.value != ""){
            course++;
        }
        if(fmtscore.value != ""){
            course++;
        }
        if(ecoscore.value != ""){
            course++;
        }
        if(litscore.value != ""){
            course++;
        }
        if(cstscore.value != ""){
            course++;
        }
        if(civscore.value != ""){
            course++;
        }
       
        if(chescore.value != ""){
            course++;
        }
        if(agrscore.value != ""){
            course++;
        }
        if(geoscore.value != ""){
            course++;
        }
        if(physcore.value != ""){
            course++;
        }
        if(comscore.value != ""){
            course++;
        }
        if(crsscore.value != ""){
            course++;
        }
        if(accscore.value != ""){
            course++;
        }
        if(mktscore.value != ""){
            course++;
        }
    
    No_subj.value = course;
    
    let aver = (total/course).toFixed(2)
    if( aver != 'NaN' ){ 
    average.value = aver
    console.log(aver)
    }
    score_obtainable.value = (course*100)
    score_obtain.value = total;
    let performance = total/course

    if(performance >= 80){
       report.value = "Distinction Keep It Up"
    }
    else if(performance >= 70 && performance < 80 ){
        report.value = "Excellent Perfomance Keep It Up"
    }
    else if(performance >= 50 && performance < 70 ){
        report.value = " Good Perfomance"
    }
    else{
        report.value = "Poor Perfomance Try Harder Next Term"
    }

    if(term.value == " " +'THIRD TERM' && sclass.value == "SS1" && performance >= 50){
        report.value += "Promoted to SS2"
    }
    else if(term.value == 'THIRD TERM' && sclass.value == "SS2"  && performance >= 50){
        report.value += " " + "Promoted to SS3"
    }
    
    
}