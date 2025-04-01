window.addEventListener('load',  async ()=>{
    try{
        let res= await fetch('/schoolname');
        let school = await res.json()
        school = school.toUpperCase()
        if(school == 'BLIXX INTERNATIONAL'){
            document.querySelector('.accounting').style.display = 'block'
        }
        else if(school == 'NUEL VILLE ACADEMY'){
            
        }
    }
    catch(err){
        console.log(err)
    }
    
})
