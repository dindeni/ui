const navigations = document.querySelectorAll('.navigation');

const handlerButtonClick = (evt, navigation) => {
  const button = navigation.querySelector('.navigation__button-mobile');
  const navigationList = navigation.querySelector('.navigation__list');
  const isButtonClose = evt.target === button
      && !button.classList.contains('navigation__button-mobile_open');
  const isButtonOpen = evt.target === button
      && button.classList.contains('navigation__button-mobile_open');
  if (isButtonClose) {
    navigationList.style.display = 'block';
    button.classList.add('navigation__button-mobile_open');
  } else if (isButtonOpen) {
    navigationList.style.display = 'none';
    button.classList.remove('navigation__button-mobile_open');
  }
};

Array.from(navigations).map((navigation) => navigation.addEventListener('click', (evt) => handlerButtonClick(evt, navigation)));
