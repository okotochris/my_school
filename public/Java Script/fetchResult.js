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
          
                const data = await result.json()
                studentResultTemplate(data)          
        }
        catch(err){
            console.log(err)
            alert('No result found')
        }
   }
   else{
    alert('student Id, Class and Term most be filled')
   }
}

function studentResultTemplate(data){
//English
document.getElementById('eng').value = data.eng 
document.getElementById('eng1st').value = data.eng1st
document.getElementById('eng2nd').value = data.eng2nd
document.getElementById('engca').value = data.engca
document.getElementById('engexam').value = data.engexam 
//mathes 
document.getElementById('mth').value = data.mth 
document.getElementById('mth1st').value = data.mth1st
document.getElementById('mth2nd').value = data.mth2nd
document.getElementById('mthca').value = data.mthca
document.getElementById('mthexam').value = data.mthexam 
//CRS
document.getElementById('rnv').value = data.rnv 
document.getElementById('rnv1st').value = data.rnv1st
document.getElementById('rnv2nd').value = data.rnv2nd
document.getElementById('rnvca').value = data.rnvca
document.getElementById('rnvexam').value = data.rnvexam 
//Basic science
document.getElementById('bst').value = data.bst 
document.getElementById('bst1st').value = data.bst1st
document.getElementById('bst2nd').value = data.bst2nd
document.getElementById('bstca').value = data.bstca
document.getElementById('bstexam').value = data.bstexam
//Edo language
document.getElementById('pvs').value = data.pvs 
document.getElementById('pvs1st').value = data.pvs1st
document.getElementById('pvs2nd').value = data.pvs2nd
document.getElementById('pvsca').value = data.pvsca
document.getElementById('pvsexam').value = data.pvsexam
//quantitative reasoning 
document.getElementById('qur').value = data.qur 
document.getElementById('qur1st').value = data.qur1st
document.getElementById('qur2nd').value = data.qur2nd
document.getElementById('qurca').value = data.qurca
document.getElementById('qurexam').value = data.qurexam
//virber atitude
document.getElementById('ver').value = data.ver 
document.getElementById('ver1st').value = data.ver1st
document.getElementById('ver2nd').value = data.ver2nd
document.getElementById('verca').value = data.verca
document.getElementById('verexam').value = data.verexam
//Numerical Aptitude
document.getElementById('vst').value = data.vst 
document.getElementById('vst1st').value = data.vst1st
document.getElementById('vst2nd').value = data.vst2nd
document.getElementById('vstca').value = data.vstca
document.getElementById('vstexam').value = data.vstexam
//culture creative art
document.getElementById('cra').value = data.cra 
document.getElementById('cra1st').value = data.cra1st
document.getElementById('cra2nd').value = data.cra2nd
document.getElementById('craca').value = data.craca
document.getElementById('craexam').value = data.craexam
//natianl value
document.getElementById('spe').value = data.spe 
document.getElementById('spe1st').value = data.spe1st
document.getElementById('spe2nd').value = data.spe2nd
document.getElementById('speca').value = data.speca
document.getElementById('speexam').value = data.speexam
//hand writing 
document.getElementById('hwr').value = data.hwr 
document.getElementById('hwr1st').value = data.hwr1st
document.getElementById('hwr2nd').value = data.hwr2nd
document.getElementById('hwrca').value = data.hwrca
document.getElementById('hwrexam').value = data.hwrexam
//history
document.getElementById('hst').value = data.hst 
document.getElementById('hst1st').value = data.hst1st
document.getElementById('hst2nd').value = data.hst2nd
document.getElementById('hstca').value = data.hstca
document.getElementById('hstexam').value = data.hstexam
//prevocational study
document.getElementById('pvd').value = data.pvd 
document.getElementById('pvd1st').value = data.pvd1st
document.getElementById('pvd2nd').value = data.pvd2nd
document.getElementById('pvdca').value = data.pvdca
document.getElementById('pvdexam').value = data.pvdexam
//phonics
document.getElementById('mus').value = data.mus 
document.getElementById('mus1st').value = data.mus1st
document.getElementById('mus2nd').value = data.mus2nd
document.getElementById('musca').value = data.musca
document.getElementById('musexam').value = data.musexam
//phonics
document.getElementById('mus').value = data.mus 
document.getElementById('mus1st').value = data.mus1st
document.getElementById('mus2nd').value = data.mus2nd
document.getElementById('musca').value = data.musca
document.getElementById('musexam').value = data.musexam
//french
document.getElementById('red').value = data.red 
document.getElementById('red1st').value = data.red1st
document.getElementById('red2nd').value = data.red2nd
document.getElementById('redca').value = data.redca
document.getElementById('redexam').value = data.redexam

//other infomation 
document.getElementById('userName').value = data.userName
document.getElementById('section').value = data.section
document.getElementById('absent').value = data.absent
document.getElementById('present').value = data.present
document.getElementById('tReport').value = data.tReport
document.getElementById('promotedto').value = data.promote
document.getElementById('fees').value = data.fees
document.getElementById('nextterm').value = data.nextterm


}