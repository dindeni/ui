const mainElement = document.querySelector('.main__background');

const images = ["../../img/image-back-1.png", "../../img/image-back-2.png",
    "../../img/image-back-3.png"];

let count = 1;
const interval = setInterval(()=> {
    if (count > 2){
        count = 0;
    }
    mainElement.classList.add('main__gallery');
    mainElement.style.background = `url(${images[count]}) no-repeat`;
    setTimeout(()=>{
        mainElement.classList.remove('main__gallery');
    }, 4500);
    count++;
}, 10000);

