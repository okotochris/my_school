// calculating the grade of student 

let engscore = document.getElementById('engscore')
let mthscore = document.getElementById('mthscore')
let agrscore = document.getElementById('agrscore')
let crsscore = document.getElementById('crsscore')
let bscscore = document.getElementById('bscscore')
let btcscore = document.getElementById('btcscore')
let hecscore = document.getElementById('hecscore')
let frescore = document.getElementById('frescore')
let cscscore = document.getElementById('cscscore')
let pedscore = document.getElementById('pedscore')
let crascore = document.getElementById('crascore')
let artscore = document.getElementById('artscore')
let bstscore = document.getElementById('bstscore')
let cedscore = document.getElementById('cedscore')
let hiyscore = document.getElementById('hiyscore')
let term = document.getElementById('Sterm')
let cal = document.getElementById('Calc')
let sclass = document.getElementById('Sclass')
let report = document.getElementById("Treport")





//ENGLISH
engscore.onmouseover = function(){
    let x = Number(document.getElementById('eng2nd').value)
    let x2 = Number(document.getElementById('eng1st').value)
    let x3 = Number(document.getElementById('engexam').value)
    let ca = Number(document.getElementById('engca').value)
    let grade = document.getElementById('engG')
    let remark = document.getElementById('engRemark')
    let score = engscore;
    comput(x, x2, x3, ca, score, grade, remark)
}


// MATHES
mthscore.onmouseover = function(){
    let x = Number(document.getElementById('mth2nd').value)
    let x2 = Number(document.getElementById('mth1st').value)
    let x3 = Number(document.getElementById('mthexam').value)
    let ca = Number(document.getElementById('mthca').value)
    let grade = document.getElementById('mthG')
    let remark = document.getElementById('mthRemark')
    let score = mthscore;
    comput(x, x2, x3, ca, score, grade, remark)   
}

// CCA called art
artscore.onmouseover = function(){
    let x = Number(document.getElementById('art2nd').value)
    let x2 = Number(document.getElementById('art1st').value)
    let x3 = Number(document.getElementById('artexam').value)
    let ca = Number(document.getElementById('artca').value)
    let grade = document.getElementById('artG')
    let remark = document.getElementById('artRemark')
    let score = artscore;
    comput(x, x2, x3, ca, score, grade, remark)   
}

//AGRICUTURAL STUDY
agrscore.onmouseover = function(){
    let x = Number(document.getElementById('agr2nd').value)
    let x2 = Number(document.getElementById('agr1st').value)
    let x3 = Number(document.getElementById('agrexam').value)
    let ca = Number(document.getElementById('agrca').value)
    let grade = document.getElementById('agrG')
    let remark = document.getElementById('agrRemark')
    let score = agrscore;
    comput(x, x2, x3, ca, score, grade, remark)
}

// CRS
crsscore.onmouseover = function(){
    let x = Number(document.getElementById('crs2nd').value)
    let x2 = Number(document.getElementById('crs1st').value)
    let x3 = Number(document.getElementById('crsexam').value)
    let ca = Number(document.getElementById('crsca').value)
    let grade = document.getElementById('crsG')
    let remark = document.getElementById('crsRemark')
    let score = crsscore;
    comput(x, x2, x3, ca, score, grade, remark)
}

// basic science
bscscore.onmouseover = function(){
    let x = Number(document.getElementById('bsc2nd').value)
    let x2 = Number(document.getElementById('bsc1st').value)
    let x3 = Number(document.getElementById('bscexam').value)
    let ca = Number(document.getElementById('bscca').value)
    let grade = document.getElementById('bscG')
    let remark = document.getElementById('bscRemark')
    let score = bscscore;
    comput(x, x2, x3, ca, score, grade, remark)
}

// basic science
btcscore.onmouseover = function(){
    let x = Number(document.getElementById('btc2nd').value)
    let x2 = Number(document.getElementById('btc1st').value)
    let x3 = Number(document.getElementById('btcexam').value)
    let ca = Number(document.getElementById('btcca').value)
    let grade = document.getElementById('btcG')
    let remark = document.getElementById('btcRemark')
    let score = btcscore;
    comput(x, x2, x3, ca, score, grade, remark)
}

// HOME ECONOMIC 
hecscore.onmouseover = function(){
    let x3 = Number(document.getElementById('hecexam').value)
    let x = Number(document.getElementById('hec2nd').value)
    let x2 = Number(document.getElementById('hec1st').value)
    let ca = Number(document.getElementById('hecca').value)
    let grade = document.getElementById('hecG')
    let remark = document.getElementById('hecRemark')
    let score = hecscore;
    comput(x, x2, x3, ca, score, grade, remark)
}

// FRENCH 
frescore.onmouseover = function(){
    let x = Number(document.getElementById('fre2nd').value)
    let x3 = Number(document.getElementById('freexam').value)
    let x2 = Number(document.getElementById('fre1st').value)
    let ca = Number(document.getElementById('freca').value)
    let grade = document.getElementById('freG')
    let remark = document.getElementById('freRemark')
    let score = frescore;
    comput(x, x2, x3, ca, score, grade, remark)
}

