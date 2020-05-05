import autoBind from 'auto-bind';

class CheckboxSet {
  constructor(checkboxSetElement) {
    this.checkboxSetElement = checkboxSetElement;
    this.checkboxHead = this.checkboxSetElement.querySelector('.js-checkbox-set__head');
    this.checkboxWrapper = this.checkboxSetElement.querySelector('.js-checkbox-set__wrapper_type_expandable');
    autoBind(this);
  }

  observeCheckbox() {
    this.checkboxHead.addEventListener('click', this._handleCheckboxHeadClick);
  }

  _handleCheckboxHeadClick() {
    if (this.checkboxWrapper.classList.contains('checkbox-set__wrapper_hidden')) {
      this.checkboxWrapper.classList.remove('checkbox-set__wrapper_hidden');
      this.checkboxHead.classList.add('checkbox-set__head_turned');
    } else {
      this.checkboxWrapper.classList.add('checkbox-set__wrapper_hidden');
      this.checkboxHead.classList.remove('checkbox-set__head_turned');
    }
  }
}

export default CheckboxSet;
