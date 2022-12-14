import { showModal, closeModal } from './modals.js';

const forms = () => {

  const resultData = {};

  function callbackFormsInit({ formsSelector, phoneSelector, nameSelector }) {
    const forms = document.querySelectorAll(formsSelector);

    forms.forEach( (form) => {
      const inputPhone = form.querySelector(phoneSelector),
            inputName = form.querySelector(nameSelector);

      validationPhone(inputPhone);
      inputName.addEventListener('input', (e) => deleteMessage(e.target, `validation-massage__name`));


      form.addEventListener('submit',(e) => submitForm(e, inputName, inputPhone));

    });

    function validationPhone(inputPhone) {
      if (!inputPhone ) return;

      inputPhone.addEventListener('input', e => {
        const value = e.target.value;
        
        let massage = getMassagePhone(value);
        showMassage({
          ...massage, 
          input: inputPhone, 
          messageClass: 'validation-massage',
          inputTypeSelector: 'validation-massage__phone',
        });

      });
    }

    function checkValidForm(valName, valPhone) {
      const dataValid = {
        name : {
                valid: true,
                text: '',
                validClass: 'validation-massage_no_valid',
                messageClass: 'validation-massage', 
                inputTypeSelector: 'validation-massage__name',
                emptyValue: false, 
        },
        phone: {
                valid: true,
                text: '',
                validClass: 'validation-massage_no_valid',
                messageClass: 'validation-massage',
                inputTypeSelector: 'validation-massage__phone' ,
                emptyValue: false, 
        }
    };

      if (valPhone.match(/\D/)) {
        dataValid.phone.valid = false;
        dataValid.phone.text = 'данные не корректны';
      } else {
        if (valPhone.length < 10 || valPhone.length > 12) {
          dataValid.phone.valid = false;
          dataValid.phone.text = 'количество цифр не верно';
        }
      }

      if (!valName) {
        dataValid.name.valid = false;
        dataValid.name.text = 'введите имя';
      }

      return dataValid;

    }

    function getMassagePhone(valuePhone) {
      const result = {
        text: '',
        validClass: 'validation-massage_valid',
        emptyValue: !valuePhone,
      };

      const valueCorrect = !valuePhone.match(/\D/);

      if(!valueCorrect) {
        result.text = 'данные не корректны';
        result.validClass = 'validation-massage_no_valid';
      }

      return result;

    }

    function showMassage( {text , validClass, emptyValue,  input, messageClass, inputTypeSelector} ) {
      deleteMessage(input, inputTypeSelector);
      if (emptyValue) return;

      const elemMessage = document.createElement('div');
      elemMessage.classList.add(inputTypeSelector, validClass, messageClass);
      elemMessage.textContent = text;

      input.after(elemMessage);
    }

    function submitForm(e, inputName, inputPhone) {
      e.preventDefault();
      const form = e.target,
            name = inputName.value,
            phone = inputPhone.value;

      if (noValidIsShowing(form)) return;
      
      const validDate = checkValidForm(name, phone);
      let formValid = true;

      Object.keys(validDate).forEach( (key) => {
        const valid = validDate[key].valid,
              data = validDate[key];

        let input;

        switch (key) {
          case ('name'):
            input = inputName;
            break;

          case ('phone'):
            input = inputPhone;
            break;
        }

        if (!valid) {
          formValid = false;
          showMassage({...data, input});
        }

      } );

      if (formValid) sendData(form, 'json');

    }

    function deleteMessage(input, inputTypeSelector) {
      const parent = input.parentElement;
      let elemMessage = parent.querySelector(`.${inputTypeSelector}`);
      if(elemMessage) parent.querySelector(`.${inputTypeSelector}`).remove();
    }

    function noValidIsShowing(form) {
      let validMessages = form.querySelectorAll('.validation-massage_no_valid');
          validMessages = validMessages ? Array.from(validMessages) : [];

      let noValidShow = false;
      for (let massageElem of validMessages) {
        noValidShow = true;
        showNoValidAnimation(massageElem);
      }

      return noValidShow;
    }
  }

  function calcForms({calcFormProfileSelector, calcFormProfileContentSelector, calcFormProfileEndSelector}) {
    const calcModal = document.querySelector(calcFormProfileSelector),
          calclProfile = document.querySelector(calcFormProfileContentSelector),
          calcEnd = document.querySelector(calcFormProfileEndSelector);

    function initCalcModal({ triggerSelector }) {
      const widthWindow = document.querySelector('#width'),
            heigthWindow = document.querySelector('#height'),
            btnNext = document.querySelectorAll(triggerSelector);
  
      validationInput(widthWindow, heigthWindow);
  
      btnNext.forEach( btnCalc => {
        btnCalc.addEventListener('click', () => {
          let isValidInput = true;
  
          if (!widthWindow.value) {
            showNoValidAnimation(widthWindow);
            isValidInput = false;
          }
  
          if (!heigthWindow.value) {
            showNoValidAnimation(heigthWindow);
            isValidInput = false;
          }
  
          if (!isValidInput) return;
  
          resultData.height = heigthWindow.value;
          resultData.width = heigthWindow.value;
          resultData.view = document.querySelector('.do_image_more img').getAttribute('alt') || '';

          closeModal(calcModal);
          showModal(calclProfile);
        });
      });
  
      function validationInput(...inputs) {
        inputs.forEach( (input) => input.addEventListener('input', () => input.value = input.value.replace(/\D/, '')));
      }
    }

    function initCalcProfile() {
      const checkboks = calclProfile.querySelectorAll('input[name="checkbox-test"]'),
            btnNext = calclProfile.querySelector('.popup_calc_profile_button');

      checkboks.forEach( ckeckbox => {
        ckeckbox.addEventListener('input', e => {
            if (e.target.checked) {
              checkboks.forEach( elem => {
                if (e.target !== elem) {
                  elem.checked = false;
                }
              });
            }
        });
      });

      btnNext.addEventListener('click', () => {
        const arrCheckboks = Array.from(checkboks);

        if ( !arrCheckboks.some(elem => elem.checked) ) {
          checkboks.forEach( elem => {
            showNoValidAnimation(elem.parentElement);
          });
          return;
        }

        
        const checkedElem = arrCheckboks.find(elem => {
          return elem.checked;
        });

        resultData.profile = checkedElem.parentElement.querySelector('.checkbox-custom').getAttribute('id');
        resultData.type = document.querySelector('#view_type').value;

        closeModal(calclProfile);
        showModal(calcEnd);

      });



    }

    initCalcModal({
      triggerSelector: '.popup_calc_button',
    });

    initCalcProfile();

  }

  function showNoValidAnimation(elem) {
    const transformValue = window.getComputedStyle(elem, null).getPropertyValue("transform"),
          startTransleteStyleElem = transformValue === 'none' ? '' : transformValue;
    
    const keyFrames = [
      {transform: `translate3d(0, 0, 0) ${startTransleteStyleElem}`},
      {transform: `translate3d(-5px, 0, 0) ${startTransleteStyleElem}`},
      {transform: `translate3d(5px, 0, 0) ${startTransleteStyleElem}`},
      {transform: `translate3d(-5px, 0, 0) ${startTransleteStyleElem}`},
      {transform: `translate3d(5px, 0, 0) ${startTransleteStyleElem}`},
      {transform: `translate3d(-5px, 0, 0) ${startTransleteStyleElem}`},
      {transform: `translate3d(5px, 0, 0) ${startTransleteStyleElem}`},
      {transform: `translate3d(-5px, 0, 0) ${startTransleteStyleElem}`},
      {transform: `translate3d(5px, 0, 0) ${startTransleteStyleElem}`},
      {transform: `translate3d(-5px, 0, 0) ${startTransleteStyleElem}`},
      {transform: `translate3d(5px, 0, 0) ${startTransleteStyleElem}`},
      {transform: `translate3d(0, 0, 0) ${startTransleteStyleElem}`}
    ];
    elem.animate(keyFrames, 2000);
  }

  function clearResultData(resultData) {
    for (let key in resultData) {
      resultData[key] = '';
    }
  }

  async function sendData(form, bodyType = 'json') {
      
    const url = "https://jsonplaceholder.typicode.com/posts";
    let body, content;

    switch (bodyType) {
      case 'json': 
        body = JSON.stringify({...Object.fromEntries(new FormData(form)), ...resultData});
        content = 'application/json; charset=UTF-8';
        break;

      case 'FormData': 
        const formData = new FormData(form);
        for (let key in resultData) {
          formData.append(key, resultData[key]);
        }

        body = formData;
        content = 'multipart/form-data';
        break;
    }

    const headers = new Headers();
          headers.append('content-type',content);
          
    const request = new Request(url, {
            headers: headers,
            method: 'POST',
            body: body,
          });

    showLoader(form);

    try {
      const response = await fetch(request),
            saveDate = await response.json();

      processingResult.call(saveDate, true);

    } catch(e) {
      processingResult(false);

    } finally {
      closeLoader(form);
      clearResultData(resultData);
      form.reset();
    }
      
    function processingResult(isSuccess) {
      const openModals = document.querySelectorAll('.show-modal'),
            modalSendsResult = document.querySelector('.popup_send'),
            popupFormElem = modalSendsResult.querySelector('.popup_form');

      let successBlock = modalSendsResult.querySelector('.popup__img');
          successBlock?.remove();

      openModals.forEach( elem => {
        closeModal(elem);
      });

      const title = modalSendsResult.querySelector('h1'),
            subTitle = modalSendsResult.querySelector('h2');

      title.innerHTML = isSuccess && this ? `Заявка успешно принята <span class="popup_form_info">${this.user_name}</span>!` 
                                          : 'Что-то пошло не так :\\';
                                          
      subTitle.innerHTML = isSuccess ? `Мы свяжемся с вами по номеру <span class="popup_form_info">${this.user_phone}</span>!` 
                                      : 'Попробуйте оставить заявку позже';

      if (isSuccess) {
        successBlock = document.createElement('div');

        successBlock.classList.add('popup__img');
        successBlock.innerHTML = `<img class="" src="./img/main/icons/check-solid.svg" alt="success">`;
        popupFormElem.append(successBlock);
      }

      showModal(modalSendsResult);
    }

    function showLoader(form) {
      const loader = form.querySelector('.loader');
      if (loader) loader.style.display = 'block';
    }

    function closeLoader(form) {
      const loader = form.querySelector('.loader');
      if (loader) loader.style.display = '';
    }
  }

  callbackFormsInit({
    formsSelector: '[data-type-form="callback"]',
    phoneSelector: '[name="user_phone"]',
    nameSelector: '[name="user_name"]'
  });
  
  calcForms({
    calcFormProfileSelector: '.popup_calc',
    calcFormProfileContentSelector: '.popup_calc_profile',
    calcFormProfileEndSelector: '.popup_calc_end',
  });

};

export default forms;