import CheckboxSet from './CheckboxSet';

const checkboxSetElements = document.querySelectorAll('.js-checkbox-set');

[...checkboxSetElements].forEach((element) => {
  const checkbox = new CheckboxSet(element);
  checkbox.observeCheckbox();
});
