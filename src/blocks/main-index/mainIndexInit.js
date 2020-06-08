import MainIndex from './MainIndex';

const mainElements = document.querySelectorAll('.js-main-index');

[...mainElements].forEach((element) => {
  const mainIndex = new MainIndex(element);
  mainIndex.changeBackground();
});
