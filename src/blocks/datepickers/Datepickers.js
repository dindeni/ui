import autoBind from 'auto-bind';
import { DATE_SETTINGS, SHIFT_LEFT, BORDER_CORRECTION } from './constants';

require('jquery-ui/ui/widgets/datepicker.js');

class Datepickers {
  constructor(options) {
    const {
      singleElement, $inputElement, $inputElementHide, $inputElementIn,
      $inputElementOut, modifier,
    } = options;

    this.$singleElement = $(singleElement);
    this.$inputElement = $inputElement;
    this.$inputElementHide = $inputElementHide;
    this.$inputElementIn = $inputElementIn;
    this.$inputElementOut = $inputElementOut;
    this.modifier = modifier;
    autoBind(this);
  }

  loadSingleDatepicker() {
    this._setSingleDatepickerSettings();
  }

  loadRangeDatepicker() {
    this._setRangeDatepickerSettings();
  }

  loadDoubleDatepicker() {
    this._setDoubleDatepickerSettings();
  }

  _setSingleDatepickerSettings() {
    this.$singleElement.datepicker({
      ...DATE_SETTINGS,
      dateFormat: 'dd.mm.yy',
      onClose: (value, instance) => {
        if (value === '') {
          this.$singleElement.datepicker('setDate', null);
        }

        instance.dpDiv.removeClass('ui-datepicker_for-single-datepicker');
      },
      beforeShow: (text, instance) => {
        setTimeout(() => {
          instance.dpDiv.addClass('ui-datepicker_for-single-datepicker');
          instance.dpDiv.css({ top: this.$singleElement.offset().top + SHIFT_LEFT });

          const $buttonClear = $('.ui-datepicker-close');
          const $buttonApply = $('.ui-datepicker-current');

          $buttonClear.click(() => Datepickers._clearInput(this.$singleElement));
          $buttonApply.click(() => Datepickers._applyValue(this.$singleElement));

          Datepickers.removeClass(instance.dpDiv);
        }, 0);
      },
    });
  }

