import Datepickers from './Datepickers';

const datepickersList = document.querySelectorAll('.js-datepickers');

[...datepickersList].forEach((wrapper) => {
  const datepickers = new Datepickers(wrapper);
  datepickers.initialize();
});
