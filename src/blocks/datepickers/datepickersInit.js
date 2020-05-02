import Datepickers from './Datepickers';

const datepickers = document.querySelectorAll('.js-datepickers');


[...datepickers].map((datepickerElement) => {
  const formList = datepickerElement.querySelectorAll('.js-form-element__field');

  switch (datepickerElement.dataset.type) {
    case 'single': {
      const uiDatepicker = new Datepickers({ inputElement: formList[0] });
      return uiDatepicker.loadSingleDatepicker();
    }
    case 'range': {
      const uiDatepicker = new Datepickers({
        inputElement: formList[0],
        inputElementHide: formList[1],
      });
      return uiDatepicker.loadRangeDatepicker();
    }
    case 'double': {
      const uiDatepicker = new Datepickers({
        inputElementIn: formList[0],
        inputElementOut: formList[1],
      });
      return uiDatepicker.loadDoubleDatepicker();
    }
    default: return undefined;
  }
});
