import FormElement from './FormElement';

const labelElements = document.querySelectorAll('.js-form-element_type_masked');

[...labelElements].forEach((labelElement) => {
  const formElement = new FormElement(labelElement);
  formElement.init();
});
