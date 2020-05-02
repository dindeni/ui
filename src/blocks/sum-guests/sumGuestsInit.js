import SumGuests from './SumGuests';

[...document.querySelectorAll('.js-sum-guests')].map((wrapper) => {
  const sumGuests = new SumGuests(wrapper);
  return sumGuests.countGuests();
});
