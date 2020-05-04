import UiSlider from './UiSlider';

const $sliderElement = $('.js-ui-slider');

if ($sliderElement) {
  const uiSlider = new UiSlider($sliderElement);
  uiSlider.loadSlider();
}
