const modals = () => {

  function modalInit(modalSelector, triggerSelector, closeModalSelector) {
    const modalTriger = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector),
          closeTrigger = modal.querySelector(closeModalSelector);

    modal.classList.add('animated');

    modalTriger.forEach( trigerElem => {
      trigerElem.addEventListener('click', e => {
        e.preventDefault();
        if (e.target) {
          showModal(modal); 
        }
      });
    });

    closeTrigger.addEventListener('click', e => {
      closeModal(modal); 
    });

    modal.addEventListener('click', e => {
      if (e.target === modal) {
        closeModal(modal); 
      }
    });

  }

  function showModal(modal) {
    clearForm(modal.querySelector('form'));

    modal.classList.add('show-modal', 'fadeIn');
    modal.classList.remove('fadeOut');
    document.documentElement.style.overflow = 'hidden';
    clearInterval(idTimer);
  }

  function closeModal(modal) {
    modal.classList.remove('fadeIn');
    modal.classList.add('fadeOut');
    document.documentElement.style.overflow = '';
    
    let duration = window.getComputedStyle(modal).animationDuration;
        duration = +duration.replace(/\D/, '');
        duration = duration === 0 ? 0 : duration * 1000;
        
    setTimeout(() => modal.classList.remove('show-modal'), duration);
  }

  const showModalByTime = (selector, time) => {
    return setTimeout( () => {
      showModal(document.querySelector(selector));
    }, time);
  };

  function clearForm(form) {
    if (!form) return;
    form.reset();

    const massage = form.querySelectorAll('.validation-massage-phone');
    massage.forEach((elem) => {
      elem.remove();
    });
  }

  let idTimer = showModalByTime('.popup', 60000);

  modalInit('.popup_engineer', '.popup_engineer_btn', '.popup_close');
  modalInit('.popup', '.phone_link', '.popup_close');

};

export default modals;