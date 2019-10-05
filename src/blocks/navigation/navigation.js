const navButtonMobile = document.querySelector('.navigation__button-mobile');
const navUl = document.querySelector('.navigation__list');

const handlerButtonClick = (evt) => {
  const isButtonClose = evt.target === navButtonMobile
      && !navButtonMobile.classList.contains('navigation__button-mobile_open');
  const isButtonOpen = evt.target === navButtonMobile
      && navButtonMobile.classList.contains('navigation__button-mobile_open');
  if (isButtonClose) {
    navUl.style.display = 'block';
    navButtonMobile.classList.add('navigation__button-mobile_open');
  } else if (isButtonOpen) {
    navUl.style.display = 'none';
    navButtonMobile.classList.remove('navigation__button-mobile_open');
  }
};

navButtonMobile.addEventListener('click', handlerButtonClick);
