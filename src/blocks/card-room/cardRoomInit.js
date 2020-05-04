import CardRoom from './CardRoom';

[...document.querySelectorAll('.js-card-room')].forEach((cardRoomElement) => {
  const cardRoom = new CardRoom(cardRoomElement);
  return cardRoom.observeCardRoom();
});
