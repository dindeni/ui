const countGuests = (classGuests) =>{
    if (document.querySelector(classGuests)){
        const guests = document.querySelector(classGuests);
        const buttonMinus = guests.querySelectorAll('.guests__button_minus');
        const numberVisitors = guests.querySelectorAll('.guests__number-of-visitors');
        const inputGuests = guests.querySelector('.input_dropdown');
        const guestsPopup = guests.querySelector('.guests__popup');
        const containerAdult = guests.querySelector('.guest__container_adult');
        const containerChildren = guests.querySelector('.guest__container_children');
        const containerBabies = guests.querySelector('.guest__container_babies');
        const buttonApply = guests.querySelector('.button_apply');
        const buttonClear = guests.querySelector('.button_clear');
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
                guestsPopup.querySelectorAll('.guests__number-of-visitors').forEach((value)=>{
                    value.textContent = '0'
                })
            }
        };

        const sumGuests = (evt)=>{
            let parentElement = evt.target.parentElement.parentElement;
            let searchButtonPlus = parentElement.querySelector(
                '.guests__button_plus');
            let searchButtonMinus = parentElement.querySelector(
                '.guests__button_minus');
            let searchNumberVisitors = parentElement.querySelector('.guests__number-of-visitors');


            const increaseVisitors = ()=> inputGuests.value = +inputGuests.value + 1;
            const decreaseVisitors = ()=> inputGuests.value = +inputGuests.value - 1;
            const increaseNumberVisitors = ()=>
                searchNumberVisitors.textContent = +searchNumberVisitors.textContent + 1;
            const decreaseNumberVisitors = ()=> searchNumberVisitors.textContent =
                +searchNumberVisitors.textContent - 1;

            const isAdultPlus = parentElement === containerAdult && evt.target === searchButtonPlus;
            const isAdultMinus = parentElement === containerAdult &&
              evt.target === searchButtonMinus && searchNumberVisitors.textContent > 0;
            const isChildrenPlus = parentElement === containerChildren && evt.target === searchButtonPlus
            const isChildrenMinus = parentElement === containerChildren &&
              evt.target === searchButtonMinus && searchNumberVisitors.textContent > 0;
            const isBabiesPlus = parentElement === containerBabies &&
              evt.target === searchButtonPlus;
            const isBabiesMinus = parentElement === containerBabies &&
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

if (document.querySelector('.rooms')){
    const rooms = document.querySelector('.rooms');
    const roomsInput = rooms.querySelector('.input_dropdown');
    const roomsPopup = rooms.querySelector('.rooms__popup');
    const numberVisitors = rooms.querySelectorAll('.rooms__number-of-visitors');
    const buttonMinus = rooms.querySelectorAll('.rooms__button_minus');
    const bedRoomsNumber = rooms.querySelector('.rooms__number-of-visitors_bedroom');
    const bedsNumber = rooms.querySelector('.rooms__number-of-visitors_beds');
    
    roomsInput.value = '0 спальни, 0 кровати...';
    
    const handlerDocumentClick = (evt)=>{
        if (evt.target === roomsInput && roomsPopup.classList.contains('hide')){
            roomsPopup.classList.remove('hide');
            checkNumberVisitors(numberVisitors, buttonMinus);
            console.log(numberVisitors[0].textContent)
        }else if (evt.target === roomsInput && !roomsPopup.classList.contains('hide')){
            roomsPopup.classList.add('hide')
        }
    };
    document.addEventListener('click', handlerDocumentClick);
    
    const handlerRoomsClick = (evt)=>{
        let parentElement = evt.target.parentElement;
        let searchButtonPlus = parentElement.querySelector('.rooms__button_plus');
        let number = parentElement.querySelector('.rooms__number-of-visitors');
        if(evt.target === searchButtonPlus){
            number.textContent =+number.textContent+ 1
        }else if (number.textContent > 0){
            number.textContent =+number.textContent - 1;
        }
        checkNumberVisitors(numberVisitors, buttonMinus);
        
        roomsInput.value = `${bedRoomsNumber.textContent} спальни, ` +
          `${bedsNumber.textContent} кровати...`
    };
    
    roomsPopup.addEventListener('click', handlerRoomsClick);
}

const checkNumberVisitors = (number, buttonMinus)=>{
    number.forEach((value, index)=>{
        if(+value.textContent === 0){
            buttonMinus[index].style.opacity = '0.38'
        }else buttonMinus[index].style.opacity = '1'
    })
};

countGuests('.guests');

export {checkNumberVisitors, countGuests}



