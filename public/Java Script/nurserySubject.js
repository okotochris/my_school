window.addEventListener('load',  async ()=>{
    try{
        let res= await fetch('/schoolname');
        let school = await res.json()
        school = school.toUpperCase()
        if(school == 'BLIXX INTERNATIONAL'){
            console.log(school)
        }
        else if(school == 'NUEL VILLE ACADEMY'){
            document.querySelector('#mth').value = 'Number Work'
            document.querySelector('#eng').value = 'Letter Work'
            document.querySelector('#pvs').value = 'Social Habit'
            document.querySelector('#plf').value = 'Health Habit'
            document.querySelector('#vst').value = 'Writing'
            document.querySelector('#qur').value = 'Poems'
            document.querySelector('#ver').value = 'Phonics'
            document.querySelector('#bst').value = 'Basic Science'
            document.querySelector('#rnv').value = 'Quantitative Reasoning'
             document.querySelector('#vrn').value = 'CRS'
            document.querySelector('.extra').style.display='block';
        }
    }
    catch(err){
        console.log(err)
    }
    
})
