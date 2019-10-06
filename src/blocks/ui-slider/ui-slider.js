require('jquery-ui/ui/widgets/slider');
require('jquery-ui/themes/base/slider.css');

const $sliderElement = $('.ui-slider__range');
const $labelElement = $('.ui-slider__label');

$sliderElement.slider({
  range: true,
  min: 0,
  max: 16000,
  step: 1000,
  values: [5000, 10000],
  slide: (event, ui) => {
    $labelElement.html(`${ui.values[0].toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}&#8381; - ${ui.values[1].toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}&#8381;`);
  },
});
