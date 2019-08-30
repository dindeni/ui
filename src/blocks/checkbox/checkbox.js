const checkboxHead = document.querySelector('#checkbox-head');
const checkboxWrapper = document.querySelector('#checkbox-expandable-wrapper');

const handlerCheckboxClick = (evt) => {
    const isNotHide = evt.target === checkboxHead && !checkboxWrapper.classList.contains('hide');
    const isHide = evt.target === checkboxHead && checkboxWrapper.classList.contains('hide');
    if (isNotHide){
        checkboxWrapper.classList.add('hide');
        checkboxHead.style.setProperty('--rotate', 'rotate(0deg)');
    }else if(isHide){
        checkboxWrapper.classList.remove('hide');
        checkboxHead.style.setProperty('--rotate', 'rotate(180deg)');
    }
};

if (checkboxHead){
    checkboxHead.addEventListener('click', handlerCheckboxClick);
}

