class SumRooms {
  constructor(wrapper) {
    this.wrapper = wrapper;
  }

  summarizeRooms() {
    const roomsInput = this.wrapper.querySelector('.js-form-element__field_for-rooms');
    const roomsPopup = this.wrapper.querySelector('.js-sum-rooms__popup');
    const bedRoomsNumber = this.wrapper.querySelector('.js-sum-rooms__number-of-visitors_bedroom');
    const bedsNumber = this.wrapper.querySelector('.js-sum-rooms__number-of-visitors_beds');

    roomsInput.value = '0 спальни, 0 кровати...';

    roomsPopup.addEventListener('focusout', () => SumRooms._handleRoomsPopupFocusout(roomsPopup));
    roomsPopup.addEventListener('focusin', () => SumRooms._handleRoomsPopupFocusin(roomsPopup));

    document.addEventListener('click', (event) => SumRooms._handleDocumentClick({
      event, roomsInput, roomsPopup,
    }));

    roomsPopup.addEventListener('click', (event) => SumRooms._handleRoomsPopupClick({
      event, roomsInput, bedRoomsNumber, bedsNumber,
    }));
  }

  static _handleRoomsPopupFocusout(element) {
    const roomsPopup = element;
    roomsPopup.style.zIndex = 1;
    roomsPopup.classList.add('sum-rooms__popup_hide');
  }

  static _handleRoomsPopupFocusin(element) {
    const roomsPopup = element;
    roomsPopup.style.zIndex = 100;
    roomsPopup.classList.remove('sum-rooms__popup_hide');
  }

  static _handleDocumentClick(options) {
    const { event, roomsPopup, roomsInput } = options;
    if (event.target === roomsInput && roomsPopup.classList.contains('sum-rooms__popup_hide')) {
      roomsPopup.classList.remove('sum-rooms__popup_hide');
      roomsPopup.focus();
    } else if (event.target === roomsInput && !roomsPopup.classList.contains('sum-rooms__popup_hide')) {
      roomsPopup.classList.add('sum-rooms__popup_hide');
    }
  }

  static _handleRoomsPopupClick(options) {
    const {
      event, roomsInput, bedsNumber, bedRoomsNumber,
    } = options;

    const { parentElement } = event.target;
    const searchButtonPlus = parentElement.querySelector('.js-sum-rooms__button_plus');
    const number = parentElement.querySelector('.js-sum-rooms__number-of-visitors');
    if (event.target === searchButtonPlus) {
      number.textContent = +number.textContent + 1;
    } else if (number.textContent > 0) {
      number.textContent = +number.textContent - 1;
    }

    roomsInput.value = `${bedRoomsNumber.textContent} спальни, `
      + `${bedsNumber.textContent} кровати...`;
  }
}

export default SumRooms;
