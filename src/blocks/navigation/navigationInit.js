import Navigation from './Navigation';

const navigations = document.querySelectorAll('.js-navigation');
Array.from(navigations).map((navigationElement) => {
  const navigation = new Navigation(navigationElement);
  navigation.hideList();
  return navigation.observeButton();
});
