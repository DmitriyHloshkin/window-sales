const arrowUp = () => {
  const arrowUp = document.querySelector('.arrow-up');

  window.addEventListener('scroll', () => {
    const viewWindow = document.documentElement.clientHeight,
          allWindow = document.documentElement.scrollHeight,
          scrolling = document.documentElement.scrollTop;
          
    if (allWindow - scrolling <= viewWindow + 500 ){
      arrowUp.style.visibility = 'visible';
    } else {
      arrowUp.style.visibility = 'hidden';
    }
  });

  arrowUp.addEventListener('click', e => {
    e.preventDefault();
    document.documentElement.scrollTop = 0;
  });
  
};

export default arrowUp;