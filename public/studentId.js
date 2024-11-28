let aphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
let number = '1234567890'
let studentId = document.getElementById('studentId')
let GenerateId = document.getElementById('GenerateId')
function generateId(event){
    event.preventDefault()
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
    
    checkId(random)
}

 
//CHECKING IF THE ID EXIST IN DATABASE 
async function checkId(random){
    try{
        let result = await fetch(`/studentinfomation?studnetId=${random}`);
        let studentID = await result.json();
        if(studentID){
            generateId() 
        }
        else{
            studentId.value = random
        }
    }
    catch(err){
        console.log(err)
    }
}