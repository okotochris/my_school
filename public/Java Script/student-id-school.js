let getId = document.getElementById('getId');
let table = document.getElementById('table')
let loadingIndicator = document.getElementById('loadingIndicator');


getId.onclick = async (e) => {
    e.preventDefault();
    let student_name = document.getElementById('student_name').value;
    let Sclass = document.getElementById('Sclass').value;
    let section = document.getElementById('section').value;

    loadingIndicator.style.display = 'block';
   
    try {
        let response = await fetch(`http://localhost:3000/getstudentid?student_name=${encodeURIComponent(student_name)}`);
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
            td2.innerText = data.addmissionNo.toUpperCase()
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
