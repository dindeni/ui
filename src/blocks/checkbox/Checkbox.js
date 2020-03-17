class Checkbox {
  constructor(options) {
    const { checkboxHead, checkboxWrapper } = options;
    this.checkboxHead = checkboxHead;
    this.checkboxWrapper = checkboxWrapper;
  }

  observeCheckbox() {
    this.checkboxHead.addEventListener('click', (event) => Checkbox.handleCheckboxHeadClick(
      { event, checkboxHead: this.checkboxHead, checkboxWrapper: this.checkboxWrapper },
    ));
  }

  static handleCheckboxHeadClick(options) {
    const { event, checkboxHead, checkboxWrapper } = options;

    const isNotHide = event.target === checkboxHead && !checkboxWrapper.classList.contains('checkbox__wrapper_hidden');
    const isHide = event.target === checkboxHead && checkboxWrapper.classList.contains('checkbox__wrapper_hidden');
    if (isNotHide) {
      checkboxWrapper.classList.add('checkbox__wrapper_hidden');
      checkboxHead.classList.remove('checkbox__head_turned');
    } else if (isHide) {
      checkboxWrapper.classList.remove('checkbox__wrapper_hidden');
      checkboxHead.classList.add('checkbox__head_turned');
    }
  }
}

export default Checkbox;
