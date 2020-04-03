import autoBind from 'auto-bind';

class CheckboxSet {
  constructor(options) {
    const { checkboxHead, checkboxWrapper } = options;
    this.checkboxHead = checkboxHead;
    this.checkboxWrapper = checkboxWrapper;
    autoBind(this);
  }

  observeCheckbox() {
    this.checkboxHead.addEventListener('click', this._handleCheckboxHeadClick);
  }

  _handleCheckboxHeadClick(event) {
    const isNotHide = event.target === this.checkboxHead && !this.checkboxWrapper.classList.contains('checkbox-set__wrapper_hidden');
    const isHide = event.target === this.checkboxHead && this.checkboxWrapper.classList.contains('checkbox-set__wrapper_hidden');
    if (isNotHide) {
      this.checkboxWrapper.classList.add('checkbox-set__wrapper_hidden');
      this.checkboxHead.classList.remove('checkbox-set__head_turned');
    } else if (isHide) {
      this.checkboxWrapper.classList.remove('checkbox-set__wrapper_hidden');
      this.checkboxHead.classList.add('checkbox-set__head_turned');
    }
  }
}

export default CheckboxSet;
