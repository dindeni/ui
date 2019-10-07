if (document.querySelector('.sum-rooms')) {
  const rooms = document.querySelector('.sum-rooms');
  const roomsInput = rooms.querySelector('.js-form-element__field_for-rooms');
  const roomsPopup = rooms.querySelector('.sum-rooms__popup');
  const bedRoomsNumber = rooms.querySelector('.sum-rooms__number-of-visitors_bedroom');
  const bedsNumber = rooms.querySelector('.sum-rooms__number-of-visitors_beds');

  roomsInput.value = '0 спальни, 0 кровати...';

  const handlerDocumentClick = (evt) => {
    if (evt.target === roomsInput && roomsPopup.classList.contains('sum-rooms__popup_hide')) {
      roomsPopup.classList.remove('sum-rooms__popup_hide');
    } else if (evt.target === roomsInput && !roomsPopup.classList.contains('sum-rooms__popup_hide')) {
      roomsPopup.classList.add('sum-rooms__popup_hide');
    }
  };
  document.addEventListener('click', handlerDocumentClick);

  const handlerRoomsClick = (evt) => {
    const { parentElement } = evt.target;
    const searchButtonPlus = parentElement.querySelector('.sum-rooms__button_plus');
    const number = parentElement.querySelector('.sum-rooms__number-of-visitors');
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
