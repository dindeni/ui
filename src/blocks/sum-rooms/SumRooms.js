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

    this.roomsInput.value = '0 спальни, 0 кровати...';

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

    this.roomsInput.value = `${this.bedRoomsNumber.textContent} спальни, ${this.bedsNumber.textContent} кровати...`;
  }
}

export default SumRooms;
