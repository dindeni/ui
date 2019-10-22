require('jquery-ui/ui/widgets/datepicker.js');


const $filterElement = $('.js-form-element__field_for-datepicker-range');
const $filterElementHide = $('.js-form-element__field_for-hide-datepicker');

const clearInput = () => {
  $filterElement.val('');
};

const applyDatepicker = (evt) => {
  evt.data.value.datepicker('hide');
};

$filterElement.datepicker({
  showOtherMonths: true,
  dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
  dateFormat: 'dd M',
  monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль',
    'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
  monthNamesShort: [' янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
  nextText: '',
  firstDay: 1,
  showButtonPanel: true,
  closeText: 'очистить',
  currentText: 'применить',
  beforeShow: (text, instance) => {
    setTimeout(() => {
      if (parseInt($filterElement.css('width'), 10) < 270) {
        instance.dpDiv.addClass('ui-datepicker_range');
      }

      instance.dpDiv.css({
        top: $filterElement.offset().top + 44,
        left: $filterElement.offset().left,
        width: $filterElement.outerWidth(),
      });

      const $clearButton = $('.ui-datepicker-close');
      const $applyButton = $('.ui-datepicker-current');

      $clearButton.click(clearInput);
      $applyButton.click({ value: $filterElement }, applyDatepicker);
    }, 0);
  },
  onClose: (value, instance) => {
    if (!value) {
      $filterElement.datepicker('setDate', null);
    } else $filterElementHide.datepicker('show');

    instance.dpDiv.removeClass('ui-datepicker_range');
  },
});

$filterElementHide.datepicker({
  showOtherMonths: true,
  dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
  dateFormat: 'dd M',
  monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль',
    'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
  monthNamesShort: [' янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
  nextText: '',
  firstDay: 1,
  showButtonPanel: true,
  closeText: 'очистить',
  currentText: 'применить',
  onClose: (value, instance) => {
    const isValidValue = parseInt(value, 10) > parseInt($filterElement.val(), 10);
    if (value === '' || !isValidValue) {
      $filterElementHide.datepicker('setDate', null);
    } else {
      $filterElement.val(`${$filterElement.val().substring(0, 6)} - ${value}`);
    }

    instance.dpDiv.removeClass('ui-datepicker_range');
  },
  beforeShow: (text, instance) => {
    setTimeout(() => {
      if (parseInt($filterElement.css('width'), 10) < 270) {
        instance.dpDiv.addClass('ui-datepicker_range');
      }
      instance.dpDiv.css({
        top: $filterElement.offset().top + 44,
        left: $filterElement.offset().left,
      });

      const $clearButton = $('.ui-datepicker-close');
      const $applyButton = $('.ui-datepicker-current');

      $clearButton.click(clearInput);
      $applyButton.click({ value: $filterElementHide }, applyDatepicker);
    }, 0);
  },
});
