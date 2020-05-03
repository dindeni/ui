import SumRooms from './SumRooms';

const sumRoomsWrapper = document.querySelectorAll('.js-sum-rooms');

if (sumRoomsWrapper) {
  [...sumRoomsWrapper].forEach((wrapper) => {
    const sumRooms = new SumRooms(wrapper);
    sumRooms.summarizeRooms();
  });
}
