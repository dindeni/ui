if (document.querySelector('.js-sum-rooms')) {
  const rooms = document.querySelector('.js-sum-rooms');
  const roomsInput = rooms.querySelector('.js-form-element__field_for-rooms');
  const roomsPopup = rooms.querySelector('.js-sum-rooms__popup');
  const bedRoomsNumber = rooms.querySelector('.js-sum-rooms__number-of-visitors_bedroom');
  const bedsNumber = rooms.querySelector('.js-sum-rooms__number-of-visitors_beds');

  roomsInput.value = '0 спальни, 0 кровати...';

  const changeZIndex = (type) => {
    if (type === 'out') {
      roomsPopup.style.zIndex = 1;
    }
    if (type === 'in') {
      roomsPopup.style.zIndex = 100;
    }
  };
  roomsPopup.addEventListener('focusout', () => changeZIndex('out'));

  roomsPopup.addEventListener('focusin', () => changeZIndex('in'));

  const handlerDocumentClick = (evt) => {
    if (evt.target === roomsInput && roomsPopup.classList.contains('sum-rooms__popup_hide')) {
      roomsPopup.classList.remove('sum-rooms__popup_hide');
      roomsPopup.focus();
    } else if (evt.target === roomsInput && !roomsPopup.classList.contains('sum-rooms__popup_hide')) {
      roomsPopup.classList.add('sum-rooms__popup_hide');
    }
  };
  document.addEventListener('click', handlerDocumentClick);

  const handlerRoomsClick = (evt) => {
    const { parentElement } = evt.target;
    const searchButtonPlus = parentElement.querySelector('.js-sum-rooms__button_plus');
    const number = parentElement.querySelector('.js-sum-rooms__number-of-visitors');
    if (evt.target === searchButtonPlus) {
      number.textContent = +number.textContent + 1;
    } else if (number.textContent > 0) {
      number.textContent = +number.textContent - 1;
    }

    roomsInput.value = `${bedRoomsNumber.textContent} спальни, `
+ `${bedsNumber.textContent} кровати...`;
  };

  roomsPopup.addEventListener('click', handlerRoomsClick);
}
