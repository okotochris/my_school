window.addEventListener('load',  async ()=>{

    try{
        let res= await fetch('/schoolname');
        let school = await res.json()
        school = school.toUpperCase()
        console.log(school)
        if(school == 'BLIXX INTERNATIONAL'){
            console.log(school)
        }
        else if(school == 'NUEL VILLE ACADEMY'){  
            document.querySelector('#spe').value = 'Social Studies'
            document.querySelector('#red').value = 'Home Economics'
            document.querySelector('#hst').value = 'PHE'
            document.querySelector('#vst').value = 'Agricultural Science'
            document.querySelector('#hwr').value = 'Computer Education'
            document.querySelector('#pvs').value = 'Civic Education'
            document.querySelector('#pre').value = 'History'
            
        }
    }
    catch(err){
        console.log(err)
    }
    
})
