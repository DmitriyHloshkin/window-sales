const tabs = () => {
  function tabsInit(selectorTabs, selectorTabContents, activClass) {
    const tabs = document.querySelectorAll(selectorTabs),
          tabsContent = document.querySelectorAll(selectorTabContents);

    tabsContent.forEach(elem => elem.classList.add('animated'));

    tabs.forEach((elem, index) => {
      if (index === 0) {
        hideTabs();
        showTabs(elem, tabsContent[index]);
      }

      elem.addEventListener('click', e => {
        hideTabs();
        showTabs(elem, tabsContent[index]);
      });
    });

    function showTabs(tabsElem, content) {

      if (tabsElem.querySelector('a')) tabsElem.querySelector('a').classList.add(activClass);

      tabsElem.classList.add(activClass);
      content.style.display = 'block';
      content.classList.add('fadeIn');
      content.classList.remove('fadeOut');
    }

    function hideTabs() {
      tabs.forEach(elem => {
        elem.classList.remove(activClass);
        if (elem.querySelector('a')) elem.querySelector('a').classList.remove(activClass);

      });

      tabsContent.forEach(elem => {
        elem.style.display = 'none';
        elem.classList.remove('fadeIn');
        elem.classList.add('fadeOut');
      });
    }

  }

  tabsInit('.glazing_slider .slick-slide:not(.slick-cloned)', '.glazing_content', 'active');
  tabsInit('.decoration_slider .slick-slide:not(.slick-cloned) [data-tabs-decor-link]', '.decoration_content__item', 'after_click');
};

export default tabs;