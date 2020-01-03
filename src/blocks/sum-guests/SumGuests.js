class SumGuests {
  constructor(options) {
    const { classGuests, babiesValue, guestsValue } = options;
    this.classGuests = classGuests;
    this.babiesValue = babiesValue;
    this.guestsValue = guestsValue;
  }

  countGuests() {
    const buttonMinus = this.classGuests.querySelectorAll('.js-sum-guests__button_minus');
    const numberVisitors = this.classGuests.querySelectorAll('.js-sum-guests__number-of-visitors');
    const inputGuests = this.classGuests.querySelector('.js-form-element__field_for-guests');
    const guestsPopup = this.classGuests.querySelector('.js-sum-guests__popup');
    const containerAdult = this.classGuests.querySelector('.js-sum-guests__container_adult');
    const containerChildren = this.classGuests.querySelector('.js-sum-guests__container_children');
    const containerBabies = this.classGuests.querySelector('.js-sum-guests__container_babies');
    const buttonApply = this.classGuests.querySelector('.js-buttons__transparent_apply');
    const buttonClear = this.classGuests.querySelector('.js-buttons__transparent_clear');

    guestsPopup.addEventListener('focusout', SumGuests._handleGuestsPopupFocusout);

    guestsPopup.addEventListener('focusin', SumGuests._handleGuestsPopupFocusIn);

    const handleClassGuestsClick = (event) => {
      const isHidden = event.target === inputGuests && guestsPopup.classList.contains('sum-guests__popup_hide');
      if (isHidden) {
        guestsPopup.classList.remove('sum-guests__popup_hide');

        guestsPopup.focus();
      }

      this._summarizeGuests({
        event,
        containerAdult,
        containerChildren,
        containerBabies,
        inputGuests,
      });
      SumGuests._clearInput({
        event,
        buttonClear,
        inputGuests,
        guestsPopup,
      });
      SumGuests._applyInputValue({
        event, buttonApply, guestsPopup,
      });
      SumGuests._controlButtonMinus({ number: numberVisitors, buttonMinus });
    };
    this.classGuests.addEventListener('click', handleClassGuestsClick);
  }

  _summarizeGuests(options) {
    const {
      event, containerAdult, containerChildren, containerBabies, inputGuests,
    } = options;
    const { parentElement } = event.target.parentElement;
    const searchButtonPlus = parentElement.querySelector(
      '.js-sum-guests__button_plus',
    );
    const searchButtonMinus = parentElement.querySelector(
      '.js-sum-guests__button_minus',
    );
    const searchNumberVisitors = parentElement.querySelector('.js-sum-guests__number-of-visitors');

    /* eslint-disable no-param-reassign */
    const increaseVisitors = () => { this.guestsValue += 1; };
    const decreaseVisitors = () => { this.guestsValue -= 1; };
    const increaseBabies = () => { this.babiesValue += 1; };
    const decreaseBabies = () => { this.babiesValue -= 1; };
    const increaseNumberVisitors = () => {
      searchNumberVisitors
        .textContent = +searchNumberVisitors.textContent + 1;
    };
    const decreaseNumberVisitors = () => {
      searchNumberVisitors
        .textContent = +searchNumberVisitors.textContent - 1;
    };

    const isAdultPlus = parentElement === containerAdult && event.target === searchButtonPlus;
    const isAdultMinus = parentElement === containerAdult
      && event.target === searchButtonMinus && searchNumberVisitors.textContent > 0;
    const isChildrenPlus = parentElement === containerChildren && event.target === searchButtonPlus;
    const isChildrenMinus = parentElement === containerChildren
      && event.target === searchButtonMinus && searchNumberVisitors.textContent > 0;
    const isBabiesPlus = parentElement === containerBabies
      && event.target === searchButtonPlus;
    const isBabiesMinus = parentElement === containerBabies
      && event.target === searchButtonMinus && searchNumberVisitors.textContent > 0;

    if (isAdultPlus) {
      increaseNumberVisitors();
      increaseVisitors();
    } else if (isAdultMinus) {
      decreaseNumberVisitors();
      decreaseVisitors();
    } else if (isChildrenPlus) {
      increaseNumberVisitors();
      increaseVisitors();
    } else if (isChildrenMinus) {
      decreaseNumberVisitors();
      decreaseVisitors();
    } else if (isBabiesPlus) {
      increaseNumberVisitors();
      increaseBabies();
    } else if (isBabiesMinus) {
      decreaseNumberVisitors();
      decreaseBabies();
    }

    this.babiesValue !== 0 ? inputGuests.value = `${this.guestsValue} ${SumGuests._controlGuestsBabiesPrefix({ value: this.guestsValue, type: 'guests' })}, ${this.babiesValue} ${SumGuests._controlGuestsBabiesPrefix({ value: this.babiesValue, type: 'babies' })}`
      : inputGuests.value = `${this.guestsValue} ${SumGuests._controlGuestsBabiesPrefix({ value: this.guestsValue, type: 'guests' })}`;
  }

  static _controlButtonMinus({ number, buttonMinus }) {
    number.forEach((value, index) => {
      const buttonMinusElement = buttonMinus;
      if (+value.textContent === 0) {
        buttonMinusElement[index].style.opacity = '0.38';
      } else buttonMinusElement[index].style.opacity = '1';
    });
  }

  static _controlGuestsBabiesPrefix({ type, value }) {
    const inputValue = Number(value);
    const isValueFrom2To4 = inputValue > 1 && inputValue < 5;
    if (type === 'guests') {
      switch (true) {
        case inputValue === 0:
          return 'гостей';
        case inputValue === 1:
          return 'гость';
        case isValueFrom2To4:
          return 'гостя';
        default: return 'гостей';
      }
    } else if (type === 'babies') {
      switch (true) {
        case inputValue === 1:
          return 'младенец';
        case isValueFrom2To4:
          return 'младенца';
        default: return 'младенцев';
      }
    }
    return undefined;
  }

  static _clearInput(options) {
    const {
      event, buttonClear, inputGuests, guestsPopup,
    } = options;
    const hasValue = +inputGuests.value !== 0 && inputGuests.value !== '' && inputGuests.value !== '0 гостей';
    if (hasValue) {
      buttonClear.classList.remove('buttons__transparent_hide');
    } else {
      buttonClear.classList.add('buttons__transparent_hide');
    }
    if (event.target === buttonClear) {
      inputGuests.value = 0;
      guestsPopup.querySelectorAll('.js-sum-guests__number-of-visitors').forEach((value) => {
        const valueOfSpanElement = value;
        valueOfSpanElement.textContent = '0';
      });
    }
  }

  static _applyInputValue(options) {
    const { event, buttonApply, guestsPopup } = options;
    if (event.target === buttonApply) {
      event.preventDefault();
      guestsPopup.classList.add('sum-guests__popup_hide');
    }
  }

  static _handleGuestsPopupFocusout(event) {
    event.currentTarget.style.zIndex = 1;
    event.currentTarget.classList.add('sum-guests__popup_hide');
  }

  static _handleGuestsPopupFocusIn(event) {
    event.currentTarget.style.zIndex = 100;
    event.currentTarget.classList.remove('sum-guests__popup_hide');
  }
}

export default SumGuests;
