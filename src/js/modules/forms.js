import { showModal, closeModal } from './modals.js';

const forms = () => {
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

    async function sendData(form, bodyType) {
      const url = "https://jsonplaceholder.typicode.com/posts/1";
      let body;

      
      
      switch (bodyType) {
        case 'json': 
          body = JSON.stringify(Object.fromEntries(new FormData(form)));
          break;

        case 'FormData': 
          body = new FormData(form);
          break;

        default: 
          body = JSON.stringify(Object.fromEntries(new FormData(form)));
      }

      const headers = new Headers();
            headers.append('content-type', 'multipart/form-data');
            


      const request = new Request(url, {
              headers: headers,
              method: 'post',
              body: body,
            });

      showLoader(form);      
      const response = await fetch(request);
      closeLoader(form);
      form.reset();
debugger
      let isSuccess = response.status >= 200 && response.status < 300 ? true : false;
      
      processingResult(isSuccess);

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

        title.textContent = isSuccess ? 'Заявка успешно принята!' : 'Что-то пошло не так :\\';
        subTitle.textContent = isSuccess ? 'Мы свяжемся с вами!' : 'Попробуйте оставить заявку позже';

        if (isSuccess) {
          successBlock = document.createElement('div');

          successBlock.classList.add('popup__img');
          successBlock.innerHTML = `<img class="" src="./img/main/icons/check-solid.svg" alt="success">`;
          popupFormElem.append(successBlock);
        }

        showModal(modalSendsResult);
      }
    }

    function showLoader(form) {
      const loader = form.querySelector('.loader');
      if (loader) loader.style.display = 'block';
    }

    function closeLoader(form) {
      const loader = form.querySelector('.loader');
      if (loader) loader.style.display = '';
    }
    function noValidIsShowing(form) {
      let validMessages = form.querySelectorAll('.validation-massage_no_valid');
          validMessages = validMessages ? Array.from(validMessages) : [];

      let noValidShow = false;
      for (let massageElem of validMessages) {
        noValidShow = true;
        const startTransleteStyleElem = window.getComputedStyle(massageElem, null).getPropertyValue("transform");

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

        let animateMessage = massageElem.animate(keyFrames, 2000);
      }

      return noValidShow;
    }
  }

  callbackFormsInit({
    formsSelector: '[data-type-form="callback"]',
    phoneSelector: '[name="user_phone"]',
    nameSelector: '[name="user_name"]'
  }); 

};

export default forms;