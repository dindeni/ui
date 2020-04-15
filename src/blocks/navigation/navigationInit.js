import Navigation from './Navigation';

const navigationElements = document.querySelectorAll('.js-navigation');
Array.from(navigationElements).map((navigationElement) => {
  const navigation = new Navigation(navigationElement);
  return navigation.observeButton();
});
