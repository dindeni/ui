import UiSlider from './UiSlider';

const $sliderElement = $('.js-ui-slider__range');
const $labelElement = $('.js-ui-slider__label');

const isExistSliderElements = $sliderElement && $labelElement;
if (isExistSliderElements) {
  const uiSlider = new UiSlider({ $element: $sliderElement, $labelElement });
  uiSlider.loadSlider();
}
