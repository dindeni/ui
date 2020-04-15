import autoBind from 'auto-bind';

class Navigation {
  constructor(navigationElement) {
    this.navigationElement = navigationElement;
    autoBind(this);
  }

  observeButton() {
    this.navigationElement.addEventListener('click', this._handleButtonClick);
  }

  _handleButtonClick(event) {
    const button = this.navigationElement.querySelector('.js-navigation__button-mobile');
    const navigationList = this.navigationElement.querySelector('.js-navigation__list');
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
