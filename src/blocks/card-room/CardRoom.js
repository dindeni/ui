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
      for (let i = 0; i < inputs.length; i += 1) {
        const isInputFirst = inputs[i].checked && inputs[i] === inputs[0];
        const isInputChecked = inputs[i].checked && !flag;
        if (isInputFirst) {
          flag = true;
          images[i].classList.add('card-room__image_hide');
          images[inputs.length - 1].classList.remove('card-room__image_hide');
          inputs[inputs.length - 1].checked = true;
          inputs[i].parentElement.style.background = 'none';
          inputs[inputs.length - 1].parentElement.style.background = '#FFFFFF';
        } else if (isInputChecked) {
          inputs[i].parentElement.style.background = 'none';
          inputs[i - 1].parentElement.style.background = '#FFFFFF';
          images[i].classList.add('card-room__image_hide');
          images[i - 1].classList.remove('card-room__image_hide');
          inputs[i - 1].checked = true;
        }
      }
    }

    if (event.target === next) {
      let flag = false;
      for (let i = 0; i < inputs.length; i += 1) {
        const isInputLast = inputs[i].checked && inputs[i] === inputs[inputs.length - 1] && !flag;
        const isInputChecked = inputs[i].checked && !flag;

        if (isInputLast) {
          images[i].classList.add('card-room__image_hide');
          images[0].classList.remove('card-room__image_hide');
          inputs[0].checked = true;
          inputs[i].parentElement.style.background = 'none';
          inputs[0].parentElement.style.background = '#FFFFFF';
        } else if (isInputChecked) {
          flag = true;
          images[i].classList.add('card-room__image_hide');
          images[i + 1].classList.remove('card-room__image_hide');
          inputs[i + 1].checked = true;
          inputs[i].parentElement.style.background = 'none';
          inputs[i + 1].parentElement.style.background = '#FFFFFF';
        }
      }
    }
  }
}

export default CardRoom;
