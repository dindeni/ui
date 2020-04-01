import CheckboxSet from './CheckboxSet';

const checkboxHead = document.querySelector('.js-checkbox-set__head');
const checkboxWrapper = document.querySelector('.js-checkbox-set__wrapper_type_expandable');

if (checkboxWrapper) {
  const checkbox = new CheckboxSet({ checkboxHead, checkboxWrapper });
  checkbox.observeCheckbox();
}
