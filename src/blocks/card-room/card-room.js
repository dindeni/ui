let imageCount = 0;

const handleFormChange = (evt, form) => {
  if (evt.currentTarget === form) {
    const cardImages = evt.currentTarget.parentElement.querySelectorAll('.js-card-room__image');
    form.querySelectorAll('.card-room__radio')
      .forEach((input, index) => {
        if (evt.target === input) {
          const inputElement = input;
          inputElement.parentElement.style.background = '#FFFFFF';
          cardImages[index].classList.remove('card-room__image_hide');
          if (imageCount !== index) {
            cardImages[imageCount].classList.add('card-room__image_hide');
          }
          imageCount = index;
        } else if (evt.currentTarget === input.parentElement.parentElement) {
          const inputElement = input;
          inputElement.parentElement.style.background = 'none';
          cardImages[index].classList.add('card-room__image_hide');
        }
      });
  }
};

document.querySelectorAll('.js-card-room__form').forEach((form) => {
  form.addEventListener('change', (evt) => handleFormChange(evt, form));
});

const handleRoomsClick = (evt, cardRoom) => {
  const prev = cardRoom.querySelector('.js-card-room__arrow_prev');
  const next = cardRoom.querySelector('.js-card-room__arrow_next');
  const images = cardRoom.querySelectorAll('.js-card-room__image');
  const inputs = cardRoom.querySelectorAll('.js-card-room__radio');

  if (evt.target === prev) {
    let flag = false;
    for (let i = 0; i < inputs.length; i += 1) {
      const isInputFirst = inputs[i].checked && inputs[i] === inputs[0] && !flag;
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

  if (evt.target === next) {
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
};

document.querySelectorAll('.js-card-room').forEach((cardRoom) => {
  cardRoom.addEventListener('click', (evt) => handleRoomsClick(evt, cardRoom));
});
