import Checkbox from './Checkbox';

const checkboxHead = document.querySelector('.js-checkbox__head');
const checkboxWrapper = document.querySelector('.js-checkbox__wrapper');

if (checkboxWrapper) {
  const checkbox = new Checkbox({ checkboxHead, checkboxWrapper });
  checkbox.observeCheckbox();
}
