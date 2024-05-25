
let Sclass= document.getElementById('Sclass')
let Sterm = document.getElementById('Sterm')
let respond = document.getElementById('respond')


let upload = document.getElementById('uplaod')
function check(){
    if(Sclass.value=="" || Sterm.value==""){
        respond.innerText= "Student class or Term can not be empty"
	    let audio = document.createElement('audio');
	    audio.src = "../sound.wav" 
	    audio.type = "audio/wav"
        audio.play()
       // userName.value = userName.value.toUppercase();
        return false
    }
    else{
        upload.innerText= "file for uploaded successfuly"
        console.log('it works')
       // userName.value = userName.value.toUppercase();
        return true;
        
    }
}


