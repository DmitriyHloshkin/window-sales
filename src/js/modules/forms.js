const forms = () => {
  function callbackFormsInit({ formsSelector, phoneSelector, submitSelector }) {
    const forms = document.querySelectorAll(formsSelector);

    forms.forEach( (elem) => {
      const inputPhone = elem.querySelector(phoneSelector),
            submitBtn = elem.querySelector(submitSelector);

      validationPhon(inputPhone, submitBtn);
      
    });

    function validationPhon(inputElem, submitElem) {
      if (!inputElem || !submitElem) return;

      inputElem.addEventListener('input', e => {
        const symbol = e.data || "",
              value = e.target.value;
        
        const symbolCorrect = symbol.match(/\d/),
              valueCorrect = !value.match(/\D/);

        let massage = getMassagePhone(value);
        showMassagePhone({...massage, inputElem});

      });
    }

    function lockSubmit(btnElem) {
      
    }

    function getMassagePhone(valuePhone) {
      const result = {
        text: 'данные корректны',
        cssClass: 'validation-massage-phone_valid',
        emptyValue: !valuePhone,
      };

      const valueCorrect = !valuePhone.match(/\D/);

      if(!valueCorrect) {
        result.text = 'данные не корректны';
        result.cssClass = 'validation-massage-phone_no_valid';
      }

      return result;

    }

    function showMassagePhone( {text , cssClass, emptyValue,  inputElem} ) {
      const parent = inputElem.parentElement;
      let elemMessage = parent.querySelector('.validation-massage-phone');
      if (elemMessage) parent.querySelector('.validation-massage-phone').remove();
      if (emptyValue) return;

      elemMessage = document.createElement('div');
      elemMessage.classList.add('validation-massage-phone', cssClass);
      elemMessage.textContent = text;

      inputElem.after(elemMessage);
    }

  }

  callbackFormsInit({
    formsSelector: '[data-type-form="callback"]',
    phoneSelector: '[name="user_phone"]',
    submitSelector: '[name="submit"]',
  }); 

};

export default forms;