let studentClass = document.getElementById('promotedto');

studentClass.onchange = async ()=>{
    let studentId = document.getElementById('studentId').value;
    let student = {
        studentId:studentId,
        studentClass: studentClass.value
    }
   try{
   let res = await fetch(`/updatestudentclass`, {
        method: 'PATCH',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
    })
    console.log(res)
   }
  
   catch(err){
    console.log(err)
   }
}

