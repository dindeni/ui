const inputGuests = document.querySelector('#guests-input');
const guestsPopup = document.querySelector('#guestsPopup');
const wrapperAdult = document.querySelector('#guest-wrapper-adult');
const wrapperChildren = document.querySelector('#guest-wrapper-children');
const wrapperBabies = document.querySelector('#guest-wrapper-babies');
const buttonApply = document.querySelector('.guests__buttons-footer--apply');
const buttonClear = document.querySelector('.guests__buttons-footer--clear');

inputGuests.value = 0;

document.addEventListener('click', (evt)=>{
    if(evt.target === inputGuests && guestsPopup.classList.contains('hide')){
        guestsPopup.classList.remove('hide')
    }/*else if (!guestsPopup.classList.contains('hide') && evt.target !== inputGuests){
        guestsPopup.classList.add('hide')
    }*/

    sumGuests(evt);
    clearInput(evt);
    applyInputValue(evt);

});

const sumGuests = (evt)=>{
    let parentElement = evt.target.parentElement.parentElement;
    let searchButtonPlus = parentElement.querySelector(
        '.guests__button--plus');
    let searchButtonMinus = parentElement.querySelector(
        '.guests__button--minus');
    let searchNumberVisitors = parentElement.querySelector('.guests__numberVisitors');

    const increaseVisitors = ()=> inputGuests.value = +inputGuests.value + 1;
    const decreaseVisitors = ()=> inputGuests.value = +inputGuests.value - 1;
    const increaseNumberVisitors = ()=>
        searchNumberVisitors.textContent = +searchNumberVisitors.textContent + 1;
    const decreaseNumberVisitors = ()=> searchNumberVisitors.textContent =
        +searchNumberVisitors.textContent - 1;

    if (parentElement === wrapperAdult &&
        evt.target === searchButtonPlus){
        increaseNumberVisitors();
        increaseVisitors();
    }else if (parentElement === wrapperAdult &&
        evt.target === searchButtonMinus && searchNumberVisitors.textContent > 0){
        decreaseNumberVisitors();
        decreaseVisitors();
    }else if(evt.target.parentElement.parentElement === wrapperChildren &&
        evt.target === searchButtonPlus){
        increaseNumberVisitors();
        increaseVisitors();
    }else if (parentElement === wrapperChildren &&
        evt.target === searchButtonMinus && searchNumberVisitors.textContent > 0){
        decreaseNumberVisitors();
        decreaseVisitors();
    }else if(parentElement === wrapperBabies &&
        evt.target === searchButtonPlus){
        increaseNumberVisitors();
        increaseVisitors();
    }else if (parentElement === wrapperBabies &&
        evt.target === searchButtonMinus && searchNumberVisitors.textContent > 0){
        decreaseNumberVisitors();
        decreaseVisitors();
    }
};

const clearInput = (evt)=>{
    if(evt.target === buttonClear){
        inputGuests.value = 0;
        guestsPopup.querySelectorAll('.guests__numberVisitors').forEach((value)=>{
            value.textContent = 0
        })
    }
};

const applyInputValue = (evt)=>{
    if (evt.target === buttonApply){
        guestsPopup.classList.add('hide')
    }
};


