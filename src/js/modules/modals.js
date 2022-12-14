const modals = () => {

  function modalInit({ modalSelector, triggerSelector, closeModalSelector, timerIdOpenModal, btnSend }) {
    const modalTriger = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector),
          btnsSend = document.querySelectorAll(btnSend),
          closeTrigger = modal.querySelector(closeModalSelector);

    modal.classList.add('animated');

    modalTriger?.forEach( trigerElem => {
      trigerElem.addEventListener('click', e => {
        e.preventDefault();
        if (e.target) {
          showModal(modal, timerIdOpenModal); 
        }
      });
    });

    closeTrigger?.addEventListener('click', e => {
      closeModal(modal); 
    });

    modal.addEventListener('click', e => {
      if (e.target === modal) {
        closeModal(modal); 
      }
    });

    btnsSend.forEach( elem => {
      elem.addEventListener('click', () => {
        clearInterval(timerIdOpenModal);
      });
    });
    
  }

  function showModalByTime(selector, time) {
    const timerId = setTimeout( () => {
      showModal(document.querySelector(selector), timerId);
    }, time);

    return timerId;
  }

  let idTimer = showModalByTime('.popup', 60000);

  modalInit({
    modalSelector: '.popup_engineer', 
    triggerSelector: '.popup_engineer_btn', 
    closeModalSelector: '.popup_close', 
    timerIdOpenModal: idTimer,
    btnSend: '[name="submit"]',
  });

  modalInit({
    modalSelector: '.popup', 
    triggerSelector: '.phone_link', 
    closeModalSelector: '.popup_close', 
    timerIdOpenModal: idTimer,
    btnSend: '[name="submit"]',
  });

  modalInit({
    modalSelector: '.popup_send', 
    closeModalSelector: '.popup_close', 
    timerIdOpenModal: idTimer,
    btnSend: '[name="submit"]',
  });

};

function clearForm(form) {
  if (!form) return;
  form.reset();

  const massage = form.querySelectorAll('.validation-massage-phone');
  massage?.forEach((elem) => {
    elem.remove();
  });
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

function showModal(modal, idTimer = null) {
  clearForm(modal.querySelector('form'));

  modal.classList.add('show-modal', 'fadeIn');
  modal.classList.remove('fadeOut');
  document.documentElement.style.overflow = 'hidden';
  clearInterval(idTimer);
}

export default modals;
export { closeModal, showModal };