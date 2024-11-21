window.addEventListener('load',  async ()=>{
    try{
        let res= await fetch('/schoolname');
        let school = await res.json()
        school = school.toUpperCase()
        if(school == 'BLIXX INTERNATIONAL'){
            console.log(school)
        }
        else if(school == 'NUEL VILLE ACADEMY'){
            document.querySelector('#pvd').value = 'Vocation Studies'
            document.querySelector('#bst').value = 'Basic Science'
            document.querySelector('#spe').value = 'Social Studies'
            document.querySelector('#red').value = 'Home Economics'
            document.querySelector('#hst').value = 'PHE'
            document.querySelector('#vst').value = 'Agricultural Science'
            document.querySelector('#hwr').value = 'Reading'
            
        }
    }
    catch(err){
        console.log(err)
    }
    
})
