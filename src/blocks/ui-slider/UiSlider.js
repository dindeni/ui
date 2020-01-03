require('jquery-ui/ui/widgets/slider');
require('jquery-ui/themes/base/slider.css');

class UiSlider {
  constructor({ $element, $labelElement }) {
    this.$element = $element;
    this.$labelElement = $labelElement;
  }

  loadSlider() {
    this.$element.slider({
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