  _setRangeDatepickerSettings() {
    this.$inputElement.datepicker({
      ...DATE_SETTINGS,
      dateFormat: 'dd M',
      monthNamesShort: [' янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
      beforeShow: (text, instance) => {
        setTimeout(() => {
          instance.dpDiv.addClass('ui-datepicker_type_range');

          instance.dpDiv.css({
            top: this.$inputElement.offset().top + SHIFT_LEFT,
            left: this.$inputElement.offset().left,
            width: this.$inputElement.outerWidth() - BORDER_CORRECTION,
          });

          const $buttonClear = $('.ui-datepicker-close');
          const $buttonApply = $('.ui-datepicker-current');

          $buttonClear.click(() => Datepickers._clearInput(this.$inputElement));
          $buttonApply.click({ value: this.$inputElement }, Datepickers._applyValueThroughEvent);
        }, 0);
      },
      onClose: (value) => {
        if (!value) {
          this.$inputElement.datepicker('setDate', null);
        } else this.$inputElementHide.datepicker('show');
      },
    });

    this.$inputElementHide.datepicker({
      ...DATE_SETTINGS,
      dateFormat: 'dd M',
      monthNamesShort: [' янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
      onClose: (value) => {
        const isValidValue = parseInt(value, 10) > parseInt(this.$inputElement.val(), 10);
        if (value === '' || !isValidValue) {
          this.$inputElementHide.datepicker('setDate', null);
        } else {
          this.$inputElement.val(`${this.$inputElement.val().substring(0, 6)} - ${value}`);
        }
      },
      beforeShow: (text, instance) => {
        setTimeout(() => {
          if (parseInt(this.$inputElement.css('width'), 10) < 270) {
            instance.dpDiv.addClass('ui-datepicker_type_range');
          }
          instance.dpDiv.css({
            top: this.$inputElement.offset().top + SHIFT_LEFT,
            left: this.$inputElement.offset().left,
          });

          const $buttonClear = $('.ui-datepicker-close');
          const $buttonApply = $('.ui-datepicker-current');

          $buttonClear.click(this.$inputElementHide);
          $buttonApply.click({ value: this.$inputElementHide },
            Datepickers._applyValueThroughEvent);
        }, 0);
      },
    });
  }

  _setDoubleDatepickerSettings() {
    this.$inputElementIn.datepicker({
      ...DATE_SETTINGS,
      dateFormat: 'dd.mm.yy',
      onSelect: (date) => {
        if (date < this.dateOut || !this.dateOut) {
          this.dateArrive = date;
        }
      },
      beforeShow: (input, instance) => {
        this.getRange();

        setTimeout(() => {
          instance.dpDiv.css({
            top: this.$inputElementIn.offset().top + SHIFT_LEFT,
            left: this.$inputElementIn.offset().left,
          });

          if (this.modifier) {
            instance.dpDiv.addClass(`ui-datepicker_${this.modifier}`);
          }

          const $clearButton = $('.ui-datepicker-close');
          const $applyButton = $('.ui-datepicker-current');

          $clearButton.click(() => Datepickers._clearInput(instance.input));
          $applyButton.click({ value: this.$inputElementIn }, Datepickers._applyValueThroughEvent);

          Datepickers.removeClass(instance.dpDiv);
        }, 0);
      },
      onClose: (value, instance) => {
        if (value === '') {
          instance.input.datepicker('setDate', null);
        } else instance.input.datepicker('setDate', this.dateArrive);

        if (this.modifier) {
          instance.dpDiv.removeClass(`ui-datepicker_${this.modifier}`);
        }
      },
    });

    this.$inputElementOut.datepicker({
      ...DATE_SETTINGS,
      dateFormat: 'dd.mm.yy',
      onSelect: (date) => {
        if (date > this.dateArrive) {
          this.dateOut = date;
        }
      },
      beforeShow: (input, instance) => {
        this.getRange();
        setTimeout(() => {
          if (this.modifier) {
            instance.dpDiv.addClass(`ui-datepicker_${this.modifier}`);
          }
          instance.dpDiv.css({
            top: instance.input.offset().top + SHIFT_LEFT,
            left: this.$inputElementIn.offset().left,
          });
          const $clearButton = $('.ui-datepicker-close');
          const $applyButton = $('.ui-datepicker-current');

          $clearButton.click({ value: this.$inputElementOut }, () => Datepickers
            ._clearInput(this.$inputElementOut));
          $applyButton.click({ value: this.$inputElementOut },
            Datepickers._applyValueThroughEvent);

          Datepickers.removeClass(instance.dpDiv);
        }, 0);
      },
      onClose: (value, instance) => {
        if (value === '') {
          this.$inputElementOut.datepicker('setDate', null);
        } else this.$inputElementOut.datepicker('setDate', this.dateOut);

        if (this.modifier) {
          instance.dpDiv.removeClass(`ui-datepicker_${this.modifier}`);
        }
      },
    });
  }

  getRange() {
    setTimeout(() => {
      const $tdElement = $('.ui-datepicker td');

      $tdElement.each((index, td) => {
        const childElementValue = parseInt(td.firstChild.textContent, 10);
        const isMaxDate = this.dateOut && childElementValue
         === parseInt(this.dateOut.substring(0, 2), 10);
        const isMinDate = this.dateArrive && childElementValue
          === parseInt(this.dateArrive.substring(0, 2), 10);
        const isRangeDate = this.dateArrive && this.dateOut && childElementValue
          > parseInt(this.dateArrive.substring(0, 2), 10)
          && childElementValue < parseInt(this.dateOut.substring(0, 2), 10);

        if (isMaxDate) {
          $(td).addClass('ui-datepicker-calendar__max');
        } else if (isMinDate) {
          $(td).addClass('ui-datepicker-calendar__min');
        } else if (isRangeDate) {
          $(td).addClass('ui-datepicker-calendar__range');
        }
      });
    }, 0);
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

  static removeClass($element) {
    if ($element.hasClass('ui-datepicker_type_range')) {
      $element.removeClass('ui-datepicker_type_range');
    }
  }
}

export default Datepickers;
