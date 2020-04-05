import autoBind from 'auto-bind';

class SumGuests {
  constructor(classGuests) {
    this.classGuests = classGuests;
    autoBind(this);
  }

  countGuests() {
    this.buttonMinus = this.classGuests.querySelectorAll('.js-sum-guests__button_type_minus');
    this.numberVisitors = this.classGuests.querySelectorAll('.js-sum-guests__number-of-visitors');
    this.inputGuests = this.classGuests.querySelector('.js-form-element__field_for-guests');
    this.guestsPopup = this.classGuests.querySelector('.js-sum-guests__popup');
    this.buttonApply = this.classGuests.querySelector('.js-ui-control_apply');
    this.buttonClear = this.classGuests.querySelector('.js-ui-control_clear');

    this.guestsPopup.addEventListener('focusout', SumGuests._handleGuestsPopupFocusout);

    this.guestsPopup.addEventListener('focusin', SumGuests._handleGuestsPopupFocusIn);

    this.classGuests.addEventListener('click', this._handleClassGuestsClick);
  }

  _handleClassGuestsClick(event) {
    const isHidden = event.target === this.inputGuests && this.guestsPopup.classList.contains('sum-guests__popup_hidden');
    if (isHidden) {
      this.guestsPopup.classList.remove('sum-guests__popup_hidden');
      this.guestsPopup.focus();
    }

    if (event.target.classList.contains('js-sum-guests__button_type_minus')) {
      SumGuests._setNumberOfVisitors({ event, type: 'decrease' });
    }

    if (event.target.classList.contains('js-sum-guests__button_type_plus')) {
      SumGuests._setNumberOfVisitors({ event, type: 'increase' });
    }

    this._setInputValue();
    this._clearInput(event);
    this._applyInputValue(event);
    this._controlButtonMinus();
  }

  _setInputValue() {
    let guestsValue = 0;
    let babiesValue = 0;

    Array.from(this.numberVisitors).map(((value) => {
      const isAdultOrChildren = value.classList.contains('js-sum-guests__number-of-visitors_type_adult')
        || value.classList.contains('js-sum-guests__number-of-visitors_type_children');
      if (isAdultOrChildren) {
        guestsValue += parseInt(value.textContent, 10);
      } else babiesValue += parseInt(value.textContent, 10);
      return undefined;
    }));

    const guestsPrefix = SumGuests._controlGuestsBabiesPrefix({ value: guestsValue, type: 'guests' });
    const babiesPrefix = SumGuests._controlGuestsBabiesPrefix({ value: guestsValue, type: 'babies' });

    this.inputGuests.value = babiesValue !== 0 ? `${guestsValue} ${guestsPrefix} ${babiesValue} ${babiesPrefix}`
      : `${guestsValue} ${guestsPrefix}`;
  }

  _controlButtonMinus() {
    this.numberVisitors.forEach((value, index) => {
      if (+value.textContent === 0) {
        this.buttonMinus[index].classList.remove('sum-guests__button_type_non-nullified');
        this.buttonMinus[index].classList.add('sum-guests__button_type_nullified');
      } else {
        this.buttonMinus[index].classList.remove('sum-guests__button_type_nullified');
        this.buttonMinus[index].classList.add('sum-guests__button_type_non-nullified');
      }
    });
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

  static _setNumberOfVisitors(options) {
    const { event, type } = options;

    const numberOfVisitors = event.target.parentElement.querySelector('.js-sum-guests__number-of-visitors');
    const numberOfVisitorsValue = parseInt(numberOfVisitors.textContent, 10);

    if (numberOfVisitorsValue > 0 && type === 'decrease') {
      numberOfVisitors.textContent = numberOfVisitorsValue - 1;
    }

    if (type === 'increase') {
      numberOfVisitors.textContent = numberOfVisitorsValue + 1;
    }
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
