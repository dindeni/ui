const navButtonMobile = document.querySelector('.nav-standart__button-mobile');
const navUl = document.querySelector('.nav-standart__list');

const handlerButtonClick = (evt) => {
  const isButtonClose = evt.target === navButtonMobile
      && !navButtonMobile.classList.contains('nav-standart__button-mobile_open');
  const isButtonOpen = evt.target === navButtonMobile
      && navButtonMobile.classList.contains('nav-standart__button-mobile_open');
  if (isButtonClose) {
    navUl.style.display = 'block';
    navButtonMobile.classList.add('nav-standart__button-mobile_open');
  } else if (isButtonOpen) {
    navUl.style.display = 'none';
    navButtonMobile.classList.remove('nav-standart__button-mobile_open');
  }
};

navButtonMobile.addEventListener('click', handlerButtonClick);
