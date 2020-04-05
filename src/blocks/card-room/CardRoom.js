import autoBind from 'auto-bind';

class CardRoom {
  constructor(options) {
    const { formElement, cardRoomElement } = options;
    this.formElement = formElement;
    this.cardRoomElement = cardRoomElement;
    autoBind(this);
  }

  observeForm() {
    this.formElement.addEventListener('change', this._handleFormElementChange);
  }

  observeCardRoom() {
    this.cardRoomElement.addEventListener('click', this._handleCardRoomElementClick);
  }

  _handleFormElementChange(event) {
    let imageCount = 0;

    if (event.currentTarget === this.formElement) {
      const cardImages = event.currentTarget.parentElement.querySelectorAll('.js-card-room__image');
      Array.from(this.formElement.querySelectorAll('.card-room__radio'))
        .map((input, index) => {
          if (event.target === input) {
            const inputElement = input;
            inputElement.parentElement.classList.add('card-room__mark_filled');
            cardImages[index].classList.remove('card-room__image_hidden');
            if (imageCount !== index) {
              cardImages[imageCount].classList.add('card-room__image_hidden');
            }
            imageCount = index;
          } else {
            const inputElement = input;
            inputElement.parentElement.classList.remove('card-room__mark_filled');
            cardImages[index].classList.add('card-room__image_hidden');
          }
          return undefined;
        });
    }
  }

  _handleCardRoomElementClick(event) {
    const prev = this.cardRoomElement.querySelector('.js-card-room__arrow_type_prev');
    const next = this.cardRoomElement.querySelector('.js-card-room__arrow_type_next');
    const images = this.cardRoomElement.querySelectorAll('.js-card-room__image');
    const inputs = this.cardRoomElement.querySelectorAll('.js-card-room__radio');

    if (event.target === prev) {
      CardRoom._showPreviousImage({ images, inputs });
    }

    if (event.target === next) {
      CardRoom._showNextImage({ images, inputs });
    }
  }

  static _showPreviousImage(options) {
    const { inputs, images } = options;

    let flag = false;
    Array.from(inputs).map((input, index) => {
      const inputElement = input;
      const isInputFirst = inputElement.checked && input === inputs[0];
      const isInputChecked = inputElement.checked && !flag;
      if (isInputFirst) {
        flag = true;
        images[index].classList.add('card-room__image_hidden');
        images[inputs.length - 1].classList.remove('card-room__image_hidden');
        inputs[inputs.length - 1].checked = true;
        inputElement.parentElement.classList.remove('card-room__mark_filled');
        inputs[inputs.length - 1].parentElement.classList.add('card-room__mark_filled');
      } else if (isInputChecked) {
        inputElement.parentElement.classList.remove('card-room__mark_filled');
        inputs[index - 1].parentElement.classList.add('card-room__mark_filled');
        images[index].classList.add('card-room__image_hidden');
        images[index - 1].classList.remove('card-room__image_hidden');
        inputs[index - 1].checked = true;
      }
      return undefined;
    });
  }

  static _showNextImage(options) {
    const { inputs, images } = options;

    let flag = false;
    Array.from(inputs).map((input, index) => {
      const inputElement = input;
      const isInputLast = inputElement.checked && inputElement === inputs[inputs.length - 1]
        && !flag;
      const isInputChecked = inputElement.checked && !flag;

      if (isInputLast) {
        images[index].classList.add('card-room__image_hidden');
        images[0].classList.remove('card-room__image_hidden');
        inputs[0].checked = true;
        inputs[index].parentElement.classList.remove('card-room__mark_filled');
        inputs[0].parentElement.classList.add('card-room__mark_filled');
      } else if (isInputChecked) {
        flag = true;
        images[index].classList.add('card-room__image_hidden');
        images[index + 1].classList.remove('card-room__image_hidden');
        inputs[index + 1].checked = true;
        inputs[index].parentElement.classList.remove('card-room__mark_filled');
        inputs[index + 1].parentElement.classList.add('card-room__mark_filled');
      }
      return undefined;
    });
  }
}

export default CardRoom;
