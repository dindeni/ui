class CheckboxSet {
  constructor(options) {
    const { checkboxHead, checkboxWrapper } = options;
    this.checkboxHead = checkboxHead;
    this.checkboxWrapper = checkboxWrapper;
  }

  observeCheckbox() {
    this.checkboxHead.addEventListener('click', (event) => CheckboxSet.handleCheckboxHeadClick(
      { event, checkboxHead: this.checkboxHead, checkboxWrapper: this.checkboxWrapper },
    ));
  }

  static handleCheckboxHeadClick(options) {
    const { event, checkboxHead, checkboxWrapper } = options;

    const isNotHide = event.target === checkboxHead && !checkboxWrapper.classList.contains('checkbox-set__wrapper_hidden');
    const isHide = event.target === checkboxHead && checkboxWrapper.classList.contains('checkbox-set__wrapper_hidden');
    if (isNotHide) {
      checkboxWrapper.classList.add('checkbox-set__wrapper_hidden');
      checkboxHead.classList.remove('checkbox-set__head_turned');
    } else if (isHide) {
      checkboxWrapper.classList.remove('checkbox-set__wrapper_hidden');
      checkboxHead.classList.add('checkbox-set__head_turned');
    }
  }
}

export default CheckboxSet;
