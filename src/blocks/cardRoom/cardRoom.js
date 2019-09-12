document.querySelectorAll('.card-room').forEach((value)=>{
    const input = value.querySelectorAll('.card-room__radio');
    input[0].checked = true
});

let imageCount = 0;

const handleFormChange = (evt, form)=>{
    if (evt.currentTarget === form){
        const cardImages = evt.currentTarget.parentElement.querySelectorAll('.card-room__image');
        form.querySelectorAll('.card-room__radio').
        forEach((input, index)=>{
            if (evt.target === input){
                input.parentElement.style.background = '#FFFFFF';
                cardImages[index].classList.remove('card-room__image_hide');
                if (imageCount !== index){
                    cardImages[imageCount].classList.add('card-room__image_hide');
                }
                imageCount = index;
                
            }else if (evt.currentTarget === input.parentElement.parentElement){
                input.parentElement.style.background = 'none';
                cardImages[index].classList.add('card-room__image_hide');
            }
            
        });
        
    }
};

document.querySelectorAll('.card-room__form').forEach((form)=>{
    form.addEventListener('change', (evt)=>handleFormChange(evt, form));
});

const handleRoomsClick = (evt, cardRoom)=>{
    const prev = cardRoom.querySelector('.card-room__button_prev');
    const next = cardRoom.querySelector('.card-room__button_next');
    const images = cardRoom.querySelectorAll('.card-room__image');
    const inputs = cardRoom.querySelectorAll('.card-room__radio');
    
    if (evt.target === prev){
        for (let i=0; i < inputs.length; i++){
            const isInputFirst = inputs[i].checked && inputs[i] === inputs[0];
            if(isInputFirst){
                images[i].classList.add('cardRoom__image_hide');
                images[inputs.length-1].classList.remove('card-room__image_hide');
                inputs[inputs.length-1].checked = true;
                inputs[i].parentElement.style.background = 'none';
                return inputs[inputs.length-1].parentElement.style.background = '#FFFFFF';
                
            }else if (inputs[i].checked){
                inputs[i].parentElement.style.background = 'none';
                inputs[i-1].parentElement.style.background = '#FFFFFF';
                images[i].classList.add('card-room__image_hide');
                images[i-1].classList.remove('card-room__image_hide');
                return inputs[i-1].checked = true;
            }
        }
    }
    
    if (evt.target === next){
        for (let i=0; i < inputs.length; i++){
            const isInputLast = inputs[i].checked && inputs[i] === inputs[inputs.length-1];
            if(isInputLast){
                images[i].classList.add('card-room__image_hide');
                images[0].classList.remove('card-room__image_hide');
                inputs[0].checked = true;
                inputs[i].parentElement.style.background = 'none';
                return inputs[0].parentElement.style.background = '#FFFFFF';
                
            }else if (inputs[i].checked){
                images[i].classList.add('card-room__image_hide');
                images[i+1].classList.remove('card-room__image_hide');
                inputs[i+1].checked = true;
                inputs[i].parentElement.style.background = 'none';
                return inputs[i+1].parentElement.style.background = '#FFFFFF';
            }
        }
        
    }
};

document.querySelectorAll('.card-room').forEach((cardRoom)=>{
   cardRoom.addEventListener('click', (evt) => handleRoomsClick(evt, cardRoom));
});