class MainIndex {
  constructor(mainElement) {
    this.mainElement = mainElement;
    this.backgroundElement = this.mainElement.querySelector('.js-main-index__background');
  }

  changeBackground() {
    /* eslint-disable global-require */
    if (this.backgroundElement) {
      const images = [
        require('../../images/image-back-1.jpg'),
        require('../../images/image-back-2.jpg'),
        require('../../images/image-back-3.jpg'),
      ];

      let count = 1;
      setInterval(() => {
        if (count > 2) {
          count = 0;
        }
        this.backgroundElement.classList.add('main-index__background_theme_gallery');
        this.backgroundElement.src = images[count];
        setTimeout(() => {
          this.backgroundElement.classList.remove('main-index__background_theme_gallery');
        }, 4500);
        count += 1;
      }, 10000);
    }
  }
}

export default MainIndex;
