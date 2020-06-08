import UiSlider from './UiSlider';

const sliderElements = document.querySelectorAll('.js-ui-slider');

sliderElements.forEach((element) => {
  const $sliderElement = $(element);
  const uiSlider = new UiSlider($sliderElement);
  uiSlider.loadSlider();
});
