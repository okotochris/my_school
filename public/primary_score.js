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
let spescore = document.getElementById('spescore')
let hwrscore = document.getElementById('hwrscore')
let musscore = document.getElementById('musscore')
let redscore = document.getElementById('redscore')
let userNam = document.getElementById('userName')
let cal = document.getElementById('Calc')
let report = document.getElementById('Treport')
let term = document.getElementById('Sterm')


//ENGLISH
engscore.onmouseover = function(){
    let x = Number(document.getElementById('eng2nd').value)
    let x2 = Number(document.getElementById('eng1st').value)
    let x3 = Number(document.getElementById('engexam').value)
    let grade = document.getElementById('engG')
    let score = engscore;
    comput(x, x2, x3, score, grade)
}
//creative are
rnvscore.onmouseover = function(){
    let x = Number(document.getElementById('rnv2nd').value)
    let x2 = Number(document.getElementById('rnv1st').value)
    let x3 = Number(document.getElementById('rnvexam').value)
    let grade = document.getElementById('rnvG')
    let score = rnvscore;
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

//QUALITATIVE REASONING 
qurscore.onmouseover = function(){
    let x = Number(document.getElementById('qur2nd').value)
    let x2 = Number(document.getElementById('qur1st').value)
    let x3 = Number(document.getElementById('qurexam').value)
    let grade = document.getElementById('qurG')
    let score = qurscore;
    comput(x, x2, x3, score, grade)
}

//BASIC SCINECE TECHONOLOGY 
bstscore.onmouseover = function(){
    let x = Number(document.getElementById('bst2nd').value)
    let x2 = Number(document.getElementById('bst1st').value)
    let x3 = Number(document.getElementById('bstexam').value)
    let grade = document.getElementById('bstG')
    let score = bstscore;
    comput(x, x2, x3, score, grade)
}

// PRE VOLCATIONAL STUDY
pvsscore.onmouseover = function(){
    let x = Number(document.getElementById('pvs2nd').value)
    let x2 = Number(document.getElementById('pvs1st').value)
    let x3 = Number(document.getElementById('pvsexam').value)
    let grade = document.getElementById('pvsG')
    let score = pvsscore;
    comput(x, x2, x3, score, grade)
}

//VOLCATIONAL STUDY
vstscore.onmouseover = function(){
    let x = Number(document.getElementById('vst2nd').value)
    let x2 = Number(document.getElementById('vst1st').value)
    let x3 = Number(document.getElementById('vstexam').value)
    let grade = document.getElementById('vstG')
    let score = vstscore;
    comput(x, x2, x3, score, grade)
}

// VERBAL REASONING
verscore.onmouseover = function(){
    let x = Number(document.getElementById('ver2nd').value)
    let x2 = Number(document.getElementById('ver1st').value)
    let x3 = Number(document.getElementById('verexam').value)
    let grade = document.getElementById('verG')
    let score = verscore;
    comput(x, x2, x3, score, grade)
}

// ART
crascore.onmouseover = function(){
    let x3 = Number(document.getElementById('craexam').value)
    let x = Number(document.getElementById('cra2nd').value)
    let x2 = Number(document.getElementById('cra1st').value)
    let grade = document.getElementById('craG')
    let score = crascore;
    comput(x, x2, x3, score, grade)
}

// SPELLING 
spescore.onmouseover = function(){
    let x = Number(document.getElementById('spe2nd').value)
    let x3 = Number(document.getElementById('speexam').value)
    let x2 = Number(document.getElementById('spe1st').value)
    let grade = document.getElementById('speG')
    let score = spescore;
    comput(x, x2, x3, score, grade)
}

// HAND WRITTING
hwrscore.onmouseover = function(){
    let x = Number(document.getElementById('hwr2nd').value)
    let x2 = Number(document.getElementById('hwr1st').value)
    let x3 = Number(document.getElementById('hwrexam').value)
    let grade = document.getElementById('hwrG')
    let score = hwrscore;
    comput(x, x2, x3, score, grade)
}
// MUSIC
musscore.onmouseover = function(){
    let x = Number(document.getElementById('mus2nd').value)
    let x2 = Number(document.getElementById('mus1st').value)
    let x3 = Number(document.getElementById('musexam').value)
    let grade = document.getElementById('musG')
    let score = musscore;
    comput(x, x2, x3, score, grade)
}

// CULTURE AND CREATIVE ACT 
redscore.onmouseover = function(){
    let x = Number(document.getElementById('red2nd').value)
    let x2 = Number(document.getElementById('red1st').value)
    let x3 = Number(document.getElementById('redexam').value)
    let grade = document.getElementById('redG')
    let score = redscore;
    comput(x, x2, x3, score, grade)
}
// 


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
    event.preventDefault();

    // converting name to upper case before uploading 
    let userNameElement = document.getElementById('userName')
    let userName = userNameElement.value.toUpperCase()
    userNameElement.value = userName;
   
   //calculating the total number of score
    let total = Number(rnvscore.value)   + Number(bstscore.value) + Number(vstscore.value) + Number(mthscore.value)  + Number(qurscore.value) + Number(pvsscore.value) + Number(verscore.value) + Number(engscore.value) + Number(crascore.value) + Number(hwrscore.value) + Number(spescore.value) + Number(musscore.value)  + Number(redscore.value);
   
   // calculating the number of score offered 
    let course = 0;
        if(rnvscore.value != ""){
            course++;
        }
        if(bstscore.value != ""){
            course++;
        }
        if(pvsscore.value != ""){
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
        if(verscore.value != ""){
            course++;
        }
        if(vstscore.value != ""){
            course++;
        }
        
        if(crascore.value != ""){
            course++;
        }
        
        if(spescore.value != ""){
            course++;
        }
        if(hwrscore.value != ""){
            course++;
        }
             
        if(musscore.value != ""){
            course++;
        }
        if(redscore.value != ""){
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