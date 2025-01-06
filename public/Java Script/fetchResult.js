studentId =document.getElementById('studentId')
term = document.getElementById('Sterm')
Sclass = document.getElementById('Sclass')
let getDetails = document.getElementById('getDetails')

getDetails.onclick = async (e)=>{
    e.preventDefault()
    let studentIdNum = studentId.value;
    let schoolTerm = term.value;
    let studentclass = Sclass.value;
    console.log(`${studentIdNum}, ${schoolTerm}, ${studentclass}`)
   if(studentIdNum !="" && schoolTerm !='' && studentclass != ''){
    try{
        const result = await fetch(`/student-result?studentId=${studentIdNum}&&term=${schoolTerm}&&sClass=${studentclass}`)
        const datas = await result.json()
        if(result != ''){
            console.log(datas)
        }
        else{
           
        }
    }
    catch(err){
        alert(`No data found for ID ${studentIdNum}`)
    }
   }
   else{
    alert('student Id, Class and Term most be filled')
   }
}