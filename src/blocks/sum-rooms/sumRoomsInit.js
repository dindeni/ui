import SumRooms from './SumRooms';

const sumRoomsWrapper = document.querySelectorAll('.js-sum-rooms');

if (sumRoomsWrapper) {
  Array.from(sumRoomsWrapper).map((wrapper) => {
    const sumRooms = new SumRooms(wrapper);
    return sumRooms.summarizeRooms();
  });
}
