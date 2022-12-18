const gallery = () => {
  function initGallery({ selectorImg }) {
    const images = document.querySelectorAll(selectorImg);

    images.forEach(img => {
      img.addEventListener('click', e => {
        e.preventDefault();
        const imgSrc = img.getAttribute('src');

        const wrap = createWrap(),
          bigImg = createImg(imgSrc);

        wrap.append(bigImg);
        document.documentElement.append(wrap);
        document.documentElement.style.overflow = 'hidden';


      });
    });

    function createWrap() {
      const wrap = document.createElement('div');

      wrap.classList.add('wrap-gallery-item', 'animated', 'fadeIn');
      wrap.style.cssText = `position: fixed;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            z-index: 9;
                            background-color: rgba(0, 0, 0, .9);`;


      wrap.addEventListener('click', e => {
        if (e.target && !e.target.matches('img')) {
          wrap.classList.remove('fadeIn');
          wrap.classList.add('fadeOut');
          document.documentElement.style.overflow = '';

          let duration = window.getComputedStyle(wrap).animationDuration;
          duration = +duration.replace(/\D/, '');
          duration = duration === 0 ? 0 : duration * 1000;

          setTimeout(() => wrap.remove(), duration / 2);
        }
      });

      return wrap;
    }

    function createImg(imgSrc) {
      const img = document.createElement('img');

      img.classList.add('img-gallery-item');

      img.setAttribute('src', imgSrc);
      img.style.cssText = `position: fixed;
                          top: 50%;
                          left: 50%;
                          transform: translateX(-50%) translateY(-50%);`;
      return img;
    }

  }

  initGallery({
    selectorImg: '.preview',
  });
};

export default gallery;