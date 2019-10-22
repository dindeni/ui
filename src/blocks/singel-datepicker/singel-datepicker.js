require('jquery-ui/ui/widgets/datepicker.js');

const datePicker = (element) => {
  const $element = $(element);

  const clearInput = () => {
    $element.datepicker('setDate', null);
  };

  const applyDatepicker = () => {
    $element.datepicker('hide');
  };

  $element.datepicker({
    showOtherMonths: true,
    dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    dateFormat: 'dd.mm.yy',
    monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль',
      'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    nextText: '',
    firstDay: 1,
    showButtonPanel: true,
    closeText: 'очистить',
    currentText: 'применить',
    onClose: (value, instance) => {
      if (value === '') {
        $element.datepicker('setDate', null);
      }

      instance.dpDiv.removeClass('ui-datepicker_for-single-datepicker');
    },
    beforeShow: (text, instance) => {
      setTimeout(() => {
        instance.dpDiv.addClass('ui-datepicker_for-single-datepicker');
        instance.dpDiv.css({ top: $element.offset().top + 44 });

        const $clearButton = $('.ui-datepicker-close');
        const $applyButton = $('.ui-datepicker-current');

        $clearButton.click(clearInput);
        $applyButton.click(applyDatepicker);
      }, 0);
    },
  });
};

$('.js-form-element__field_date').each((index, value) => {
  datePicker(value);
});
