const forms = () => {
  function callbackFormsInit({ formsSelector, phoneSelector, nameSelector, submitSelector }) {
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
      // const parent = input.parentElement;
      // let elemMessage = parent.querySelector(`.${inputTypeSelector}`);
      // if (elemMessage) parent.querySelector(`.${inputTypeSelector}`).remove();
      deleteMessage(input, inputTypeSelector);
      if (emptyValue) return;

      const elemMessage = document.createElement('div');
      elemMessage.classList.add(inputTypeSelector, validClass, messageClass);
      elemMessage.textContent = text;

      input.after(elemMessage);
    }

    function submitForm(e, inputName, inputPhone) {
      e.preventDefault();
      const name = inputName.value,
            phone = inputPhone.value;

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

      if (formValid) sendData();

    }

    function deleteMessage(input, inputTypeSelector) {
      const parent = input.parentElement;
      let elemMessage = parent.querySelector(`.${inputTypeSelector}`);
      if (elemMessage) parent.querySelector(`.${inputTypeSelector}`).remove();
    }

    function sendData() {

    }
  }

  callbackFormsInit({
    formsSelector: '[data-type-form="callback"]',
    phoneSelector: '[name="user_phone"]',
    nameSelector: '[name="user_name"]',
    submitSelector: '[name="submit"]',
  }); 

};

export default forms;