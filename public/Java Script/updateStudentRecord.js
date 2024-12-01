let username = document.getElementById('newName')
let addmissionNo = document.getElementById('addmissionNo')
let dob = document.getElementById('dob')
let classN = document.getElementById('classN')
let male = document.getElementById('male')
let female = document.getElementById('female')
let passport = document.getElementById('passport')
let updateNameForm = document.getElementById('updateNameForm')
let loading = document.querySelector('.cover')


//GETTING STUDENT CURRENT DETAILS 
studentDetails.onclick = async (e)=>{
    e.preventDefault()
     loading.style.display = 'block'
    let studentId = document.getElementById('studentId').value;
    try{
        let data = await fetch(`/studentinfomation?studnetId=${studentId}`)
        let student = await data.json()
        username.value = student.userName
        addmissionNo.value = student.addmissionNo
        dob.value = student.dob
        classN.value = student.class
        if(student.gender == 'MALE'){
            male.checked = true;
        }
        else{
            female.checked = true;
        }
        passport.src = student.passport
    }
    catch(err){
        console.log(err)
    }
    finally {
        // Hide the loading spinner
        loading.style.display = 'none';
    }
}


// Handle form submission for updating student details
updateNameForm.onclick = async (e) => {
    e.preventDefault();
   
    let studentId = document.getElementById('studentId').value;
    let userName = username.value;
    let addmissionNo = document.getElementById('addmissionNo').value
    let dobValue = dob.value;
    let classValue = classN.value;
    let gender = male.checked ? 'MALE' : 'FEMALE';
    //let passportValue = passport.src;

    try {
        const response = await fetch('/update-student', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                studentId, 
                userName, 
                addmissionNo, 
                dob: dobValue, 
                classN: classValue, 
                gender, 
                //passport: passportValue
            })
            
        });

        const result = await response.json();
        if (response.ok) {
            alert('Student updated successfully!');
            console.log('Updated student:', result);
        } else {
            alert(result.message || 'Error updating student.');
        }
        
    } catch (err) {
        console.error(err);
        
        alert('An error occurred.');

    }
   
};
