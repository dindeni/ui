import SumGuests from './SumGuests';

[...document.querySelectorAll('.js-sum-guests')].forEach((wrapper) => {
  const sumGuests = new SumGuests(wrapper);
  sumGuests.countGuests();
});
