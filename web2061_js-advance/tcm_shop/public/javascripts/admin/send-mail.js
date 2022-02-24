import {
  DataAdder
} from '../class/data-interactor.js';
import {
  FormValidator
} from '../class/form-validator.js';
import {
  ToastCreator
} from '../class/toast-creator.js';

const formData = new FormData();

const toastCreator = new ToastCreator(
  'bottom',
  16,
  'right',
  16,
);

function createFormValidator() {
  const formObject = {
    form: document.querySelector('#sendMailForm'),
    userEmail: document.querySelector('#userEmail'),
    emailSubject: document.querySelector('#emailSubject'),
    emailContent: document.querySelector('#emailContent'),
    submitButton: document.querySelector('#js-send-data-submit'),
  };

  const formValidator = new FormValidator(
    formObject.submitButton,
    'd-none',
    'is-invalid',
    'is-valid',
  );

  (function validateUserEmail() {
    const userEmailMessageContainer =
      formObject.userEmail.parentElement.parentElement.querySelector('.invalid-feedback');

    formValidator.addTextInputValidator(
      formObject.userEmail,
      'user email',
      userEmailMessageContainer,
      10,
      200,
      /^[a-z][a-z0-9_\.]{4,32}@{1}[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/,
      `Wrong email format`,
    );
  })();

  (function validateEmailSubject() {
    const emailSubjectMessageContainer =
      formObject.emailSubject.parentElement.parentElement.querySelector('.invalid-feedback');

    formValidator.addTextInputValidator(
      formObject.emailSubject,
      'email subject',
      emailSubjectMessageContainer,
      4,
      200,
      /^([A-Za-z0-9]{1})([\w\s'":,.&+|-]{0,199})$/,
      `Email subject must be start with alphanumeric and 
      contains only alphanumeric, underscore or some specials 
      characters include , ' " : - ; _ + . |`,
    );
  })();

  (function validateEmailContent() {
    const emailContentMessageContainer =
      formObject.emailContent.parentElement.parentElement.querySelector('.invalid-feedback');

    formValidator.addTextInputValidator(
      formObject.emailContent,
      'email content',
      emailContentMessageContainer,
      25,
      2000,
      /^([A-Za-z0-9]{1})([\s\S]{24,1999})$/,
      `Email content must be start with alphanumeric`,
    );
  })();

  (function createSubmitSendEmailEvent() {
    const fetchLink = 'http://localhost:3000/user/mail';
    const dataAdder = new DataAdder(
      fetchLink,
    );

    formValidator.createSubmitButtonEvent(
      function () {
        formData.set(
          'userEmail',
          formObject.userEmail.value
        );
        formData.set(
          'emailSubject',
          formObject.emailSubject.value
        );
        formData.set(
          'emailContent',
          formObject.emailContent.value
        );

        dataAdder.addData(
          formData,
          false,
          function (data) {
            toastCreator.createToast(
              'success',
              data.notification,
              2,
            );

            formValidator.resetForm(formObject.form);
          },
        );
      },
      true,
    );
  })();
}

window.addEventListener('load', function () {
  createFormValidator();
});