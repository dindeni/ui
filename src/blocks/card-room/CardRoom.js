import autoBind from 'auto-bind';

class CardRoom {
  constructor(cardRoomElement) {
    this.cardRoomElement = cardRoomElement;
    this.formElement = cardRoomElement.querySelector('.js-card-room__form');
    autoBind(this);
  }

  observeCardRoom() {
    this.cardRoomElement.addEventListener('click', this._handleCardRoomElementClick);
    this._observeForm();
  }

  _observeForm() {
    this.formElement.addEventListener('change', this._handleFormElementChange);
  }

  _handleFormElementChange(event) {
    let imageCount = 0;

    if (event.currentTarget === this.formElement) {
      const cardImages = event.currentTarget.parentElement.querySelectorAll('.js-card-room__image');
      [...this.formElement.querySelectorAll('.card-room__radio')]
        .forEach((input, index) => {
          if (event.target === input) {
            input.parentElement.classList.add('card-room__mark_filled');
            cardImages[index].classList.remove('card-room__image_hidden');
            if (imageCount !== index) {
              cardImages[imageCount].classList.add('card-room__image_hidden');
            }
            imageCount = index;
          } else {
            input.parentElement.classList.remove('card-room__mark_filled');
            cardImages[index].classList.add('card-room__image_hidden');
          }
        });
    }
  }

  _handleCardRoomElementClick(event) {
    const prev = this.cardRoomElement.querySelector('.js-card-room__arrow_type_prev');
    const next = this.cardRoomElement.querySelector('.js-card-room__arrow_type_next');
    const images = this.cardRoomElement.querySelectorAll('.js-card-room__image');
    const inputs = this.cardRoomElement.querySelectorAll('.js-card-room__radio');

    if (event.target === prev) {
      CardRoom._changeImage({ inputs, images, type: 'previous' });
    }

    if (event.target === next) {
      CardRoom._changeImage({ inputs, images, type: 'next' });
    }
  }

  static _changeImage(options) {
    const { inputs, images, type } = options;

    let flag = false;
    [...inputs].forEach((input, index) => {
      const isInputChecked = input.checked && !flag;
      if (isInputChecked) {
        const newIndex = CardRoom._findIndex({
          inputs, input, index, type,
        });

        images[index].classList.add('card-room__image_hidden');
        images[newIndex].classList.remove('card-room__image_hidden');
        inputs[newIndex].checked = true;
        input.parentElement.classList.remove('card-room__mark_filled');
        inputs[newIndex].parentElement.classList.add('card-room__mark_filled');
        flag = true;
      }
    });
  }

  static _findIndex(options) {
    const {
      inputs, input, index, type,
    } = options;

    if (type === 'next') {
      return input === inputs[inputs.length - 1] ? 0 : index + 1;
    }
    return input === inputs[0] ? inputs.length - 1 : index - 1;
  }
}

export default CardRoom;
