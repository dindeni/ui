import {checkNumberVisitors} from "./sumGuests";

const rooms = document.querySelector('.rooms');
const roomsInput = rooms.querySelector('#rooms-input');
const roomsPopup = rooms.querySelector('#roomsPopup');
const badroomElement = document.querySelector('#rooms-wrapper-bedroom');
const numberVisitors = rooms.querySelectorAll('.guests__numberVisitors');
const buttonMinus = rooms.querySelectorAll('.rooms__button--minus');
const bedRoomsNumber = rooms.querySelector('#roomsNumber-bedroom');
const bedsNumber = rooms.querySelector('#roomsNumber-beds');
const bathroom = rooms.querySelector('#roomsNumber-bathroom');

roomsInput.value = '0 спальни, 0 кровати...';

document.addEventListener('click', (evt)=>{
    if (evt.target === roomsInput && roomsPopup.classList.contains('hide')){
        roomsPopup.classList.remove('hide');
        checkNumberVisitors(numberVisitors, buttonMinus);
        console.log(numberVisitors[0].textContent)
    }else if (evt.target === roomsInput && !roomsPopup.classList.contains('hide')){
        roomsPopup.classList.add('hide')
    }
});

roomsPopup.addEventListener('click', (evt)=>{

    let parentElement = evt.target.parentElement;
    let searchButtonPlus = parentElement.querySelector('.rooms__button--plus');
    let number = parentElement.querySelector('.guests__numberVisitors');
            if(evt.target === searchButtonPlus){
                number.textContent =+number.textContent+ 1
            }else if (number.textContent > 0){
                number.textContent =+number.textContent - 1;
            }
    checkNumberVisitors(numberVisitors, buttonMinus);

            roomsInput.value = `${bedRoomsNumber.textContent} спальни, ` +
                `${bedsNumber.textContent} кровати...`




});