const countGuests = (classGuests) =>{
    if (document.querySelector(classGuests)){
        console.log(classGuests);
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

        guests.addEventListener('click', (evt)=>{
            if(evt.target === inputGuests && guestsPopup.classList.contains('hide')){
                guestsPopup.classList.remove('hide')
            }

            sumGuests(evt);
            clearInput(evt);
            applyInputValue(evt);
            checkNumberVisitors(numberVisitors, buttonMinus);

        });

        const clearInput = (evt)=>{
            // add or remove clear button
            if (+inputGuests.value !== 0 && inputGuests.value !== ''){
                buttonClear.classList.remove('hide');
                buttonsContainer.style.justifyContent = 'space-between'
            } else {
                buttonClear.classList.add('hide');
                buttonsContainer.style.justifyContent = 'end'
            }
            if(evt.target === buttonClear){
                inputGuests.value = 0;
                guestsPopup.querySelectorAll('.guests__numberVisitors').forEach((value)=>{
                    value.textContent = 0
                })
            }
        };

        const sumGuests = (evt, input)=>{
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

        const applyInputValue = (evt)=>{
            if (evt.target === buttonApply){
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



