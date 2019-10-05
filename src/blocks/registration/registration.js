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
    onClose: (value) => {
      if (value === '') {
        $element.datepicker('setDate', null);
      }
    },
    beforeShow: (text, instance) => {
      setTimeout(() => {
        instance.dpDiv.css({ top: $element.offset().top + 44 });

        const $clearButton = $('.ui-ui-datepicker-close');
        const $applyButton = $('.ui-ui-datepicker-current');

        $clearButton.click(clearInput);
        $applyButton.click(applyDatepicker);
      }, 100);
    },
  });
};

datePicker('.js-form-element__field_for-registration');
