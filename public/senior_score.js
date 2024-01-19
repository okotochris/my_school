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
let term = document.getElementById('Sterm')
let cal = document.getElementById('Calc')
let sclass = document.getElementById('Sclass')
let report = document.getElementById("Treport")






//ENGLISH
//ACCOUNTING 
engscore.onmouseover = function(){
    let x = Number(document.getElementById('eng2nd').value)
    let x2 = Number(document.getElementById('eng1st').value)
    let x3 = Number(document.getElementById('engexam').value)
    let grade = document.getElementById('engG')
    let score = engscore;
    comput(x, x2, x3, score, grade)
}

// MATHES
mthscore.onmouseover = function(){
    let x = Number(document.getElementById('mth2nd').value)
    let x2 = Number(document.getElementById('mth1st').value)
    let x3 = Number(document.getElementById('mthexam').value)
    let grade = document.getElementById('mthG')
    let score = mthscore;
    comput(x, x2, x3, score, grade)   
}
//BIOLOGY
bioscore.onmouseover = function(){
    let x = Number(document.getElementById('bio2nd').value)
    let x2 = Number(document.getElementById('bio1st').value)
    let x3 = Number(document.getElementById('bioexam').value)
    let grade = document.getElementById('bioG')
    let score = bioscore;
    comput(x, x2, x3, score, grade)   
}
//GOVERNMENT
govscore.onmouseover = function(){
    let x = Number(document.getElementById('gov2nd').value)
    let x2 = Number(document.getElementById('gov1st').value)
    let x3 = Number(document.getElementById('govexam').value)
    let grade = document.getElementById('govG')
    let score = govscore;
    comput(x, x2, x3, score, grade)   
    
}
// FURTHER MATHES 
fmtscore.onmouseover = function(){
    let x = Number(document.getElementById('fmt2nd').value)
    let x2 = Number(document.getElementById('fmt1st').value)
    let x3 = Number(document.getElementById('fmtexam').value)
    let grade = document.getElementById('fmtG')
    let score = fmtscore;
    comput(x, x2, x3, score, grade)
}
// ECONOMICS
ecoscore.onmouseover = function(){
    let x = Number(document.getElementById('eco2nd').value)
    let x2 = Number(document.getElementById('eco1st').value)
    let x3 = Number(document.getElementById('ecoexam').value)
    let grade = document.getElementById('ecoG')
    let score = ecoscore;
    comput(x, x2, x3, score, grade)
}

// LICTRATURE 
litscore.onmouseover = function(){
    let x = Number(document.getElementById('lit2nd').value)
    let x2 = Number(document.getElementById('lit1st').value)
    let x3 = Number(document.getElementById('litexam').value)
    let grade = document.getElementById('litG')
    let score = litscore;
    comput(x, x2, x3, score, grade)
}
//COMPUTER SCIENCE
cstscore.onmouseover = function(){
    let x = Number(document.getElementById('cst2nd').value)
    let x2 = Number(document.getElementById('cst1st').value)
    let x3 = Number(document.getElementById('cstexam').value)
    let grade = document.getElementById('cstG')
    let score = cstscore;
    comput(x, x2, x3, score, grade)
}

//CIVI EDUCATION 
civscore.onmouseover = function(){
    let x = Number(document.getElementById('civ2nd').value)
    let x2 = Number(document.getElementById('civ1st').value)
    let x3 = Number(document.getElementById('civexam').value)
    let grade = document.getElementById('civG')
    let score = civscore;
    comput(x, x2, x3, score, grade)
}

//CHEMISTRY 
chescore.onmouseover = function(){
    let x = Number(document.getElementById('che2nd').value)
    let x2 = Number(document.getElementById('che1st').value)
    let x3 = Number(document.getElementById('cheexam').value)
    let grade = document.getElementById('cheG')
    let score = chescore;
    comput(x, x2, x3, score, grade)
}//AGRICUTURAL STUDY
agrscore.onmouseover = function(){
    let x = Number(document.getElementById('agr2nd').value)
    let x2 = Number(document.getElementById('agr1st').value)
    let x3 = Number(document.getElementById('agrexam').value)
    let grade = document.getElementById('agrG')
    let score = agrscore;
    comput(x, x2, x3, score, grade)
}

//GEOGRAPHY
geoscore.onmouseover = function(){
    let x = Number(document.getElementById('geo2nd').value)
    let x2 = Number(document.getElementById('geo1st').value)
    let x3 = Number(document.getElementById('geoexam').value)
    let grade = document.getElementById('geoG')
    let score = geoscore;
    comput(x, x2, x3, score, grade)
}

physcore.onmouseover = function(){
    let x = Number(document.getElementById('phy2nd').value)
    let x2 = Number(document.getElementById('phy1st').value)
    let x3 = Number(document.getElementById('phyexam').value)
    let grade = document.getElementById('phyG')
    let score = physcore;
    comput(x, x2, x3, score, grade)
}

//COMMERCE 
comscore.onmouseover = function(){
    let x = Number(document.getElementById('com2nd').value)
    let x2 = Number(document.getElementById('com1st').value)
    let x3 = Number(document.getElementById('comexam').value)
    let grade = document.getElementById('comG')
    let score = comscore;
    comput(x, x2, x3, score, grade)
}

// CRS
crsscore.onmouseover = function(){
    let x = Number(document.getElementById('crs2nd').value)
    let x2 = Number(document.getElementById('crs1st').value)
    let x3 = Number(document.getElementById('crsexam').value)
    let grade = document.getElementById('crsG')
    let score = crsscore;
    comput(x, x2, x3, score, grade)
}

//ACCOUNTING 
accscore.onmouseover = function(){
    let x = Number(document.getElementById('acc2nd').value)
    let x2 = Number(document.getElementById('acc1st').value)
    let x3 = Number(document.getElementById('accexam').value)
    let grade = document.getElementById('accG')
    let score = accscore;
    comput(x, x2, x3, score, grade)
}

// CACULATING THE GRADE POINT
function comput(x, x2, x3, score, grade){
    if(x > 0 || x2 > 0 || x3 > 0){  
        score.value = x + x2 + x3
    }
    else{
        score.value = ""
    }
    let x4 = Number(score.value)
    if(x4 > 79){
        grade.value = "A+"
    }
    else if (x4 > 69){
        grade.value = "A"
    }
    else if(x4 > 59 && x4 < 70){
        grade.value = "B" 
    }
    else if(x4 > 49 && x4 < 60){
        grade.value = "C"
    }
    else if(x4 > 39 && x4 < 50){
        grade.value = "D"
    }
    else if(x4 > 0 && x4 < 40){
        grade.value = "F"
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

cal.onclick= function(){
    event.preventDefault()
    // converting name to upper case before uploading 
    let userNameElement = document.getElementById('userName')
    let userName = userNameElement.value.toUpperCase()
    userNameElement.value = userName;

    let course = 0;
    let total = Number(govscore.value) + Number(bioscore.value) + Number(mthscore.value)+ Number(engscore.value) + Number(fmtscore.value) + Number(ecoscore.value) + Number(litscore.value) + Number(cstscore.value) + Number(civscore.value) + Number(chescore.value) + Number(agrscore.value) + Number(geoscore.value) + Number(physcore.value) + Number(comscore.value) + Number(crsscore.value) + Number(accscore.value)
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