const controlButtonMinus = (number, buttonMinus) => {
  number.forEach((value, index) => {
    const buttonMinusElement = buttonMinus;
    if (+value.textContent === 0) {
      buttonMinusElement[index].style.opacity = '0.38';
    } else buttonMinusElement[index].style.opacity = '1';
  });
};

export default controlButtonMinus;

const countGuests = (classGuests) => {
  if (document.querySelector(classGuests)) {
    const guests = document.querySelector(classGuests);
    const buttonMinus = guests.querySelectorAll('.sum-guests__button_minus');
    const numberVisitors = guests.querySelectorAll('.sum-guests__number-of-visitors');
    const inputGuests = guests.querySelector('.form-element__field_for-guests');
    const guestsPopup = guests.querySelector('.sum-guests__popup');
    const containerAdult = guests.querySelector('.sum-guests__container_adult');
    const containerChildren = guests.querySelector('.sum-guests__container_children');
    const containerBabies = guests.querySelector('.sum-guests__container_babies');
    const buttonApply = guests.querySelector('.buttons__transparent_apply');
    const buttonClear = guests.querySelector('.buttons__transparent_clear');
    const buttonsContainer = guests.querySelector('.sum-guests__buttons-footer-container');

    const sumGuests = (evt) => {
      const { parentElement } = evt.target.parentElement;
      const searchButtonPlus = parentElement.querySelector(
        '.sum-guests__button_plus',
      );
      const searchButtonMinus = parentElement.querySelector(
        '.sum-guests__button_minus',
      );
      const searchNumberVisitors = parentElement.querySelector('.sum-guests__number-of-visitors');

      const increaseVisitors = () => { inputGuests.value = (+inputGuests.value + 1); };
      const decreaseVisitors = () => { inputGuests.value = +inputGuests.value - 1; };
      const increaseNumberVisitors = () => {
        searchNumberVisitors
          .textContent = +searchNumberVisitors.textContent + 1;
      };
      const decreaseNumberVisitors = () => {
        searchNumberVisitors
          .textContent = +searchNumberVisitors.textContent - 1;
      };

      const isAdultPlus = parentElement === containerAdult && evt.target === searchButtonPlus;
      const isAdultMinus = parentElement === containerAdult
      && evt.target === searchButtonMinus && searchNumberVisitors.textContent > 0;
      const isChildrenPlus = parentElement === containerChildren && evt.target === searchButtonPlus;
      const isChildrenMinus = parentElement === containerChildren
      && evt.target === searchButtonMinus && searchNumberVisitors.textContent > 0;
      const isBabiesPlus = parentElement === containerBabies
      && evt.target === searchButtonPlus;
      const isBabiesMinus = parentElement === containerBabies
      && evt.target === searchButtonMinus && searchNumberVisitors.textContent > 0;

      if (isAdultPlus) {
        increaseNumberVisitors();
        increaseVisitors();
      } else if (isAdultMinus) {
        decreaseNumberVisitors();
        decreaseVisitors();
      } else if (isChildrenPlus) {
        increaseNumberVisitors();
        increaseVisitors();
      } else if (isChildrenMinus) {
        decreaseNumberVisitors();
        decreaseVisitors();
      } else if (isBabiesPlus) {
        increaseNumberVisitors();
        increaseVisitors();
      } else if (isBabiesMinus) {
        decreaseNumberVisitors();
        decreaseVisitors();
      }
    };

    const clearInput = (evt) => {
      const hasValue = +inputGuests.value !== 0 && inputGuests.value !== '';
      if (hasValue) {
        buttonClear.classList.remove('buttons__transparent_hide');
        buttonsContainer.style.justifyContent = 'space-between';
      } else {
        buttonClear.classList.add('buttons__transparent_hide');
        buttonsContainer.style.justifyContent = 'end';
      }
      if (evt.target === buttonClear) {
        inputGuests.value = 0;
        guestsPopup.querySelectorAll('.sum-guests__number-of-visitors').forEach((value) => {
          const valueOfSpanElement = value;
          valueOfSpanElement.textContent = '0';
        });
      }
    };

    const applyInputValue = (evt) => {
      if (evt.target === buttonApply) {
        evt.preventDefault();
        guestsPopup.classList.add('sum-guests__popup_hide');
      }
    };

    const handlerGuestsClick = (evt) => {
      const isHidden = evt.target === inputGuests && guestsPopup.classList.contains('sum-guests__popup_hide');
      if (isHidden) {
        guestsPopup.classList.remove('sum-guests__popup_hide');
      }

      sumGuests(evt);
      clearInput(evt);
      applyInputValue(evt);
      controlButtonMinus(numberVisitors, buttonMinus);
    };
    guests.addEventListener('click', handlerGuestsClick);
  }
};

countGuests('.sum-guests');
