
     let menu = document.getElementById('menu')
     let droup_down = document.querySelector('.droup_down_manu')
     
        
      //DROPDOOWN MANU
        droup_down.style.display = 'none'
        menu.onclick =()=>{
            if( droup_down.style.display == 'none'){
                droup_down.style.display='flex';
                let offDisplay = document.querySelectorAll('.link')
                offDisplay.forEach(link=>{
                    link.onclick = ()=>{
                        droup_down.style.display = 'none'
                    }

                })
               
            } 
            else{
                droup_down.style.display = 'none'
               
            }
     }

     
    //NEWS IMAGE FULL SCREEN VIEW 
    let newsImage = document.querySelectorAll('.news_content img')
    newsImage.forEach(image =>{
        image.onclick = ()=>{
            let div = document.createElement('div')
            div.classList.add('fullscreen');
            div.style.backgroundImage = `url(${image.src})`;
            document.body.appendChild(div)

            //closing fullscreen
            div.onclick = ()=>{
                document.body.removeChild(div)
            }
        }
    })
  
//GALLARY FULL DDISPLAY
document.querySelector('.galary').onclick= ()=>{
    console.log('hello world')
        document.querySelector('.gallaryDisplay').style.display = 'flex'
   }
// CLSING GALARY 
   document.querySelector('.cancelGallary').onclick = ()=>{
        document.querySelector('.gallaryDisplay').style.display = 'none'
   }
//Galary Full Screen View 
let imageGalary = document.querySelectorAll('.section2 img')
imageGalary.forEach(image=>{
    image.onclick =()=>{
        let div = document.createElement('div')
        div.classList.add('fullscreen');
        div.style.backgroundImage = `url(${image.src})`;
        document.body.appendChild(div)
       

        //closing full screen;
        div.onclick = ()=>{
            document.body.removeChild(div)
        }
    }
    
})
     let uploadform = document.querySelector('.uploadform')
     let upload = document.querySelector('.upload')
     
//posting new update form OPEN
     upload.onclick=()=>{
       
            uploadform.style.display = "block"
            document.querySelector('.fullscreens').style.display = "block"
            document.getElementById('uploadTitle').focus()
            document.body.style.overflow = 'hidden'
        }
//uploading form close
       document.querySelector('.cancel').onclick= ()=>{
            uploadform.style.display = "none"
            document.querySelector('.fullscreens').style.display = "none"
            document.body.style.overflow = '';
            document.getElementById('uploadTitle').value=""
       }

//IMAGE UPLOAD PREVIEW
document.getElementById('imageUpload').onchange = (event)=>{
    let image = URL.createObjectURL(event.target.files[0]);
    let img = document.createElement('img')
    img.src = image;
    img.height = 100;
    img.width = 100;
    document.querySelector('.preview').appendChild(img)
}
    

