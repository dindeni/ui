import autoBind from 'auto-bind';

class SumSearchItems {
  constructor(wrapper, itemsData) {
    this.wrapper = wrapper;
    this.itemsData = itemsData;
    autoBind(this);
  }

  summarize(initialValues) {
    this.inputElement = this.wrapper.querySelector('.js-form-element__field');
    this.popupElement = this.wrapper.querySelector('.js-sum-search-items__popup');
    this.sumElementsCollection = this.wrapper.querySelectorAll('.js-sum-search-items__sum');
    this.buttonApply = this.wrapper.querySelector('.js-ui-control_apply');
    this.buttonClear = this.wrapper.querySelector('.js-ui-control_clear');
    this.buttonMinus = this.wrapper.querySelectorAll('.js-sum-search-items__button_type_minus');

    if (initialValues) {
      this._setInitialInputValues(initialValues);
    }

    this.popupElement.addEventListener('focusout', this._handlePopupElementFocusout);
    this.popupElement.addEventListener('focusin', this._handlePopupElementFocusin);

    document.addEventListener('click', this._handleDocumentClick);

    this.popupElement.addEventListener('click', this._handlePopupElementClick);
    this._changeButtonMinusStyle();
  }

  _handlePopupElementFocusout() {
    this.popupElement.classList.remove('sum-search-items__popup_focused');
    this.popupElement.classList.add('sum-search-items__popup_unfocused');
    this.popupElement.classList.add('sum-search-items__popup_hidden');
  }

  _handlePopupElementFocusin() {
    this.popupElement.classList.remove('sum-search-items__popup_unfocused');
    this.popupElement.classList.add('sum-search-items__popup_focused');
    this.popupElement.classList.remove('sum-search-items__popup_hidden');
  }

  _handleDocumentClick(event) {
    const isInputHidden = event.target === this.inputElement
      && this.popupElement.classList.contains('sum-search-items__popup_hidden');
    const isNotInputHidden = event.target === this.inputElement
      && !this.popupElement.classList.contains('sum-search-items__popup_hidden');
    if (isInputHidden) {
      this.popupElement.classList.remove('sum-search-items__popup_hidden');
      this.popupElement.focus();
    } else if (isNotInputHidden) {
      this.popupElement.classList.add('sum-search-items__popup_hidden');
    }
  }

  _handlePopupElementClick(event) {
    const { parentElement } = event.target;
    const sumElement = parentElement.querySelector('.js-sum-search-items__sum');
    if (parentElement.classList.contains('js-sum-search-items__wrapper')) {
      SumSearchItems._setSumElementValue(event, sumElement);
    }
    this._setInputValue();
    this._changeButtonMinusStyle();
    if (this.buttonApply) {
      this._applyInputValue(event);
      this._clearInput(event);
    }
  }

  static _setSumElementValue(event, element) {
    const { parentElement } = event.target;
    const buttonPlus = parentElement.querySelector('.js-sum-search-items__button_type_plus');
    const buttonMinus = parentElement.querySelector('.js-sum-search-items__button_type_minus');
    const sum = parseInt(element.textContent, 10);
    const sumElement = element;
    if (event.target === buttonPlus) {
      sumElement.textContent = sum + 1;
    }
    const isButtonMinusAndAboveZero = event.target === buttonMinus && sum > 0;
    if (isButtonMinusAndAboveZero) {
      sumElement.textContent = sum - 1;
    }
  }

  _summarizeMergedValue(summedItems) {
    const values = Array.from(this.sumElementsCollection).map((
      value,
    ) => parseInt(value.textContent, 10));
    return values.reduce((accumulator, value, index) => {
      if (summedItems.some((item) => item - 1 === index)) {
        return accumulator + value;
      } return accumulator;
    }, 0);
  }

  _setInputValue(initialValues) {
    this.inputElement.value = '';
    const values = initialValues || this.itemsData;
    values.forEach((value) => {
      const sum = this._summarizeMergedValue(value.summableItems);
      if (sum !== 0) {
        this.inputElement.value = this.inputElement.value === ''
          ? `${sum} ${SumSearchItems._getPrefix(sum, value.dictionary)}`
          : `${this.inputElement.value}, ${sum} ${SumSearchItems._getPrefix(sum, value.dictionary)}`;
      }
    });
  }

  _setInitialInputValues(values) {
    this.sumElementsCollection.forEach((value, index) => {
      const sumElement = value;
      sumElement.textContent = values[index];
    });
    this._setInputValue();
  }

  _applyInputValue(event) {
    if (event.target === this.buttonApply) {
      event.preventDefault();
      this.popupElement.classList.add('sum-search-items__popup_hidden');
    }
  }

  _clearInput(event) {
    const hasValue = parseInt(this.inputElement.value, 10) !== 0
      && this.inputElement.value !== ''
      && this.inputElement.value !== '0 гостей';

    if (hasValue) {
      this.buttonClear.classList.remove('ui-control_hidden');
    } else {
      this.buttonClear.classList.add('ui-control_hidden');
    }

    if (event.target === this.buttonClear) {
      this.inputElement.value = 0;
      this.sumElementsCollection.forEach((value) => {
        const valueOfSpanElement = value;
        valueOfSpanElement.textContent = '0';
      });
    }
  }

  _changeButtonMinusStyle() {
    this.sumElementsCollection.forEach((value, index) => {
      if (parseInt(value.textContent, 10) === 0) {
        this.buttonMinus[index].classList.remove('sum-guests__button_type_non-nullified');
        this.buttonMinus[index].classList.add('sum-guests__button_type_nullified');
      } else {
        this.buttonMinus[index].classList.remove('sum-guests__button_type_nullified');
        this.buttonMinus[index].classList.add('sum-guests__button_type_non-nullified');
      }
    });
  }

  static _getPrefix(value, dictionary) {
    const lastDigit = Number(value.toString().slice(-1));

    const getWordIndex = () => {
      switch (true) {
        case (value === 0) || (value > 10 && value < 21):
          return 0;
        case lastDigit === 1:
          return 1;
        case lastDigit > 1 && lastDigit < 5:
          return 2;
        default: return 0;
      }
    };
    return dictionary[getWordIndex()];
  }
}

export default SumSearchItems;
