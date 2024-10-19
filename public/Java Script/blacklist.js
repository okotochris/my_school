let inputforname = document.getElementById('studentID')
let getStudent = document.getElementById('getStudent')
let loading = document.querySelector('.cover')


//GETTING STUDENT ID AND NAME IN BLACKLIST
getStudent.onclick = async function getInfo(e){
    e.preventDefault()
     let studentName = inputforname.value;

     //preventing fetch API from execute when the input field is empty
     if(studentName == ''){
          alert('Enter Student Name')
         return false;
     }
     else{
          loading.style.display = 'block'
          try{
               let promise = await fetch (`/getstudentid?student_name=${studentName}`);
               let data = await promise.json()
              if(data.length == 0){
                    alert('Student not found')
                    return false;
              }
              docDisplay(data)
               
          }
          catch(err){
          console.log(err)
          }
          finally{
               loading.style.display = 'none';
          }
     }
}

let infoDisplay = document.querySelector('.blacklist')
let div = document.getElementById('studentName')
function docDisplay(data){
     div.replaceChildren()
     infoDisplay.style.display = 'flex'

   for(let i = 0; i<= data.length; i++){
     let p = document.createElement('p')
     let idNo = document.createElement('p')
     idNo.innerHTML = data[i].studentId
     p.innerText = data[i].userName.toUpperCase()
     let button = document.createElement('button')
     button.innerText = 'Add'
     let container = document.createElement('div')
     container.setAttribute('class', 'dialogboxDisplay')
     container.appendChild(p)
     container.appendChild(idNo)
     container.appendChild(button)
     div.appendChild(container)
     let currentData = data[i]
     button.onclick = function(){
         addToBlackList(currentData)
     }
   }
    
}


//Addining Names to blacklist database
async function addToBlackList(data){
     console.log(data.userName)

     try{
          const promise = await fetch('/blacklist?data', 
               {
                    method: 'POST', 
                    headers: {
                         'Content-Type': 'application/json' // Ensure it's JSON
                     },
                    body: JSON.stringify(data)

               })

         if(promise.ok){
          alert(`${data.userName} has been added`)
          cancel1()
         }
     }
     catch(err){
          console.log(err)
     }
     finally{
          console.log('finish')
     }
} 

//canceling student display window

const cancel1 = ()=>{
     infoDisplay.style.display = 'none'
}