import SumGuests from './SumGuests';

Array.from(document.querySelectorAll('.sum-guests')).map((wrapper) => {
  const babiesValue = 0;
  const guestsValue = 0;

  const sumGuests = new SumGuests({ classGuests: wrapper, guestsValue, babiesValue });
  return sumGuests.countGuests();
});
