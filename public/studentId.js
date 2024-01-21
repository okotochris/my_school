let aphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
let number = '1234567890'
let studentId = document.getElementById('studentId')
let GenerateId = document.getElementById('GenerateId')
GenerateId.onclick = function(){
    event.preventDefault();
    let random = '';
        for(let i = 1; i<=3; i++){
            random += aphabet[Math.floor(Math.random() * aphabet.length)]
        }
        for(let i = 1; i<=4; i++){
            random += number[Math.floor(Math.random() * number.length)]
        }
        for(let i = 1; i<=3; i++){
            random += aphabet[Math.floor(Math.random() * aphabet.length)]
        }
    studentId.value = random
    studentId.select()
    document.execCommand('copy')
}