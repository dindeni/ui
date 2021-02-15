import SumSearchItems from './SumSearchItems';

const wrapper = document.querySelectorAll('.js-sum-search-items');

const initRoomsValues = [2, 2, 2];

const roomsData = [
  { summableItems: [1], dictionary: ['спален', 'спальня', 'спальни'] },
  { summableItems: [2], dictionary: ['кроватей', 'кровать', 'кровати'] },
  { summableItems: [3], dictionary: ['ванных комнат', 'ванная комната', 'ванные комнаты'] },
];
const guestsData = [
  { summableItems: [1, 2], dictionary: ['гостей', 'гость', 'гостя'] },
  { summableItems: [3], dictionary: ['младенцев', 'младенец', 'младенца'] },
];

[...wrapper].forEach((element) => {
  if (element.classList.contains('js-sum-search-items_type_rooms')) {
    const sumSearchItems = new SumSearchItems(element, roomsData);
    sumSearchItems.summarize(initRoomsValues);
  } else {
    const sumSearchItems = new SumSearchItems(element, guestsData);
    sumSearchItems.summarize();
  }
});
