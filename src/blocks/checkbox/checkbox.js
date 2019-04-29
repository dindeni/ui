const checkboxHead = document.querySelector('#checkbox-head');
const checkboxWrapper = document.querySelector('#checkbox-expandable-wrapper');

checkboxHead.addEventListener('click', (evt)=>{
    if (evt.target === checkboxHead && !checkboxWrapper.classList.contains('hide')){
        checkboxWrapper.classList.add('hide');
        checkboxHead.style.setProperty('--rotate', 'rotate(0deg)');
    }else if(evt.target === checkboxHead && checkboxWrapper.classList.contains('hide')){
        checkboxWrapper.classList.remove('hide');
        checkboxHead.style.setProperty('--rotate', 'rotate(180deg)');
        console.log('remove')
    }
});