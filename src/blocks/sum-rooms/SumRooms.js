import autoBind from 'auto-bind';

class SumRooms {
  constructor(wrapper) {
    this.wrapper = wrapper;
    autoBind(this);
  }

  summarizeRooms() {
    this.roomsInput = this.wrapper.querySelector('.js-form-element__field');
    this.roomsPopup = this.wrapper.querySelector('.js-sum-rooms__popup');
    this.bedRoomsNumber = this.wrapper.querySelector('.js-sum-rooms__number-of-visitors_bedroom');
    this.bedsNumber = this.wrapper.querySelector('.js-sum-rooms__number-of-visitors_beds');
    this.bathRoomNumber = this.wrapper.querySelector('.js-sum-rooms__number-of-visitors_bathroom');

    this.roomsPopup.addEventListener('focusout', this._handleRoomsPopupFocusout);
    this.roomsPopup.addEventListener('focusin', this._handleRoomsPopupFocusin);

    document.addEventListener('click', this._handleDocumentClick);

    this.roomsPopup.addEventListener('click', this._handleRoomsPopupClick);
  }

  _handleRoomsPopupFocusout() {
    this.roomsPopup.classList.remove('sum-rooms__popup_focused');
    this.roomsPopup.classList.add('sum-rooms__popup_unfocused');
    this.roomsPopup.classList.add('sum-rooms__popup_hidden');
  }

  _handleRoomsPopupFocusin() {
    this.roomsPopup.classList.remove('sum-rooms__popup_unfocused');
    this.roomsPopup.classList.add('sum-rooms__popup_focused');
    this.roomsPopup.classList.remove('sum-rooms__popup_hidden');
  }

  _handleDocumentClick(event) {
    const isInputHidden = event.target === this.roomsInput
      && this.roomsPopup.classList.contains('sum-rooms__popup_hidden');
    const isNotInputHidden = event.target === this.roomsInput
      && !this.roomsPopup.classList.contains('sum-rooms__popup_hidden');
    if (isInputHidden) {
      this.roomsPopup.classList.remove('sum-rooms__popup_hidden');
      this.roomsPopup.focus();
    } else if (isNotInputHidden) {
      this.roomsPopup.classList.add('sum-rooms__popup_hidden');
    }
  }

  _handleRoomsPopupClick(event) {
    const { parentElement } = event.target;
    const searchButtonPlus = parentElement.querySelector('.js-sum-rooms__button_type_plus');
    const number = parentElement.querySelector('.js-sum-rooms__number-of-visitors');
    if (event.target === searchButtonPlus) {
      number.textContent = parseInt(number.textContent, 10) + 1;
    } else if (number.textContent > 0) {
      number.textContent = parseInt(number.textContent, 10) - 1;
    }

    this._setInputValue();
  }

  _setInputValue() {
    const values = [this.bedRoomsNumber.textContent, this.bedsNumber.textContent,
      this.bathRoomNumber.textContent];
    const keys = ['bedroom', 'bed', 'bathRoom'];

    this.roomsInput.value = '';
    values.forEach((value, index) => {
      if (parseInt(value, 10) !== 0) {
        this.roomsInput.value = this.roomsInput.value === ''
          ? `${value} ${SumRooms._getPrefix(keys[index], value)}`
          : `${this.roomsInput.value}, ${value} ${SumRooms._getPrefix(keys[index], value)}`;
      }
    });
  }

  static _getPrefix(type, value) {
    const lastDigit = Number(value.toString().slice(-1));
    const numberOfValue = Number(value);
    const bedroom = ['спален', 'спальня', 'спальни'];
    const bed = ['кроватей', 'кровать', 'кровати'];
    const bathRoom = ['ванных комнат', 'ванная комната', 'ванные комнаты'];

    const getIndex = () => {
      switch (true) {
        case (numberOfValue === 0) || (numberOfValue > 10 && numberOfValue < 21):
          return 0;
        case lastDigit === 1:
          return 1;
        case lastDigit > 1 && lastDigit < 5:
          return 2;
        default: return 0;
      }
    };
    switch (type) {
      case 'bedroom': return bedroom[getIndex()];
      case 'bed': return bed[getIndex()];
      default: return bathRoom[getIndex()];
    }
  }
}

export default SumRooms;