// COMPUTER STUDY
cscscore.onmouseover = function(){
    let x = Number(document.getElementById('csc2nd').value)
    let x2 = Number(document.getElementById('csc1st').value)
    let x3 = Number(document.getElementById('cscexam').value)
    let ca = Number(document.getElementById('cscca').value)
    let grade = document.getElementById('cscG')
    let remark = document.getElementById('cscRemark')
    let score = cscscore;
    comput(x, x2, x3, ca, score, grade, remark)
}
// PHYSICAL HEALTH EDUCATION
pedscore.onmouseover = function(){
    let x = Number(document.getElementById('ped2nd').value)
    let x2 = Number(document.getElementById('ped1st').value)
    let x3 = Number(document.getElementById('pedexam').value)
    let ca = Number(document.getElementById('pedca').value)
    let grade = document.getElementById('pedG')
    let remark = document.getElementById('pedRemark')
    let score = pedscore;
    comput(x, x2, x3, ca, score, grade, remark)
}

// CULTURE AND CREATIVE ACT 
crascore.onmouseover = function(){
    let x = Number(document.getElementById('cra2nd').value)
    let x2 = Number(document.getElementById('cra1st').value)
    let x3 = Number(document.getElementById('craexam').value)
    let ca = Number(document.getElementById('craca').value)
    let grade = document.getElementById('craG')
    let remark = document.getElementById('craRemark')
    let score = crascore;
    comput(x, x2, x3, ca, score, grade, remark)
}
// hausa igbo yoroba
hiyscore.onmouseover = function(){
    let x = Number(document.getElementById('hiy2nd').value)
    let x2 = Number(document.getElementById('hiy1st').value)
    let x3 = Number(document.getElementById('hiyexam').value)
    let ca = Number(document.getElementById('hiyca').value)
    let grade = document.getElementById('hiyG')
    let remark = document.getElementById('hiyRemark')
    let score = hiyscore;
    comput(x, x2, x3, ca, score, grade, remark)
}



// CIVIC EDUCATION
cedscore.onmouseover = function(){
    let x = Number(document.getElementById('ced2nd').value)
    let x2 = Number(document.getElementById('ced1st').value)
    let x3 = Number(document.getElementById('cedexam').value)
    let ca = Number(document.getElementById('cedca').value)
    let grade = document.getElementById('cedG')
    let remark = document.getElementById('cedRemark')
    let score = cedscore;
    comput(x, x2, x3, ca, score, grade, remark)
}

// BUSINESS STUDY
bstscore.onmouseover = function(){
    let x = Number(document.getElementById('bst2nd').value)
    let x2 = Number(document.getElementById('bst1st').value)
    let x3 = Number(document.getElementById('bstexam').value)
    let ca = Number(document.getElementById('bstca').value)
    let grade = document.getElementById('bstG')
    let remark = document.getElementById('bstRemark')
    let score = bstscore;
    comput(x, x2, x3, ca, score, grade, remark)
}


// CACULATING THE GRADE POINT
function comput(x, x2, x3, ca, score, grade, remark){
    if(x > 0 || x2 > 0 || x3 > 0){  
        score.value = x + x2 + x3 + ca
    }
    else{
        score.value = ""
    }

    let x4 = Number(score.value)
    if(x4 > 79){
        grade.value = "A+"
        remark.value = "Excellent"
    }
    else if (x4 > 69){
        grade.value = "A"
        remark.value = "Very Good"
    }
    else if(x4 > 59 && x4 < 70){
        grade.value = "B" 
        remark.value = "Credit"
    }
    else if(x4 > 49 && x4 < 60){
        grade.value = "C"
        remark.value = "Merit"
    }
    else if(x4 > 39 && x4 < 50){
        grade.value = "D"
        remark.value = "Pass"
    }
    else if(x4 > 0 && x4 < 40){
        grade.value = "F"
        remark.value = "Fail"
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
    event.preventDefault();

    // converting name to upper case before uploading 
       let userNameElement = document.getElementById('userName')
       let userName = userNameElement.value.toUpperCase()
       userNameElement.value = userName;

    //calculating for the total student perfomance 
    let course = 0;
    let total = Number(bscscore.value) + Number(agrscore.value) + Number(hiyscore.value)  + Number(bstscore.value) + Number(artscore.value) + Number(mthscore.value)  + Number(frescore.value) + Number(btcscore.value) + Number(engscore.value) + Number(cscscore.value) + Number(hecscore.value) + Number(crascore.value) + Number(pedscore.value)  + Number(cedscore.value) + Number(crsscore.value);
    
    //checking the number of courses offered 
        if(bscscore.value != ""){
            course++;
        }
        if(btcscore.value != ""){
            course++;
        }
        if(hiyscore.value != ""){
            course++;
        }
        if(frescore.value != ""){
            course++;
        }
        if(mthscore.value != ""){
            course++;
        }
        if(engscore.value != ""){
            course++;
        }
        if(hecscore.value != ""){
            course++;
        }
        if(crascore.value != ""){
            course++;
        }
        if(cscscore.value != ""){
            course++;
        }
        if(pedscore.value != ""){
            course++;
        }
        
        
        if(agrscore.value != ""){
            course++;
        }
        if(cedscore.value != ""){
            course++;
        }
             
        if(crsscore.value != ""){
            course++;
        }
        if(bstscore.value != ""){
            course++;
        }
        if(artscore.value != ""){
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
       report.value = "Exellent Performance Keep It Up"
    }
    else if(performance >= 70 && performance < 80 ){
        report.value = "Very Good Perfomance Keep It Up"
    }
    else if(performance >= 50 && performance < 70 ){
        report.value = " Good Perfomance"
    }
    else{
        report.value = "Poor Perfomance Try Harder Next Term"
    }

    if(term.value == 'THIRD TERM' && sclass.value == "JSS1" && performance >= 50){
        report.value +=" " + "Promoted to JSS2"
    }
    else if(term.value == 'THIRD TERM' && sclass.value == "JSS2"  && performance >= 50){
        report.value += " " + "Promoted to JSS3"
    }
    
    
}