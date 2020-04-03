import autoBind from 'auto-bind';

class SumGuests {
  constructor(options) {
    const { classGuests, babiesValue, guestsValue } = options;
    this.classGuests = classGuests;
    this.babiesValue = babiesValue;
    this.guestsValue = guestsValue;
    autoBind(this);
  }

  countGuests() {
    this.buttonMinus = this.classGuests.querySelectorAll('.js-sum-guests__button_type_minus');
    this.numberVisitors = this.classGuests.querySelectorAll('.js-sum-guests__number-of-visitors');
    this.inputGuests = this.classGuests.querySelector('.js-form-element__field_for-guests');
    this.guestsPopup = this.classGuests.querySelector('.js-sum-guests__popup');
    this.containerAdult = this.classGuests.querySelector('.js-sum-guests__container_adult');
    this.containerChildren = this.classGuests.querySelector('.js-sum-guests__container_children');
    this.containerBabies = this.classGuests.querySelector('.js-sum-guests__container_babies');
    this.buttonApply = this.classGuests.querySelector('.js-ui-control_apply');
    this.buttonClear = this.classGuests.querySelector('.js-ui-control_clear');

    this.guestsPopup.addEventListener('focusout', SumGuests._handleGuestsPopupFocusout);

    this.guestsPopup.addEventListener('focusin', SumGuests._handleGuestsPopupFocusIn);

    const handleClassGuestsClick = (event) => {
      const isHidden = event.target === this.inputGuests && this.guestsPopup.classList.contains('sum-guests__popup_hidden');
      if (isHidden) {
        this.guestsPopup.classList.remove('sum-guests__popup_hidden');

        this.guestsPopup.focus();
      }

      this._summarizeGuests(event);

      this._clearInput(event);
      this._applyInputValue(event);
      this._controlButtonMinus(this.numberVisitors);
    };
    this.classGuests.addEventListener('click', handleClassGuestsClick);
  }

  _summarizeGuests(event) {
    const { parentElement } = event.target.parentElement;
    const searchButtonPlus = parentElement.querySelector(
      '.js-sum-guests__button_type_plus',
    );
    const searchButtonMinus = parentElement.querySelector(
      '.js-sum-guests__button_type_minus',
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

    const isAdultPlus = parentElement === this.containerAdult && event.target === searchButtonPlus;
    const isAdultMinus = parentElement === this.containerAdult
      && event.target === searchButtonMinus && searchNumberVisitors.textContent > 0;
    const isChildrenPlus = parentElement === this.containerChildren
      && event.target === searchButtonPlus;
    const isChildrenMinus = parentElement === this.containerChildren
      && event.target === searchButtonMinus && searchNumberVisitors.textContent > 0;
    const isBabiesPlus = parentElement === this.containerBabies
      && event.target === searchButtonPlus;
    const isBabiesMinus = parentElement === this.containerBabies
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

    this.babiesValue !== 0 ? this.inputGuests.value = `${this.guestsValue} ${SumGuests._controlGuestsBabiesPrefix({ value: this.guestsValue, type: 'guests' })}, ${this.babiesValue} ${SumGuests._controlGuestsBabiesPrefix({ value: this.babiesValue, type: 'babies' })}`
      : this.inputGuests.value = `${this.guestsValue} ${SumGuests._controlGuestsBabiesPrefix({ value: this.guestsValue, type: 'guests' })}`;
  }

  _controlButtonMinus(number) {
    number.forEach((value, index) => {
      if (+value.textContent === 0) {
        this.buttonMinus[index].classList.remove('sum-guests__button_type_non-nullified');
        this.buttonMinus[index].classList.add('sum-guests__button_type_nullified');
      } else {
        this.buttonMinus[index].classList.remove('sum-guests__button_type_nullified');
        this.buttonMinus[index].classList.add('sum-guests__button_type_non-nullified');
      }
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

  _clearInput(event) {
    const hasValue = +this.inputGuests.value !== 0 && this.inputGuests.value !== '' && this.inputGuests.value !== '0 гостей';
    if (hasValue) {
      this.buttonClear.classList.remove('ui-control_hidden');
    } else {
      this.buttonClear.classList.add('ui-control_hidden');
    }
    if (event.target === this.buttonClear) {
      this.inputGuests.value = 0;
      this.guestsPopup.querySelectorAll('.js-sum-guests__number-of-visitors').forEach((value) => {
        const valueOfSpanElement = value;
        valueOfSpanElement.textContent = '0';
      });
    }
  }

  _applyInputValue(event) {
    if (event.target === this.buttonApply) {
      event.preventDefault();
      this.guestsPopup.classList.add('sum-guests__popup_hidden');
    }
  }

  static _handleGuestsPopupFocusout(event) {
    event.currentTarget.classList.remove('sum-guests__popup_focused');
    event.currentTarget.classList.add('sum-guests__popup_unfocused');
    event.currentTarget.classList.add('sum-guests__popup_hidden');
  }

  static _handleGuestsPopupFocusIn(event) {
    event.currentTarget.classList.remove('sum-guests__popup_unfocused');
    event.currentTarget.classList.add('sum-guests__popup_focused');
    event.currentTarget.classList.remove('sum-guests__popup_hidden');
  }
}

export default SumGuests;
