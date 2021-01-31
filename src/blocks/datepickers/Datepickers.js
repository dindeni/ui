import autoBind from 'auto-bind';
import 'air-datepicker';
import 'air-datepicker/dist/css/datepicker.min.css';

import BASIC_SETTINGS from './constants';

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
      ...BASIC_SETTINGS,
      classes: 'datepickers__popup datepickers__popup_type_single',

      onShow: (instance) => {
        this._changePopupView(instance, this.$inputElement);
      },
      onSelect: (_formattedDate, _date, instance) => {
        const $buttonClear = instance.nav.$buttonsContainer.find('[data-action="clear"]');
        this._checkClearButtonVisibility($buttonClear);
        instance.hide();
      },
    });
  }

  _setRangeDatepickerSettings() {
    this.$inputElement.datepicker({
      ...BASIC_SETTINGS,
      range: true,
      classes: 'datepickers__popup datepickers__popup_type_range',

      onShow: (instance) => {
        this._changePopupView(instance, this.$inputElement);
      },
      onSelect: (_formattedDate, date, instance) => {
        if (date[0]) {
          this.$inputElement[0].value = Datepickers._formatDate(date[0]);
        }
        if (date[1]) {
          this.$inputElement[0].value = `${this.$inputElement[0].value} - ${Datepickers._formatDate(date[1])}`;
        }
        const $buttonClear = instance.nav.$buttonsContainer.find('[data-action="clear"]');
        this._checkClearButtonVisibility($buttonClear);
      },
    });
  }

  _setDoubleDatepickerSettings() {
    this.$inputElementIn.datepicker({
      ...BASIC_SETTINGS,
      range: true,

      onShow: (instance) => {
        this._changePopupView(instance, this.$inputElementIn);
      },
      onSelect: (_formattedDate, date, instance) => {
        if (date[0]) {
          this.$inputElementIn[0].value = Datepickers._formatDate(date[0], 'long');
        }
        this.$inputElementOut[0].value = date[1] ? Datepickers._formatDate(date[1], 'long') : '';
        const $buttonClear = instance.nav.$buttonsContainer.find('[data-action="clear"]');
        this._checkClearButtonVisibility($buttonClear);
      },
    });
    this.$inputElementOut.datepicker({
      onShow: (instance) => {
        instance.hide();
        this.$inputElementIn.data('datepicker').show();
      },
    });
  }

  _changePopupView(instance, $inputElement) {
    instance.$datepicker.css({ top: `${$inputElement.offset().top + $inputElement.outerHeight()}px` });
    const $buttonClear = instance.nav.$buttonsContainer.find('[data-action="clear"]');
    const $buttonApply = instance.nav.$buttonsContainer.find('[data-action="today"]');
    Datepickers._changeButtonsText($buttonClear, $buttonApply);
    $buttonApply.click(() => Datepickers._applyPopup(instance));
    this._checkClearButtonVisibility($buttonClear);
  }

  _checkClearButtonVisibility($buttonClear) {
    const inputs = this.wrapper.querySelectorAll('.js-form-element__field');

    const changeButtonClass = (isValueEmpty, hasClassHidden) => {
      if (isValueEmpty) {
        $buttonClear.addClass(!hasClassHidden ? 'datepicker--button_hidden' : '');
        $buttonClear.parent().css({ justifyContent: 'flex-end' });
      } else {
        $buttonClear.removeClass('datepicker--button_hidden');
        $buttonClear.parent().css({ justifyContent: 'space-between' });
      }
    };
    const isButtonHidden = $buttonClear.hasClass('datepicker--button_hidden');
    if (inputs.length > 1) {
      const isInputsEmpty = this.$inputElementIn.val() === '' && this.$inputElementOut.val() === '';
      changeButtonClass(isInputsEmpty, isButtonHidden);
    } else {
      const isInputEmpty = inputs[0].value === '';
      changeButtonClass(isInputEmpty, isButtonHidden);
    }
  }

  static _formatDate(date, type) {
    if (type === 'long') {
      const day = `0${date.getDate()}`.slice(-2);
      const month = `0${date.getMonth() + 1}`.slice(-2);
      const year = date.getFullYear();
      return `${day}.${month}.${year}`;
    }
    const localeDate = date.toLocaleString('ru-RU', { day: '2-digit', month: 'short' });
    return `${localeDate.slice(0, 2)} ${localeDate.slice(3, 6)}`;
  }

  static _changeButtonsText($buttonClear, $buttonApply) {
    $buttonClear.text('очистить');
    $buttonApply.text('применить');
  }

  static _applyPopup(datepickerInstance) {
    datepickerInstance.hide();
  }

  static _removeClass($element) {
    if ($element.hasClass('ui-datepicker_type_range')) {
      $element.removeClass('ui-datepicker_type_range');
    }
  }
}

export default Datepickers;
