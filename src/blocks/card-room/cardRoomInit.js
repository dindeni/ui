import CardRoom from './CardRoom';

[...document.querySelectorAll('.js-card-room__form')].forEach((formElement) => {
  const cardRoom = new CardRoom({ formElement });
  cardRoom.observeForm();
});

[...document.querySelectorAll('.js-card-room')].forEach((cardRoomElement) => {
  const cardRoom = new CardRoom({ cardRoomElement });
  return cardRoom.observeCardRoom();
});
