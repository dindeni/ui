require('jquery-ui/ui/widgets/datepicker.js');

const datePickerInOut = (elementIn, elementOut, modifier) => {
  const $dateElementIn = $(elementIn);
  const $dateElementOut = $(elementOut);
  let dateArrive;
  let dateOut;

  const getRange = () => {
    setTimeout(() => {
      const $tdElement = $('.ui-datepicker td');

      $tdElement.each((index, td) => {
        const childElement = td.firstChild.textContent;
        const isMaxDate = dateOut && +childElement === parseInt(dateOut.substring(0, 2), 10);
        const isMinDate = dateArrive && +childElement
        === parseInt(dateArrive.substring(0, 2), 10);
        const isRangeDate = dateArrive && dateOut && +childElement
        > parseInt(dateArrive.substring(0, 2), 10)
        && +childElement < parseInt(dateOut.substring(0, 2), 10);
        if (isMaxDate) {
          $(td).addClass('ui-datepicker-calendar__max');
        } else if (isMinDate) {
          $(td).addClass('ui-datepicker-calendar__min');
        } else if (isRangeDate) {
          $(td).addClass('ui-datepicker-calendar__range');
        }
      });
    }, 0);
  };

  const clearInput = (evt) => {
    evt.data.value.datepicker('setDate', null);
    evt.data.inOut === 'in' ? dateArrive = undefined : dateOut = undefined;
  };

  const applyDatepicker = (evt) => {
    evt.data.value.datepicker('hide');
  };

  $dateElementIn.datepicker({
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
    onSelect: (date) => {
      if (date < dateOut || !dateOut) {
        dateArrive = date;
      }
    },
    beforeShow(value, instance) {
      getRange($dateElementIn);
      setTimeout(() => {
        instance.dpDiv.css({
          top: $dateElementOut.offset().top + 44,
          left: $dateElementIn.offset().left,
        });

        if (modifier) {
          instance.dpDiv.addClass(`ui-datepicker_${modifier}`);
        }

        const $clearButton = $('.ui-datepicker-close');
        const $applyButton = $('.ui-datepicker-current');

        $clearButton.click({ value: $dateElementIn, inOut: 'in' }, clearInput);
        $applyButton.click({ value: $dateElementIn }, applyDatepicker);
      }, 0);
    },
    onClose: (value, instance) => {
      if (value === '') {
        $dateElementIn.datepicker('setDate', null);
      } else $dateElementIn.datepicker('setDate', dateArrive);

      if (modifier) {
        instance.dpDiv.removeClass(`ui-datepicker_${modifier}`);
      }
    },
  });

  $dateElementOut.datepicker({
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
    onSelect: (date) => {
      if (date > dateArrive) {
        dateOut = date;
      }
    },
    beforeShow(text, instance) {
      getRange($dateElementOut);
      setTimeout(() => {
        if (modifier) {
          instance.dpDiv.addClass(`ui-datepicker_${modifier}`);
        }

        instance.dpDiv.css({
          top: $dateElementOut.offset().top + 44,
          left: $dateElementIn.offset().left,
        });
        const $clearButton = $('.ui-datepicker-close');
        const $applyButton = $('.ui-datepicker-current');

        $clearButton.click({ value: $dateElementOut }, clearInput);
        $applyButton.click({ value: $dateElementOut }, applyDatepicker);
      }, 0);
    },
    onClose: (value, instance) => {
      if (value === '') {
        $dateElementOut.datepicker('setDate', null);
      } else $dateElementOut.datepicker('setDate', dateOut);

      if (modifier) {
        instance.dpDiv.removeClass(`ui-datepicker_${modifier}`);
      }
    },
  });
};

export default datePickerInOut;
