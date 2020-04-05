import SumGuests from './SumGuests';

Array.from(document.querySelectorAll('.sum-guests')).map((wrapper) => {
  const sumGuests = new SumGuests(wrapper);
  return sumGuests.countGuests();
});
