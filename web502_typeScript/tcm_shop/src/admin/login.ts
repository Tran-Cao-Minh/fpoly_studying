import {
  FormValidator
} from '../class/form-validator.js';
import { DataReader } from '../class/data-interactor.js';

const formObject = {
  form: document.querySelector('#loginForm'),
  userName: <HTMLInputElement>document.querySelector('#userName'),
  userPassword: <HTMLInputElement>document.querySelector('#userPassword'),
  submitButton: document.querySelector('#submitLogin')
};

const formValidator = new FormValidator(
  formObject.submitButton,
  'd-none',
  'is-invalid',
  'is-valid',
);

(function validateUserName () {
  const userNameMessageContainer =
    formObject.userName.parentElement.parentElement.querySelector('.invalid-feedback');

  formValidator.addTextInputValidator(
    formObject.userName,
    'user name',
    userNameMessageContainer,
    4,
    200,
    /^([A-Za-z0-9]{1})([\w\s'":,.&+|-]{0,199})$/,
    `Category name must be start with alphanumeric and 
    contains only alphanumeric, underscore or some specials 
    characters include , ' " : - ; _ + . |`,
  );
})();

(function validateUserPassword () {
  const userPasswordMessageContainer =
    formObject.userPassword.parentElement.parentElement.querySelector('.invalid-feedback');
  formValidator.addTextInputValidator(
    formObject.userPassword,
    'user password',
    userPasswordMessageContainer,
    4,
    200,
    /^([A-Za-z0-9]{1})([\w\s'":,.&+|-]{0,199})$/,
    `Category name must be start with alphanumeric and 
    contains only alphanumeric, underscore or some specials 
    characters include , ' " : - ; _ + . |`,
  );
})();

(function createSubmitLoginEvent() {
  const fetchLink = 'https://tcm-shop-default-rtdb.firebaseio.com/users';
  const dataReader = new DataReader(fetchLink);

  const submitLoginEvent = () => {
    const userName = formObject.userName.value;
    const userPassword = formObject.userPassword.value;
    const notification = <HTMLSpanElement>document.querySelector('#js-login-notification');
    
    dataReader.readData((fullData = Object()) => {
      const userNameColumnKey = 'UserName';
      const userPasswordColumnKey = 'UserPassword';
      const userRoleColumnKey = 'UserRole';
      const ADMIN_ROLE = 'Admin';
    
      Object.keys(fullData).map((fireBaseKey: string) => {
        if (
          fullData[fireBaseKey][userNameColumnKey] === userName &&
          fullData[fireBaseKey][userPasswordColumnKey] === userPassword &&
          fullData[fireBaseKey][userRoleColumnKey] === ADMIN_ROLE
        ) {
          sessionStorage.setItem('userName', userName);
          sessionStorage.setItem('userPassword', userPassword);

          location.href = '/admin/order-overview';
        };
      });

      notification.classList.remove('d-none');
      notification.innerText = 'Your User Name or Password WRONG ~';
    });
  };

  formValidator.createSubmitButtonEvent(
    submitLoginEvent,
    true
  );
})();