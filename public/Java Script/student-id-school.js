let getId = document.getElementById('getId');
let table = document.getElementById('table')
let loadingIndicator = document.getElementById('loadingIndicator');
let Sclass = document.getElementById('Sclass')
let section = document.getElementById('section')
// GETTING STUDENT ID BASE ON NAME 
getId.onclick = async (e) => {
    e.preventDefault();
    let student_name = document.getElementById('student_name').value;
    loadingIndicator.style.display = 'block';
   
    try {
        console.log(student_name)
        let response = await fetch(`/getstudentid?student_name=${student_name}`);
        if (!response.ok) {
            let div = document.createElement('div')
            let container = document.querySelector('.table')
            div.innerHTML = `ID has not been set for ${student_name}`
            container.appendChild(div)
            loadingIndicator.style.display = 'none';
            

        }
        else{
            let datas = await response.json();
            console.log(datas);
            datas.forEach(data=>{
                 
            let tr = document.createElement('tr')
            let td1 = document.createElement('td')
            let td2 = document.createElement('td')
            let td3 = document.createElement('td')
            td1.innerText = data.userName.toUpperCase()
            td2.innerText = data.class.toUpperCase()
            td3.innerText = data.studentId.toUpperCase()
            tr.appendChild(td1)
            tr.appendChild(td2)
            tr.appendChild(td3)
            table.appendChild(tr)
            })
           
            loadingIndicator.style.display = 'none';
            table.style.display = 'block'
        }
        
    } catch (err) {
        console.error('Fetch error:', err);
        let div = document.createElement('div')
      
    }
};

// GETING STUDENT ID BASE ON CLASS
let classId = document.getElementById('classId')
    classId.onclick = async (e)=>{
        e.preventDefault()
        loadingIndicator.style.display = 'block';

        let studnetClass = document.getElementById('class').value;
        try{
           console.log(studnetClass)
            let response = await fetch(`https://www.myschoolresult.com/getclassid?class=${studnetClass}`)
            if (!response.ok) {
                let div = document.createElement('div')
                let container = document.querySelector('.table')
                div.innerHTML = `ID has not been set for ${studnetClass}`
                container.appendChild(div)
                loadingIndicator.style.display = 'none';    
            }
            else{
                let datas = await response.json();
                console.log(datas);
                datas.forEach(data=>{
                     
                let tr = document.createElement('tr')
                let td1 = document.createElement('td')
                let td2 = document.createElement('td')
                let td3 = document.createElement('td')
                td1.innerText = data.userName.toUpperCase()
                td2.innerText = data.class.toUpperCase()
                td3.innerText = data.studentId.toUpperCase()
                tr.appendChild(td1)
                tr.appendChild(td2)
                tr.appendChild(td3)
                table.appendChild(tr)
                })
               
                loadingIndicator.style.display = 'none';
                table.style.display = 'block'
            }
            console.log(response)
        }
        catch(err){
            console.log(err)
        }
} 

//GETTING STUDENT ID BASE ON SENIOR JUNIOR OR BASIC
let studentSection =document.getElementById('studentSection')
studentSection.onclick = async (e)=>{
    e.preventDefault()
    loadingIndicator.style.display = 'block';
   try{
        let Sclass = document.getElementById('Sclass').value;
        console.log(Sclass)
        let response = await fetch(`https://www.myschoolresult.com/getsectionid?class=${Sclass}`)
        if (!response.ok) {
            let div = document.createElement('div')
            let container = document.querySelector('.table')
            div.innerHTML = `ID has not been set for ${Sclass}`
            container.appendChild(div)
            loadingIndicator.style.display = 'none';    
        }
        else{
            let datas = await response.json();
            console.log(datas);
            datas.forEach(data=>{
                 
            let tr = document.createElement('tr')
            let td1 = document.createElement('td')
            let td2 = document.createElement('td')
            let td3 = document.createElement('td')
            td1.innerText = data.userName.toUpperCase()
            td2.innerText = data.class.toUpperCase()
            td3.innerText = data.studentId.toUpperCase()
            tr.appendChild(td1)
            tr.appendChild(td2)
            tr.appendChild(td3)
            table.appendChild(tr)
            })
           
            loadingIndicator.style.display = 'none';
            table.style.display = 'block'
        }
       
   }
   catch(err){
    console.log(err)
   }
}


//SELECTING STUDENT ID BASE ON CATEGORIES 
let studentName = document.querySelector('.student-name')
let studentClass = document.querySelector('.student-class')
let division = document.querySelector('.division')
let studentClassForm = document.getElementById('student-class')
let studentNameForm = document.getElementById('student-name')
let studentDivisionForm = document.getElementById('student-division')

studentName.onclick=()=>{
    studentNameForm.style.display = 'block'
    studentClassForm.style.display = 'none'
    studentDivisionForm.style.display = 'none'
}
studentClass.onclick=()=>{
    studentNameForm.style.display = 'none'
    studentClassForm.style.display = 'block'
    studentDivisionForm.style.display = 'none'
}
division.onclick=()=>{
    studentNameForm.style.display = 'none'
    studentClassForm.style.display = 'none'
    studentDivisionForm.style.display = 'block'
}

// UPDATING STUDENT NAME
