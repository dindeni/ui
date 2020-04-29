import FormElement from './FormElement';

const labelElement = document.querySelector('.js-form-element_type_masked');

if (labelElement) {
  const formElement = new FormElement(labelElement);
  formElement.init();
}
