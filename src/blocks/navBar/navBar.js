const navButtonMobile = document.querySelector('.nav-standart__button-mobile');
const navUl = document.querySelector('.nav-standart__list');

navButtonMobile.addEventListener('click', (evt)=>{
    if (evt.target === navButtonMobile &&
        !navButtonMobile.classList.contains('nav-standart__button-mobile--open')){
        navUl.style.display = 'block';
       navButtonMobile.classList.add('nav-standart__button-mobile--open')
    }else if (evt.target === navButtonMobile &&
        navButtonMobile.classList.contains('nav-standart__button-mobile--open')){

        navUl.style.display = 'none';
        navButtonMobile.classList.remove('nav-standart__button-mobile--open')
    }
});

