import autoBind from 'auto-bind';

class CheckboxSet {
  constructor(checkboxSetElement) {
    this.checkboxSetElement = checkboxSetElement;
    this.checkboxHead = this.checkboxSetElement.querySelector('.js-checkbox-set__head');
    this.checkboxWrapper = this.checkboxSetElement.querySelector('.js-checkbox-set__wrapper_type_expandable');
    this.inputElement = this.checkboxSetElement.querySelector('.js-checkbox-set__toggle');
    autoBind(this);
  }

  observeCheckbox() {
    this.checkboxHead.addEventListener('click', this._handleCheckboxHeadClick);
  }

  _handleCheckboxHeadClick() {
    this.inputElement.checked
      ? this.checkboxWrapper.classList.remove('checkbox-set__wrapper_hidden')
      : this.checkboxWrapper.classList.add('checkbox-set__wrapper_hidden');
  }
}

export default CheckboxSet;
