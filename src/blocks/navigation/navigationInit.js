import Navigation from './Navigation';

const navigationElements = document.querySelectorAll('.js-navigation');
Array.from(navigationElements).map((navigationElement) => {
  const navigation = new Navigation(navigationElement);
  navigation.hideList();
  return navigation.observeButton();
});
