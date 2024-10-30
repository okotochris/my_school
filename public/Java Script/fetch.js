 studentId =document.getElementById('studentId')
let schoolName = document.getElementById('schoolName')
let schoolAdd = document.getElementById('schoolAdd')

//fetching student info from database 
const student = async (e) => {
    event.preventDefault();
    let userName= document.getElementById('userName').value;
    if(userName == ''){
        alert('Enter student name')
        return false;
    }
    try {
        const userInfo = await fetch(`/getstudentid?student_name=${userName}`);
        const userData = await userInfo.json();

//asigning value from database to corresponding input field 
    if(userData){
        if(userData.message){
            studentId.value = userData.message;
            alert(`${userName} is not registered`)
        }
        else if(userData.length == 0){
            alert(`${userName} is not registered`)
        }
        else{
            studentId.value = userData[0].studentId
            schoolName.value = userData[0].schoolName.toUpperCase()
        }
    }
           
    } catch (err) {
        console.error(`${err} Unable to retrieve data`);
    }
}

