const mainElement = document.querySelector('.main__background');
if (mainElement){
    const images = [require("../../img/image-back-1.jpg"),
        require("../../img/image-back-2.jpg"),
        require("../../img/image-back-3.jpg")];

    let count = 1;
    const interval = setInterval(()=> {
        if (count > 2){
            count = 0;
        }
        mainElement.classList.add('main__gallery');
        mainElement.src = images[count];
        setTimeout(()=>{
            mainElement.classList.remove('main__gallery');
        }, 4500);
        count++;
    }, 10000);
}



