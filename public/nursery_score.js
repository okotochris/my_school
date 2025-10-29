// Instant calculation for each subject on input change
function calculateSubject(prefix) {
    const getValue = (id) => Number(document.getElementById(prefix + id).value) || 0;
    
    const test1 = getValue('1st');
    const test2 = getValue('2nd');
    const ca = getValue('ca');
    const exam = getValue('exam');
    
    const scoreElement = document.getElementById(prefix + 'score');
    const gradeElement = document.getElementById(prefix + 'G');
    const remarkElement = document.getElementById(prefix + 'Remark');
    
    const total = test1 + test2 + ca + exam;
    scoreElement.value = total > 0 ? total : '';
    
    const score = Number(scoreElement.value);
    if (score > 79) {
        gradeElement.value = "A+";
        remarkElement.value = "Excellent";
    } else if (score > 69 && score < 80) {
        gradeElement.value = "A";
        remarkElement.value = "Very Good";
    } else if (score > 59 && score < 70) {
        gradeElement.value = "B";
        remarkElement.value = "Credit";
    } else if (score > 49 && score < 60) {
        gradeElement.value = "C";
        remarkElement.value = "Merit";
    } else if (score > 39 && score < 50) {
        gradeElement.value = "D";
        remarkElement.value = "Pass";
    } else if (score > 0 && score < 40) {
        gradeElement.value = "F";
        remarkElement.value = "Fail";
    } else {
        gradeElement.value = "";
        remarkElement.value = "";
    }
}

// Compute overall scores on button click
let average = document.getElementById('average');
let No_subj = document.getElementById('No_subj');
let score_obtainable = document.getElementById('score_obtainable');
let score_obtain = document.getElementById('score_obtain');
let report = document.getElementById('Treport');
let term = document.getElementById('Sterm');
let sclass = document.getElementById('Sclass');

document.getElementById('Calc').onclick = function(event) {
    event.preventDefault();

    // Convert name to uppercase
    let userNameElement = document.getElementById('userName');
    let userName = userNameElement.value.toUpperCase();
    userNameElement.value = userName;

    // Calculate total from all scores (empty = 0)
    let total = Number(document.getElementById('rnvscore').value) +
                Number(document.getElementById('bstscore').value) +
                Number(document.getElementById('plfscore').value) +
                Number(document.getElementById('vstscore').value) +
                Number(document.getElementById('mthscore').value) +
                Number(document.getElementById('qurscore').value) +
                Number(document.getElementById('pvsscore').value) +
                Number(document.getElementById('verscore').value) +
                Number(document.getElementById('engscore').value) +
                Number(document.getElementById('crascore').value) +
                Number(document.getElementById('vrnscore').value) +
                Number(document.getElementById('crsscore').value);

    // Count non-empty scores
    let course = 0;
    const scores = ['rnvscore', 'bstscore', 'pvsscore', 'plfscore', 'mthscore', 'engscore', 'qurscore', 'vrnscore', 'crsscore', 'verscore', 'vstscore', 'crascore'];
    scores.forEach(id => {
        if (document.getElementById(id).value !== '') {
            course++;
        }
    });

    No_subj.value = course;
    let aver = course > 0 ? (total / course).toFixed(2) : 0;
    average.value = aver !== 'NaN' ? aver : '';
    score_obtainable.value = course * 100;
    score_obtain.value = total;

    let performance = course > 0 ? total / course : 0;
    if (performance >= 80) {
        report.value = "Excellent Performance";
    } else if (performance >= 70 && performance < 80) {
        report.value = "Very Good Performance";
    } else if (performance >= 50 && performance < 70) {
        report.value = "Good Performance";
    } else {
        report.value = "Poor Performance. Try Harder Next Term";
    }

    // Promotion logic (adjusted for nursery; customize as needed)
    if (term.value === 'THIRD TERM' && sclass.value === 'NURSERY 3' && performance >= 50) {
        report.value += " Promoted to BASIC 1";
    } else if (term.value === 'THIRD TERM' && sclass.value === 'NURSERY 2' && performance >= 50) {
        report.value += " Promoted to NURSERY 3";
    } else if (term.value === 'THIRD TERM' && sclass.value === 'NURSERY 1' && performance >= 50) {
        report.value += " Promoted to NURSERY 2";
    }
};