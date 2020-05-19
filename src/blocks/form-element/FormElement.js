import InputMask from 'inputmask';

class FormElement {
  constructor(labelElement) {
    this.inputElement = labelElement.firstChild;
  }

  init() {
    this.inputElement.addEventListener('focusin', this._handleInputElementFocusin);
    InputMask({
      alias: 'datetime',
      inputFormat: 'dd.mm.yyyy',
      showMaskOnHover: false,
      showMaskOnFocus: false,
      placeholder: 'ДД.ММ.ГГГГ',
    }).mask(this.inputElement);
  }
}

export default FormElement;
