import Navigation from './Navigation';

const navigationElements = document.querySelectorAll('.js-navigation');
[...navigationElements].forEach((navigationElement) => {
  const navigation = new Navigation(navigationElement);
  navigation.observeButton();
});
