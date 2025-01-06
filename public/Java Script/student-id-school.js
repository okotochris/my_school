let getId = document.getElementById('getId');
let table = document.getElementById('table')
let loadingIndicator = document.querySelector('.loading');
let Sclass = document.getElementById('Sclass')
let section = document.getElementById('section')


// CLEAR TABLE
function clearTable(){
    table.replaceChildren()
    table.innerHTML = `<tr>
                            <th width="400px">NAME</th>
                            <th width="100px">CLASS</th>
                            <th width="250px">ID</th>
                        </tr>`
}

// GETTING STUDENT ID BASE ON NAME 
getId.onclick = async (e) => {
    clearTable()
    e.preventDefault();    
    let student_name = document.getElementById('student_name').value;
    if(student_name == ''){
       alert('Field can not be empty');
        return false;
    }
    loadingIndicator.style.display = 'block';
    try {
        let response = await fetch(`/getstudentid?student_name=${student_name}`);
            let datas = await response.json();

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
      
        
    } catch (err) {
        console.error('Fetch error:', err);
       alert('student not registered ')
      
    }
};

// GETING STUDENT ID BASE ON CLASS
let classId = document.getElementById('classId')
    classId.onclick = async (e)=>{
        e.preventDefault()
        clearTable()
        loadingIndicator.style.display = 'block';

        let studnetClass = document.getElementById('class').value;
        try{
            let response = await fetch(`/getclassid?class=${studnetClass}`)
                let datas = await response.json();
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
        catch(err){
            console.log(err)
        }
} 

//GETTING STUDENT ID BASE ON SENIOR JUNIOR OR BASIC
let studentSection =document.getElementById('studentSection')
studentSection.onclick = async (e)=>{
    e.preventDefault()
    clearTable()
    loadingIndicator.style.display = 'block';
   try{
        let Sclass = document.getElementById('Sclass').value;
        let response = await fetch(`/getsectionid?class=${Sclass}`)
            let datas = await response.json();
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

