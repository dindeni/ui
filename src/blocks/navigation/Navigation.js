class Navigation {
  constructor(navigationElement) {
    this.navigationElement = navigationElement;
  }

  observeButton() {
    this.navigationElement.addEventListener('click',
      (event) => Navigation._handleButtonClick({ event, navigation: this.navigationElement }));
  }

  static _handleButtonClick(options) {
    const { event, navigation } = options;
    const button = navigation.querySelector('.js-navigation__button-mobile');
    const navigationList = navigation.querySelector('.js-navigation__list');
    const isButtonClose = event.target === button
      && !button.classList.contains('navigation__button-mobile_open');
    const isButtonOpen = event.target === button
      && button.classList.contains('navigation__button-mobile_open');
    if (isButtonClose) {
      navigationList.style.display = 'block';
      button.classList.add('navigation__button-mobile_open');
    } else if (isButtonOpen) {
      navigationList.style.display = 'none';
      button.classList.remove('navigation__button-mobile_open');
    }
  }
}

export default Navigation;
