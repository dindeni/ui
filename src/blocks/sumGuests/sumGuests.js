const countGuests = (classGuests) =>{
    if (document.querySelector(classGuests)){
        const guests = document.querySelector(classGuests);
        const buttonMinus = guests.querySelectorAll('.guests__button--minus');
        const numberVisitors = guests.querySelectorAll('.guests__numberVisitors');
        const inputGuests = guests.querySelector('#guests-input');
        const guestsPopup = guests.querySelector('#guestsPopup');
        const wrapperAdult = guests.querySelector('#guest-wrapper-adult');
        const wrapperChildren = guests.querySelector('#guest-wrapper-children');
        const wrapperBabies = guests.querySelector('#guest-wrapper-babies');
        const buttonApply = guests.querySelector('.guests__buttons-footer--apply');
        const buttonClear = guests.querySelector('.guests__buttons-footer--clear');
        const buttonsContainer = guests.querySelector('.guests__buttons-footer-container');

        buttonClear.classList.add('hide');

        const handlerGuestsClick = (evt)=>{
            const isHidden = evt.target === inputGuests && guestsPopup.classList.contains('hide');
            if(isHidden){
                guestsPopup.classList.remove('hide')
            }
    
            sumGuests(evt);
            clearInput(evt);
            applyInputValue(evt);
            checkNumberVisitors(numberVisitors, buttonMinus);
        };
        guests.addEventListener('click', handlerGuestsClick);

        const clearInput = (evt)=>{
            const hasValue = +inputGuests.value !== 0 && inputGuests.value !== '';
            if (hasValue){
                buttonClear.classList.remove('hide');
                buttonsContainer.style.justifyContent = 'space-between'
            } else {
                buttonClear.classList.add('hide');
                buttonsContainer.style.justifyContent = 'end'
            }
            if(evt.target === buttonClear){
                inputGuests.value = 0;
                guestsPopup.querySelectorAll('.guests__numberVisitors').forEach((value)=>{
                    value.textContent = '0'
                })
            }
        };

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

            const isAdultPlus = parentElement === wrapperAdult && evt.target === searchButtonPlus;
            const isAdultMinus = parentElement === wrapperAdult &&
              evt.target === searchButtonMinus && searchNumberVisitors.textContent > 0;
            const isChildrenPlus = parentElement === wrapperChildren && evt.target === searchButtonPlus
            const isChildrenMinus = parentElement === wrapperChildren &&
              evt.target === searchButtonMinus && searchNumberVisitors.textContent > 0;
            const isBabiesPlus = parentElement === wrapperBabies &&
              evt.target === searchButtonPlus;
            const isBabiesMinus = parentElement === wrapperBabies &&
              evt.target === searchButtonMinus && searchNumberVisitors.textContent > 0;
            if (isAdultPlus){
                increaseNumberVisitors();
                increaseVisitors();
            }else if (isAdultMinus){
                decreaseNumberVisitors();
                decreaseVisitors();
            }else if(isChildrenPlus){
                increaseNumberVisitors();
                increaseVisitors();
            }else if (isChildrenMinus){
                decreaseNumberVisitors();
                decreaseVisitors();
            }else if(isBabiesPlus){
                increaseNumberVisitors();
                increaseVisitors();
            }else if (isBabiesMinus){
                decreaseNumberVisitors();
                decreaseVisitors();
            }
        };

        const applyInputValue = (evt)=>{
            if (evt.target === buttonApply){
                evt.preventDefault();
                guestsPopup.classList.add('hide');
            }
        };
    }
};

const checkNumberVisitors = (number, buttonMinus)=>{
    number.forEach((value, index)=>{
        if(+value.textContent === 0){
            buttonMinus[index].style.opacity = '0.38'
        }else buttonMinus[index].style.opacity = '1'
    })
};

countGuests('.guests');

export {checkNumberVisitors, countGuests}



