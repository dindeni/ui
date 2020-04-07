import Datepickers from './Datepickers';

const singleDate = $('.js-form-element__field_type_single');

if (singleDate) {
  singleDate.each((index, value) => {
    const uiDatepicker = new Datepickers({ singleElement: value });
    uiDatepicker.loadSingleDatepicker();
  });
}

const $inputElement = $('.js-form-element__field_type_range');
const $inputElementHide = $('.js-form-element__field_type_hidden');

const isExistFilterElements = $inputElement && $inputElementHide;
if (isExistFilterElements) {
  const uiDatepicker = new Datepickers({ $inputElement, $inputElementHide });
  uiDatepicker.loadRangeDatepicker();
}

const $inputElementIn = $('.js-form-element__field_for-search-in');
const $inputElementOut = $('.js-form-element__field_for-search-out');

const isExistInputsForSearch = $inputElementIn && $inputElementOut;
if (isExistInputsForSearch) {
  const uiDatepicker = new Datepickers({
    $inputElementIn,
    $inputElementOut,
    modifier: 'for-search',
  });
  uiDatepicker.loadDoubleDatepicker();
}

const $inputForOrderIn = $('.js-form-element__field_for-order-in');
const $inputForOrderOut = $('.js-form-element__field_for-order-out');

const isExistInputsForOrder = $inputForOrderIn && $inputForOrderOut;
if (isExistInputsForOrder) {
  const uiDatepicker = new Datepickers({
    $inputElementIn: $inputForOrderIn,
    $inputElementOut: $inputForOrderOut,
    modifier: 'for-order',
  });
  uiDatepicker.loadDoubleDatepicker();
}
