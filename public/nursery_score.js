// calculating the grade of student 

let engscore = document.getElementById('engscore')
let mthscore = document.getElementById('mthscore')
let bstscore = document.getElementById('bstscore')
let rnvscore = document.getElementById('rnvscore')
let qurscore = document.getElementById('qurscore')
let pvsscore = document.getElementById('pvsscore')
let verscore = document.getElementById('verscore')
let vstscore = document.getElementById('vstscore')
let crascore = document.getElementById('crascore')
let vrnscore = document.getElementById('vrnscore')
let crsscore = document.getElementById('crsscore')
let plfscore = document.getElementById('plfscore')
let userNam = document.getElementById('userName')
let cal = document.getElementById('Calc')
let report = document.getElementById('Treport')
let term = document.getElementById('Sterm')



//ENGLISH
engscore.onmouseover = function(){
    let x = Number(document.getElementById('eng2nd').value)
    let x2 = Number(document.getElementById('eng1st').value)
    let ca = Number(document.getElementById('engca').value)
    let x3 = Number(document.getElementById('engexam').value)
    let grade = document.getElementById('engG')
    let Remark = document.getElementById('engRemark')
    let score = engscore;
    comput(x, x2,ca, x3, score, grade, Remark)
}
//creative are
rnvscore.onmouseover = function(){
    let x = Number(document.getElementById('rnv2nd').value)
    let x2 = Number(document.getElementById('rnv1st').value)
    let ca = Number(document.getElementById('rnvca').value)
    let x3 = Number(document.getElementById('rnvexam').value)
    let grade = document.getElementById('rnvG')
    let Remark = document.getElementById('rnvRemark')
    let score = rnvscore;
    comput(x, x2, ca, x3, score, grade, Remark)
}

// MATHES
mthscore.onmouseover = function(){
    let x = Number(document.getElementById('mth2nd').value)
    let x2 = Number(document.getElementById('mth1st').value)
    let ca = Number(document.getElementById('mthca').value)
    let x3 = Number(document.getElementById('mthexam').value)
    let grade = document.getElementById('mthG')
    let Remark = document.getElementById('mthRemark')
    let score = mthscore;
    comput(x, x2, ca, x3, score, grade, Remark)   
}

//QUALITATIVE REASONING 
qurscore.onmouseover = function(){
    let x = Number(document.getElementById('qur2nd').value)
    let x2 = Number(document.getElementById('qur1st').value)
    let ca = Number(document.getElementById('qurca').value)
    let x3 = Number(document.getElementById('qurexam').value)
    let grade = document.getElementById('qurG')
    let Remark = document.getElementById('qurRemark')
    let score = qurscore;
    comput(x, x2, ca, x3, score, grade, Remark)
}
//verbal reasoning
vrnscore.onmouseover = function(){
    let x = Number(document.getElementById('vrn2nd').value)
    let x2 = Number(document.getElementById('vrn1st').value)
    let ca = Number(document.getElementById('vrnca').value)
    let x3 = Number(document.getElementById('vrnexam').value)
    let grade = document.getElementById('vrnG')
    let Remark = document.getElementById('vrnRemark')
    let score = vrnscore;
    comput(x, x2, ca, x3, score, grade, Remark)
}

//CRS 
crsscore.onmouseover = function(){
    let x = Number(document.getElementById('crs2nd').value)
    let x2 = Number(document.getElementById('crs1st').value)
    let ca = Number(document.getElementById('crsca').value)
    let x3 = Number(document.getElementById('crsexam').value)
    let grade = document.getElementById('crsG')
    let Remark = document.getElementById('crsRemark')
    let score = crsscore;
    comput(x, x2, ca, x3, score, grade, Remark)
}
//PRATICALL LIFE 
plfscore.onmouseover = function(){
    let x = Number(document.getElementById('plf2nd').value)
    let x2 = Number(document.getElementById('plf1st').value)
    let ca = Number(document.getElementById('plfca').value)
    let x3 = Number(document.getElementById('plfexam').value)
    let grade = document.getElementById('plfG')
    let Remark = document.getElementById('plfRemark')
    let score = plfscore;
    comput(x, x2, ca, x3, score, grade, Remark)
}
//BASIC SCINECE TECHONOLOGY 
bstscore.onmouseover = function(){
    let x = Number(document.getElementById('bst2nd').value)
    let x2 = Number(document.getElementById('bst1st').value)
    let ca = Number(document.getElementById('bstca').value)
    let x3 = Number(document.getElementById('bstexam').value)
    let grade = document.getElementById('bstG')
    let Remark = document.getElementById('bstRemark')
    let score = bstscore;
    comput(x, x2, ca, x3, score, grade, Remark)
}

