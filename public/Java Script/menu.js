let menu = document.querySelector('.menu')
let navigation = document.querySelector('.navigation')
let cancel = document.querySelector('.cancel')

menu.onclick = ()=>{
    navigation.style.display = 'flex'
    navigation.classList.add('navigation-mobile')
    cancel.style.display = 'flex'
    menu.style.display = 'none'
}

cancel.onclick = ()=>{
    menu.style.display = 'block'  
    navigation.style.display = 'none'
}