class CardRoom {
  constructor(options) {
    const { formElement, cardRoomElement } = options;
    this.formElement = formElement;
    this.cardRoomElement = cardRoomElement;
  }

  observeForm() {
    this.formElement.addEventListener('change', (event) => CardRoom.handleFormElementChange(event, this.formElement));
  }

  observeCardRoom() {
    this.cardRoomElement.addEventListener('click', (event) => CardRoom.handleCardRoomElementClick(event, this.cardRoomElement));
  }

  static handleFormElementChange(event, formElement) {
    let imageCount = 0;
    if (event.currentTarget === formElement) {
      const cardImages = event.currentTarget.parentElement.querySelectorAll('.js-card-room__image');
      Array.from(formElement.querySelectorAll('.card-room__radio'))
        .map((input, index) => {
          if (event.target === input) {
            const inputElement = input;
            inputElement.parentElement.style.background = '#FFFFFF';
            cardImages[index].classList.remove('card-room__image_hide');
            if (imageCount !== index) {
              cardImages[imageCount].classList.add('card-room__image_hide');
            }
            imageCount = index;
          } else if (event.currentTarget === input.parentElement.parentElement) {
            const inputElement = input;
            inputElement.parentElement.style.background = 'none';
            cardImages[index].classList.add('card-room__image_hide');
          }
          return undefined;
        });
    }
  }

  static handleCardRoomElementClick(event, cardRoomElement) {
    const prev = cardRoomElement.querySelector('.js-card-room__arrow_prev');
    const next = cardRoomElement.querySelector('.js-card-room__arrow_next');
    const images = cardRoomElement.querySelectorAll('.js-card-room__image');
    const inputs = cardRoomElement.querySelectorAll('.js-card-room__radio');

    if (event.target === prev) {
      let flag = false;
      Array.from(inputs).map((input, index) => {
        const inputElement = input;
        const isInputFirst = inputElement.checked && input === inputs[0];
        const isInputChecked = inputElement.checked && !flag;
        if (isInputFirst) {
          flag = true;
          images[index].classList.add('card-room__image_hide');
          images[inputs.length - 1].classList.remove('card-room__image_hide');
          inputs[inputs.length - 1].checked = true;
          inputElement.parentElement.style.background = 'none';
          inputs[inputs.length - 1].parentElement.style.background = '#FFFFFF';
        } else if (isInputChecked) {
          inputElement.parentElement.style.background = 'none';
          inputs[index - 1].parentElement.style.background = '#FFFFFF';
          images[index].classList.add('card-room__image_hide');
          images[index - 1].classList.remove('card-room__image_hide');
          inputs[index - 1].checked = true;
        }
        return undefined;
      });
    }

    if (event.target === next) {
      let flag = false;
      Array.from(inputs).map((input, index) => {
        const inputElement = input;
        const isInputLast = inputElement.checked && inputElement === inputs[inputs.length - 1]
         && !flag;
        const isInputChecked = inputElement.checked && !flag;

        if (isInputLast) {
          images[index].classList.add('card-room__image_hide');
          images[0].classList.remove('card-room__image_hide');
          inputs[0].checked = true;
          inputs[index].parentElement.style.background = 'none';
          inputs[0].parentElement.style.background = '#FFFFFF';
        } else if (isInputChecked) {
          flag = true;
          images[index].classList.add('card-room__image_hide');
          images[index + 1].classList.remove('card-room__image_hide');
          inputs[index + 1].checked = true;
          inputs[index].parentElement.style.background = 'none';
          inputs[index + 1].parentElement.style.background = '#FFFFFF';
        }
      });
    }
  }
}

export default CardRoom;
