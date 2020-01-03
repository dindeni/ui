import { DATE_SETTINGS, SHIFT_LEFT } from './constants';

require('jquery-ui/ui/widgets/datepicker.js');

class UiDatepicker {
  constructor(options) {
    const {
      singleElement, $inputElement, $inputElementHide, $inputElementIn,
      $inputElementOut, modifier,
    } = options;

    this.singleElement = singleElement;
    this.$inputElement = $inputElement;
    this.$inputElementHide = $inputElementHide;
    this.$inputElementIn = $inputElementIn;
    this.$inputElementOut = $inputElementOut;
    this.modifier = modifier;
  }

  loadSingleDatepicker() {
    UiDatepicker._setSingleDatepickerSettings(this.singleElement);
  }

  loadRangeDatepicker() {
    UiDatepicker._setRangeDatepickerSettings({
      $inputElement: this.$inputElement,
      $inputElementHide: this.$inputElementHide,
    });
  }

  loadDoubleDatepicker() {
    UiDatepicker._setDoubleDatepickerSettings({
      $inputElementIn: this.$inputElementIn,
      $inputElementOut: this.$inputElementOut,
      modifier: this.modifier,
    });
  }

  static _setSingleDatepickerSettings(element) {
    const $element = $(element);

    $element.datepicker({
      ...DATE_SETTINGS,
      dateFormat: 'dd.mm.yy',
      onClose: (value, instance) => {
        if (value === '') {
          $element.datepicker('setDate', null);
        }

        instance.dpDiv.removeClass('ui-datepicker_for-single-datepicker');
      },
      beforeShow: (text, instance) => {
        setTimeout(() => {
          instance.dpDiv.addClass('ui-datepicker_for-single-datepicker');
          instance.dpDiv.css({ top: $element.offset().top + SHIFT_LEFT });

          const $clearButton = $('.ui-datepicker-close');
          const $applyButton = $('.ui-datepicker-current');

          $clearButton.click(() => UiDatepicker._clearInput($element));
          $applyButton.click(() => UiDatepicker._applyValue($element));
        }, 0);
      },
    });
  }

  static _setRangeDatepickerSettings({ $inputElement, $inputElementHide }) {
    $inputElement.datepicker({
      ...DATE_SETTINGS,
      monthNamesShort: [' янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
      beforeShow: (text, instance) => {
        setTimeout(() => {
          if (parseInt($inputElement.css('width'), 10) < 270) {
            instance.dpDiv.addClass('ui-datepicker_range');
          }

          instance.dpDiv.css({
            top: $inputElement.offset().top + SHIFT_LEFT,
            left: $inputElement.offset().left,
            width: $inputElement.outerWidth(),
          });

          const $clearButton = $('.ui-datepicker-close');
          const $applyButton = $('.ui-datepicker-current');

          $clearButton.click(() => UiDatepicker._clearInput($inputElement));
          $applyButton.click({ value: $inputElement }, UiDatepicker._applyValueThroughEvent);
        }, 0);
      },
      onClose: (value, instance) => {
        if (!value) {
          $inputElement.datepicker('setDate', null);
        } else $inputElementHide.datepicker('show');

        instance.dpDiv.removeClass('ui-datepicker_range');
      },
    });

    $inputElementHide.datepicker({
      ...DATE_SETTINGS,
      dateFormat: 'dd M',
      monthNamesShort: [' янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
      onClose: (value, instance) => {
        const isValidValue = parseInt(value, 10) > parseInt($inputElement.val(), 10);
        if (value === '' || !isValidValue) {
          $inputElementHide.datepicker('setDate', null);
        } else {
          $inputElement.val(`${$inputElement.val().substring(0, 6)} - ${value}`);
        }

        instance.dpDiv.removeClass('ui-datepicker_range');
      },
      beforeShow: (text, instance) => {
        setTimeout(() => {
          if (parseInt($inputElement.css('width'), 10) < 270) {
            instance.dpDiv.addClass('ui-datepicker_range');
          }
          instance.dpDiv.css({
            top: $inputElement.offset().top + SHIFT_LEFT,
            left: $inputElement.offset().left,
          });

          const $clearButton = $('.ui-datepicker-close');
          const $applyButton = $('.ui-datepicker-current');

          $clearButton.click(() => $inputElementHide);
          $applyButton.click({ value: $inputElementHide }, UiDatepicker._applyValueThroughEvent);
        }, 0);
      },
    });
  }

  static _setDoubleDatepickerSettings(options) {
    const { $inputElementIn, $inputElementOut, modifier } = options;
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

    $inputElementIn.datepicker({
      ...DATE_SETTINGS,
      dateFormat: 'dd.mm.yy',
      onSelect: (date) => {
        if (date < dateOut || !dateOut) {
          dateArrive = date;
        }
      },
      beforeShow: (input, instance) => {
        getRange($inputElementIn);
        setTimeout(() => {
          instance.dpDiv.css({
            top: $inputElementIn.offset().top + SHIFT_LEFT,
            left: $inputElementIn.offset().left,
          });

          if (modifier) {
            instance.dpDiv.addClass(`ui-datepicker_${modifier}`);
          }

          const $clearButton = $('.ui-datepicker-close');
          const $applyButton = $('.ui-datepicker-current');

          $clearButton.click(() => UiDatepicker._clearInput(instance.input));
          $applyButton.click({ value: $inputElementIn }, UiDatepicker._applyValueThroughEvent);
        }, 0);
      },
      onClose: (value, instance) => {
        if (value === '') {
          instance.input.datepicker('setDate', null);
        } else instance.input.datepicker('setDate', dateArrive);

        if (modifier) {
          instance.dpDiv.removeClass(`ui-datepicker_${modifier}`);
        }
      },
    });

    $inputElementOut.datepicker({
      ...DATE_SETTINGS,
      dateFormat: 'dd.mm.yy',
      onSelect: (date) => {
        if (date > dateArrive) {
          dateOut = date;
        }
      },
      beforeShow: (input, instance) => {
        getRange($inputElementOut);
        setTimeout(() => {
          if (modifier) {
            instance.dpDiv.addClass(`ui-datepicker_${modifier}`);
          }
          instance.dpDiv.css({
            top: instance.input.offset().top + SHIFT_LEFT,
            left: $inputElementIn.offset().left,
          });
          const $clearButton = $('.ui-datepicker-close');
          const $applyButton = $('.ui-datepicker-current');

          $clearButton.click({ value: $inputElementOut }, () => UiDatepicker
            ._clearInput($inputElementOut));
          $applyButton.click({ value: $inputElementOut }, UiDatepicker._applyValueThroughEvent);
        }, 0);
      },
      onClose: (value, instance) => {
        if (value === '') {
          $inputElementOut.datepicker('setDate', null);
        } else $inputElementOut.datepicker('setDate', dateOut);

        if (modifier) {
          instance.dpDiv.removeClass(`ui-datepicker_${modifier}`);
        }
      },
    });
  }

  static _clearInput($element) {
    $element.datepicker('setDate', null);
  }

  static _applyValue($element) {
    $element.datepicker('hide');
  }

  static _applyValueThroughEvent(event) {
    event.data.value.datepicker('hide');
  }
}

export default UiDatepicker;
