const menu= document.querySelector('.menu');
const left_nav= document.querySelector('.left-nav');

let x= 1;

menu.onclick= ()=>{
     if(x==1){
    left_nav.style.display= 'block';
    x=2;
    }
    else{
        left_nav.style.display= 'none';   
        x=1; 
    }
    
}
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
        return false
    }
    else{
        upload.innerText= "file for uploaded successfuly"
        console.log('it works')
        return true;
        
    }
}
