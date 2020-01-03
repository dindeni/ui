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

    const isNotHide = event.target === checkboxHead && !checkboxWrapper.classList.contains('checkbox__wrapper_hide');
    const isHide = event.target === checkboxHead && checkboxWrapper.classList.contains('checkbox__wrapper_hide');
    if (isNotHide) {
      checkboxWrapper.classList.add('checkbox__wrapper_hide');
      checkboxHead.style.setProperty('--rotate', 'rotate(0deg)');
    } else if (isHide) {
      checkboxWrapper.classList.remove('checkbox__wrapper_hide');
      checkboxHead.style.setProperty('--rotate', 'rotate(180deg)');
    }
  }
}

export default Checkbox;
