const checkboxHead = document.querySelector('.js-checkbox__head');
const checkboxWrapper = document.querySelector('.js-checkbox__wrapper');

const handlerCheckboxClick = (evt) => {
  const isNotHide = evt.target === checkboxHead && !checkboxWrapper.classList.contains('checkbox__wrapper_hide');
  const isHide = evt.target === checkboxHead && checkboxWrapper.classList.contains('checkbox__wrapper_hide');
  if (isNotHide) {
    checkboxWrapper.classList.add('checkbox__wrapper_hide');
    checkboxHead.style.setProperty('--rotate', 'rotate(0deg)');
  } else if (isHide) {
    checkboxWrapper.classList.remove('checkbox__wrapper_hide');
    checkboxHead.style.setProperty('--rotate', 'rotate(180deg)');
  }
};

if (checkboxHead) {
  checkboxHead.addEventListener('click', handlerCheckboxClick);
}
