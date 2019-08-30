document.querySelectorAll('.cardRoom').forEach((value)=>{
    const input = value.querySelectorAll('.cardRoom__radio');
    input[0].checked = true
});

let imageCount = 0;

const handleFormChange = (evt, form)=>{
    const cardImages = evt.target.parentElement.parentElement.querySelectorAll('.cardRoom__image');
    if (evt.target.parentElement === form){
        form.querySelectorAll('.cardRoom__radio').
        forEach((input, index)=>{
            if (evt.target === input){
                input.nextSibling.style.background = '#FFFFFF';
                cardImages[index].classList.remove('hide');
                if (imageCount !== index){
                    cardImages[imageCount].classList.add('hide');
                }
                imageCount = index;
                
            }else if (evt.target.parentElement === input.parentElement){
                input.nextSibling.style.background = 'none';
                cardImages[index].classList.add('hide');
            }
            
        });
        
    }
};

document.querySelectorAll('.cardRoom__form').forEach((form)=>{
    form.addEventListener('change', (evt)=>handleFormChange(evt, form));
});

const handleRoomsClick = (evt, cardRoom)=>{
    const prev = cardRoom.querySelector('.cardRoom__button--prev');
    const next = cardRoom.querySelector('.cardRoom__button--next');
    const images = cardRoom.querySelectorAll('.cardRoom__image');
    const inputs = cardRoom.querySelectorAll('.cardRoom__radio');
    
    if (evt.target === prev){
        for (let i=0; i < inputs.length; i++){
            const isInputFirst = inputs[i].checked && inputs[i] === inputs[0];
            if(isInputFirst){
                images[i].classList.add('hide');
                images[inputs.length-1].classList.remove('hide');
                inputs[inputs.length-1].checked = true;
                inputs[i].nextSibling.style.background = 'none';
                return inputs[inputs.length-1].nextSibling.style.background = '#FFFFFF';
                
            }else if (inputs[i].checked){
                inputs[i].nextSibling.style.background = 'none';
                inputs[i-1].nextSibling.style.background = '#FFFFFF';
                images[i].classList.add('hide');
                images[i-1].classList.remove('hide');
                return inputs[i-1].checked = true;
            }
        }
    }
    
    if (evt.target === next){
        for (let i=0; i < inputs.length; i++){
            const isInputLast = inputs[i].checked && inputs[i] === inputs[inputs.length-1];
            if(isInputLast){
                images[i].classList.add('hide');
                images[0].classList.remove('hide');
                inputs[0].checked = true;
                inputs[i].nextSibling.style.background = 'none';
                return inputs[0].nextSibling.style.background = '#FFFFFF';
                
            }else if (inputs[i].checked){
                images[i].classList.add('hide');
                images[i+1].classList.remove('hide');
                inputs[i+1].checked = true;
                inputs[i].nextSibling.style.background = 'none';
                return inputs[i+1].nextSibling.style.background = '#FFFFFF';
            }
        }
        
    }
};

document.querySelectorAll('.cardRoom').forEach((cardRoom)=>{
   cardRoom.addEventListener('click', (evt) => handleRoomsClick(evt, cardRoom));
});