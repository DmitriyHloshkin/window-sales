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
      if (e.target === modal && 
        !modal.matches('[data-popup-type="calc"]')) {
          
        closeModal(modal); 
      }
    });

    btnsSend?.forEach( elem => {
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

  modalInit({
    modalSelector: '.popup_calc', 
    closeModalSelector: '.popup_calc_close',
    triggerSelector: '.popup_calc_btn', 
    timerIdOpenModal: idTimer,
  });

  modalInit({
    modalSelector: '.popup_calc_profile', 
    closeModalSelector: '.popup_calc_profile_close', 
    timerIdOpenModal: idTimer,
  });
  
  modalInit({
    modalSelector: '.popup_calc_end', 
    closeModalSelector: '.popup_calc_end_close', 
    timerIdOpenModal: idTimer,
  });

};

function clearForm(form) {
  if (!form) return;
  form.reset();

  const massage = form.querySelectorAll('.validation-massage');
  massage?.forEach((elem) => {
    elem.remove();
  });
}

function closeModal(modal) {
  if (modal.querySelector('.popup_content')) {
    const elem = modal.querySelector('.popup_content');
    const currentLeftPosition = window.getComputedStyle(elem).getPropertyValue('left');
    modal.querySelector('.popup_content').style.left = currentLeftPosition;
  }

  modal.classList.remove('fadeIn');
  modal.classList.add('fadeOut');

  const duration = calcDurationAnim(modal);
  document.body.style.overflow = '';
  document.body.style.marginRight = '';

  setTimeout(() => modal.classList.remove('show-modal'), duration / 2);

}

function showModal(modal, idTimer = null) {
  
  clearForm(modal.querySelector('form'));
  clearCalcForm();
  clearCalcProfileForm(); 

  if (modal.querySelector('.popup_content')) {
    modal.querySelector('.popup_content').removeAttribute('style');
  }

  modal.classList.add('fadeIn','show-modal');
  modal.classList.remove('fadeOut');

  document.body.style.overflow = 'hidden';
  document.body.style.marginRight = `${calcWithScroll()}px`;

  clearInterval(idTimer);
}

function clearCalcForm() {
  document.querySelectorAll('[data-form-calc]').forEach( elem => elem.value = '');
}

function clearCalcProfileForm() {
  document.querySelectorAll('input[name="checkbox-test"]').forEach( elem => elem.checked = false);
}

function calcDurationAnim(modal) {
  let duration = window.getComputedStyle(modal).animationDuration;
      duration = +duration.replace(/\D/, '');
      duration = duration === 0 ? 0 : duration * 1000;

  return duration;
}

export function calcWithScroll() {
  let div = document.createElement('div');

  div.style.width = '50px';
  div.style.height = '50px';
  div.style.overflowY = 'scroll';
  div.style.visibility = 'hidden';

  document.body.appendChild(div);
  let scrollWidth = div.offsetWidth - div.clientWidth;
  div.remove();

  return scrollWidth;
}

export default modals;
export { closeModal, showModal };