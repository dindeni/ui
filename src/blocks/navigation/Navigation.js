class Navigation {
  constructor(navigationElement) {
    this.navigationElement = navigationElement;
  }

  observeButton() {
    this.navigationElement.addEventListener('click',
      (event) => Navigation._handleButtonClick({ event, navigation: this.navigationElement }));
  }

  hideList() {
    if (window.innerWidth <= 920) {
      const navigationList = this.navigationElement.querySelector('.js-navigation__list');
      navigationList.classList.add('navigation__list_hidden');
    }
  }

  static _handleButtonClick(options) {
    const { event, navigation } = options;
    const button = navigation.querySelector('.js-navigation__button-mobile');
    const navigationList = navigation.querySelector('.js-navigation__list');
    const isButtonClose = event.target === button
      && !button.classList.contains('navigation__button-mobile_state_open');
    const isButtonOpen = event.target === button
      && button.classList.contains('navigation__button-mobile_state_open');
    if (isButtonClose) {
      navigationList.classList.remove('navigation__list_hidden');
      button.classList.add('navigation__button-mobile_state_open');
    } else if (isButtonOpen) {
      navigationList.classList.add('navigation__list_hidden');
      button.classList.remove('navigation__button-mobile_state_open');
    }
  }
}

export default Navigation;
