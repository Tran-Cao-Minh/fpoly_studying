import {
  FormValidator
} from '../class/form-validator';
import { DataReader } from '../class/data-interactor';

const formObject = {
  form: document.querySelector('#loginForm'),
  userName: <HTMLInputElement>document.querySelector('#userName'),
  userPassword: <HTMLInputElement>document.querySelector('#userPassword'),
  submitButton: <HTMLButtonElement>document.querySelector('#submitLogin')
};

const formValidator: FormValidator = new FormValidator(
  formObject.submitButton,
  'd-none',
  'is-invalid',
  'is-valid',
);

(function validateUserName (): void {
  const userNameMessageContainer: HTMLElement =
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

(function validateUserPassword (): void {
  const userPasswordMessageContainer: HTMLElement =
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

(function createSubmitLoginEvent(): void {
  const fetchLink: string = 'https://tcm-shop-default-rtdb.firebaseio.com/users';
  const dataReader: DataReader = new DataReader(fetchLink);

  const submitLoginEvent = () => {
    const userName: string = formObject.userName.value;
    const userPassword: string = formObject.userPassword.value;
    const notification: HTMLSpanElement = document.querySelector('#js-login-notification');
    
    dataReader.readData((fullData = Object()) => {
      const userNameColumnKey: string = 'UserName';
      const userPasswordColumnKey: string = 'UserPassword';
      const userRoleColumnKey: string = 'UserRole';
      enum Role { ADMIN = 'Admin' };
    
      Object.keys(fullData).map((fireBaseKey: string) => {
        if (
          fullData[fireBaseKey][userNameColumnKey] === userName &&
          fullData[fireBaseKey][userPasswordColumnKey] === userPassword &&
          fullData[fireBaseKey][userRoleColumnKey] === Role.ADMIN
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