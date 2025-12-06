window.addEventListener('load',  async ()=>{
    try{
        let res= await fetch('/schoolname');
        let school = await res.json()
        school = school.toUpperCase()
        if(school == 'BLIXX INTERNATIONAL'){
            document.querySelector('#agr').value = 'Agriculture'
            document.querySelector('#bsc').value = 'Basic Science'
            document.querySelector('#cra').value = 'Literature'
            document.querySelector('#csc').value = 'Computer Science'
            document.querySelector('#btc').value = 'PHE'
            document.querySelector('#ped').value = 'Home Economics'
            document.querySelector('#fre').value = 'Basic Technology'
            document.querySelector('#crs').value = 'Social Studies'
           
        }
        else if(school == 'NUEL VILLE ACADEMY'){
           
            
        }
    }
    catch(err){
        console.log(err)
    }
    
})
