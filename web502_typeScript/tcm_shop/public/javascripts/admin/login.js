import {
  FormValidator
} from '../class/form-validator.js';

const formObject = {
  form: document.querySelector('#loginForm'),
  userName: document.querySelector('#userName'),
  userPassword: document.querySelector('#userPassword'),
  submitButton: document.querySelector('#submitLoging')
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