// PRE VOLCATIONAL STUDY
pvsscore.onmouseover = function(){
    let x = Number(document.getElementById('pvs2nd').value)
    let x2 = Number(document.getElementById('pvs1st').value)
    let ca = Number(document.getElementById('pvsca').value)
    let x3 = Number(document.getElementById('pvsexam').value)
    let grade = document.getElementById('pvsG')
    let Remark = document.getElementById('pvsRemark')
    let score = pvsscore;
    comput(x, x2, ca, x3, score, grade, Remark)
}

//VOLCATIONAL STUDY
vstscore.onmouseover = function(){
    let x = Number(document.getElementById('vst2nd').value)
    let x2 = Number(document.getElementById('vst1st').value)
    let ca = Number(document.getElementById('vstca').value)
    let x3 = Number(document.getElementById('vstexam').value)
    let grade = document.getElementById('vstG')
    let Remark = document.getElementById('vstRemark')
    let score = vstscore;
    comput(x, x2, ca, x3, score, grade, Remark)
}

// VERBAL REASONING
verscore.onmouseover = function(){
    let x = Number(document.getElementById('ver2nd').value)
    let x2 = Number(document.getElementById('ver1st').value)
    let ca = Number(document.getElementById('verca').value)
    let x3 = Number(document.getElementById('verexam').value)
    let grade = document.getElementById('verG')
    let Remark = document.getElementById('verRemark')
    let score = verscore;
    comput(x, x2, ca, x3, score, grade, Remark)
}

// ART
crascore.onmouseover = function(){
    let x3 = Number(document.getElementById('craexam').value)
    let x = Number(document.getElementById('cra2nd').value)
    let ca = Number(document.getElementById('craca').value)
    let x2 = Number(document.getElementById('cra1st').value)
    let grade = document.getElementById('craG')
    let Remark = document.getElementById('craRemark')
    let score = crascore;
    comput(x, x2, ca, x3, score, grade, Remark)
}


// CACULATING THE GRADE POINT
function comput(x, x2, ca, x3, score, grade, Remark){
    if(x > 0 || x2 > 0 || x3 > 0 || ca > 0){  
        score.value = x + x2 + x3 + ca;
    }
    else{
        score.value = ""
    }
    //checking the grade of student 
    let x4 = Number(score.value)
    if(x4 > 79){
        grade.value = "A+"
        Remark.value = "Excellent"
    }
    else if (x4 > 69 && x4 < 80){
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

cal.onclick= function(){
    event.preventDefault();

    // converting name to upper case before uploading 
    let userNameElement = document.getElementById('userName')
    let userName = userNameElement.value.toUpperCase()
    userNameElement.value = userName;
   
   //calculating the total student perfomance
    let course = 0;
    let total = Number(rnvscore.value) + Number(bstscore.value) + Number(plfscore.value) + Number(vstscore.value) + Number(mthscore.value)  + Number(qurscore.value) + Number(pvsscore.value) + Number(verscore.value) + Number(engscore.value) + Number(crascore.value) + Number(vrnscore.value) + Number(crsscore.value);
   
   // calculating the number of score offered 
        if(rnvscore.value != ""){
            course++;
        }
        if(bstscore.value != ""){
            course++;
        }
        if(pvsscore.value != ""){
            course++;
        }
        if(plfscore.value != ""){
            course++;
        }
        
        if(mthscore.value != ""){
            course++;
        }
        if(engscore.value != ""){
            course++;
        }
        if(qurscore.value != ""){
            course++;
        }
        if(vrnscore.value != ""){
            course++;
        }
        if(crsscore.value != ""){
            course++;
        }
        if(verscore.value != ""){
            course++;
        }
        if(vstscore.value != ""){
            course++;
        }
        
        if(crascore.value != ""){
            course++;
        }
        
        
         
    
        
    No_subj.value = course;
    let aver = (total/course).toFixed(2);
    if( aver != 'NaN' ){ 
    average.value = aver
    console.log(aver)
    }
    score_obtainable.value = (course*100)
    score_obtain.value = total;
    let performance = total/course

    if(performance >= 80){
       report.value = "Exellent Performance"
    }
    else if(performance >= 70 && performance < 80 ){
        report.value = "Very Good Perfomance"
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