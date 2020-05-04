import MainIndex from './MainIndex';

const mainElement = document.querySelector('.js-main-index');

if (mainElement) {
  const mainIndex = new MainIndex(mainElement);
  mainIndex.changeBackground();
}
