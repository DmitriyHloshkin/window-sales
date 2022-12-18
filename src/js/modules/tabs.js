const tabs = () => {
  function tabsInit(selectorTabs, selectorTabContents, activClass) {
    const tabs = document.querySelectorAll(selectorTabs),
          tabsContent = document.querySelectorAll(selectorTabContents);

    tabsContent.forEach(elem => elem.classList.add('animated'));

    tabs.forEach((elem, index) => {
      if (index === 0) {
        hideTabs();
        showTabs(elem);
      }

      elem.addEventListener('click', e => {
        hideTabs();
        showTabs(elem);
      });
    });

    function showTabs(tabsElem) {
      if (tabsElem.querySelector('.glazing_block a')) tabsElem.querySelector('.glazing_block a').classList.add(activClass);
      tabsElem.classList.add(activClass);
      
      const typeMaterial = tabsElem.getAttribute('data-content-class');

      tabsContent.forEach( elem => {      
        if (elem.matches(`.${typeMaterial}`)) {
          elem.style.display = 'block';
          elem.classList.add('fadeIn');
          elem.classList.remove('fadeOut');
        }
      });
    }

    function hideTabs() {
      tabs.forEach(elem => {
        document.querySelectorAll(`.${activClass}`).forEach( elem => {
          elem.classList.remove(activClass);
          if (elem.querySelector('a')) elem.querySelector('a').blur();
        });
      });

      tabsContent.forEach(elem => {
        elem.style.display = 'none';
        elem.classList.remove('fadeIn');
        elem.classList.add('fadeOut');
      });
    }

  }

  tabsInit('.glazing_slider .slick-active .glazing_block', '.glazing_content', 'active');
  tabsInit('.decoration_slider .slick-active [data-tabs-decor-link]', '.decoration_content__item', 'after_click');
  tabsInit('.balcon_icons_img', '.big_img img', 'do_image_more');

};

export default tabs;