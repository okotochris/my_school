studentId =document.getElementById('studentId')
let schoolName = document.getElementById('schoolName')
let schoolAdd = document.getElementById('schoolAdd')

const student = async (e) => {
    event.preventDefault();
    let userName= document.getElementById('userName').value;
    try {
        const userInfo = await fetch(`/userInfo?userName=${userName}`);
        const userData = await userInfo.json();

//asigning value from database to corresponding input field 
    if(userData.length != 0){
       studentId.value = userData.studentId
       schoolName.value = userData.schoolName.toUpperCase()
       schoolAdd.value = userData.schoolAdd.toUpperCase()
        }
        else if(userData == 'undefined'){
            studentId.value = `no ID found for ${userName}`
        }
    } catch (err) {
        console.error(`${err} Unable to retrieve data`);
    }
}
