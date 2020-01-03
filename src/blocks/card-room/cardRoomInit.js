import CardRoom from './CardRoom';

Array.from(document.querySelectorAll('.js-card-room__form')).map((formElement) => {
  const cardRoom = new CardRoom({ formElement });
  return cardRoom.observeForm();
});

Array.from(document.querySelectorAll('.js-card-room')).map((cardRoomElement) => {
  const cardRoom = new CardRoom({ cardRoomElement });
  return cardRoom.observeCardRoom();
});
