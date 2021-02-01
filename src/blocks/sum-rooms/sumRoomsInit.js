import SumRooms from './SumRooms';

const sumRoomsWrapper = document.querySelectorAll('.js-sum-rooms');

const values = [
  { type: 'bedroom', numberOfVisitors: 2 },
  { type: 'bed', numberOfVisitors: 2 },
  { type: 'bathroom', numberOfVisitors: 2 },
];

[...sumRoomsWrapper].forEach((wrapper) => {
  const sumRooms = new SumRooms(wrapper);
  sumRooms.summarizeRooms(values);
});
