require('jquery-ui/ui/widgets/slider');
require('jquery-ui/themes/base/slider.css');

class UiSlider {
  constructor($sliderElement) {
    this.$sliderElement = $sliderElement;
    this.$rangeElement = $sliderElement.find('.js-ui-slider__range');
    this.$labelElement = this.$sliderElement.find('.js-ui-slider__label');
  }

  loadSlider() {
    this.$rangeElement.slider({
      range: true,
      min: 0,
      max: 16000,
      step: 1000,
      values: [5000, 10000],
      slide: (event, ui) => {
        this.$labelElement.html(`${ui.values[0].toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}&#8381; - ${ui.values[1].toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}&#8381;`);
      },
    });
  }
}

export default UiSlider;
