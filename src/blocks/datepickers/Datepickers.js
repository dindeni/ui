import autoBind from 'auto-bind';
import {
  DATE_SETTINGS, SHIFT_LEFT, BORDER_CORRECTION, RANGE_SETTINGS, INDENT,
} from './constants';

require('jquery-ui/ui/widgets/datepicker.js');

class Datepickers {
  constructor(wrapper) {
    this.wrapper = wrapper;
    autoBind(this);
  }

  initialize() {
    const formList = this.wrapper.querySelectorAll('.js-form-element__field');

    switch (this.wrapper.dataset.type) {
      case 'single': {
        this.$inputElement = $(formList[0]);
        return this._setSingleDatepickerSettings();
      }
      case 'double': {
        this.$inputElementIn = $(formList[0]);
        this.$inputElementOut = $(formList[1]);
        return this._setDoubleDatepickerSettings();
      }
      case 'range': {
        this.$inputElement = $(formList[0]);
        this.$inputElementHide = $(formList[1]);
        return this._setRangeDatepickerSettings();
      }
      default: return undefined;
    }
  }

  _setSingleDatepickerSettings() {
    this.$inputElement.datepicker({
      ...DATE_SETTINGS,
      dateFormat: 'dd.mm.yy',
      onClose: (value, instance) => {
        if (value === '') {
          this.$inputElement.datepicker('setDate', null);
        }

        instance.dpDiv.removeClass('ui-datepicker_type_single');
      },
      beforeShow: (text, instance) => {
        setTimeout(() => {
          instance.dpDiv.addClass('ui-datepicker_type_single');
          instance.dpDiv.css({ top: this.$inputElement.offset().top + SHIFT_LEFT });

          const $buttonClear = $('.ui-datepicker-close');
          const $buttonApply = $('.ui-datepicker-current');

          $buttonClear.click(() => Datepickers._clearInput(this.$inputElement));
          $buttonApply.click(() => Datepickers._applyValue(this.$inputElement));

          Datepickers._removeClass(instance.dpDiv);
        }, 0);
      },
    });
  }

  _setRangeDatepickerSettings() {
    this.$inputElement.datepicker({
      ...DATE_SETTINGS,
      ...RANGE_SETTINGS,
      beforeShow: (text, instance) => {
        setTimeout(() => {
          instance.dpDiv.addClass('ui-datepicker_type_range');

          Datepickers._setDimensions({ instance, $element: this.$inputElement });

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
      ...RANGE_SETTINGS,
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

          Datepickers._setDimensions({ instance, $element: this.$inputElement });

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
        const isValidDate = date < this.dateOut || !this.dateOut;
        if (isValidDate) {
          this.dateArrive = date;
        }
      },
      beforeShow: (input, instance) => {
        this._getRange();

        setTimeout(() => {
          Datepickers._setDimensions({ instance, $element: this.$inputElementIn, type: 'double' });

          const $clearButton = $('.ui-datepicker-close');
          const $applyButton = $('.ui-datepicker-current');

          $clearButton.click(() => Datepickers._clearInput(instance.input));
          $applyButton.click({ value: this.$inputElementIn }, Datepickers._applyValueThroughEvent);

          Datepickers._removeClass(instance.dpDiv);
        }, 0);
      },
      onClose: (value, instance) => {
        if (value === '') {
          instance.input.datepicker('setDate', null);
        } else instance.input.datepicker('setDate', this.dateArrive);
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
        this._getRange();
        setTimeout(() => {
          Datepickers._setDimensions({ instance, $element: this.$inputElementIn, type: 'double' });

          const $clearButton = $('.ui-datepicker-close');
          const $applyButton = $('.ui-datepicker-current');

          $clearButton.click({ value: this.$inputElementOut }, () => Datepickers
            ._clearInput(this.$inputElementOut));
          $applyButton.click({ value: this.$inputElementOut },
            Datepickers._applyValueThroughEvent);

          Datepickers._removeClass(instance.dpDiv);
        }, 0);
      },
      onClose: (value) => {
        if (value === '') {
          this.$inputElementOut.datepicker('setDate', null);
        } else this.$inputElementOut.datepicker('setDate', this.dateOut);
      },
    });
  }

  _getRange() {
    setTimeout(() => {
      const $tdElement = $('.ui-datepicker td');

      $tdElement.each((index, td) => {
        const childElementValue = parseInt(td.firstChild.textContent, 10);
        const isMaxDate = this.dateOut
          && childElementValue === parseInt(this.dateOut.substring(0, 2), 10);
        const isMinDate = this.dateArrive
          && childElementValue === parseInt(this.dateArrive.substring(0, 2), 10);
        const isRangeDate = this.dateArrive && this.dateOut
          && childElementValue > parseInt(this.dateArrive.substring(0, 2), 10)
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

  static _setDimensions(options) {
    const { instance, $element, type } = options;

    const elementWidth = type === 'double' ? $element.outerWidth() * 2 + INDENT - BORDER_CORRECTION
      : $element.outerWidth() - BORDER_CORRECTION;
    instance.dpDiv.css({
      top: $element.offset().top + SHIFT_LEFT,
      left: $element.offset().left,
      width: elementWidth,
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

  static _removeClass($element) {
    if ($element.hasClass('ui-datepicker_type_range')) {
      $element.removeClass('ui-datepicker_type_range');
    }
  }
}

export default Datepickers;
