class MainIndex {
  constructor(mainElement) {
    this.mainElement = mainElement;
  }

  changeBackground() {
    /* eslint-disable global-require */
    if (this.mainElement) {
      const images = [require('../../img/image-back-1.jpg'),
        require('../../img/image-back-2.jpg'),
        require('../../img/image-back-3.jpg')];

      let count = 1;
      setInterval(() => {
        if (count > 2) {
          count = 0;
        }
        this.mainElement.classList.add('main-index__gallery');
        this.mainElement.src = images[count];
        setTimeout(() => {
          this.mainElement.classList.remove('main-index__gallery');
        }, 4500);
        count += 1;
      }, 10000);
    }
  }
}

export default MainIndex;
