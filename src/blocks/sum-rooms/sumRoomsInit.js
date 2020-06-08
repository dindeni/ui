import SumRooms from './SumRooms';

const sumRoomsWrapper = document.querySelectorAll('.js-sum-rooms');

[...sumRoomsWrapper].forEach((wrapper) => {
  const sumRooms = new SumRooms(wrapper);
  sumRooms.summarizeRooms();
});
