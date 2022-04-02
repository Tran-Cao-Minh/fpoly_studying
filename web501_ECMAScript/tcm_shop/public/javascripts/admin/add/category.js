import {
  CustomSelectCreator
} from '../../class/custom-select-creator.js';
import {
  DataReader,
  DataAdder
} from '../../class/data-interactor.js';
import {
  FormValidator
} from '../../class/form-validator.js';
import {
  ToastCreator
} from '../../class/toast-creator.js';

const toastCreator = new ToastCreator(
  'bottom',
  16,
  'right',
  16,
);

const createCustomDisplayStatusSelect = () => {
  const categoryDisplaySelect = document.querySelector('#categoryDisplay');
  const categoryDisplaySelectContainer =
    categoryDisplaySelect.querySelector('.custom-select-list');
  const categoryDisplaySelectText =
    categoryDisplaySelect.querySelector('.custom-select-text');
  const categoryDisplaySelectLabelList =
    document.querySelectorAll('[for=categoryDisplay]');
  const categoryDisplaySelectCreator = new CustomSelectCreator(
    categoryDisplaySelect,
    'active',
    categoryDisplaySelectContainer,
    [
      'value',
    ],
  );
  categoryDisplaySelectLabelList.forEach((label = Node()) => {
    categoryDisplaySelectCreator.createLabelPointer(label);
  });

  const displayStatus = ['Show', 'Hide'];
  displayStatus.forEach((item) => {
    categoryDisplaySelectCreator.addOptionItem(
      item,
      [{
        key: 'value',
        data: item,
      }]
    );
  });

  categoryDisplaySelectCreator.createCustomSelect(
    displayStatus[0],
    categoryDisplaySelectText,
    'choosen',
  );
};

const createFormValidator = () => {
  const formObject = {
    form: document.querySelector('#addCategoryForm'),
    categoryName: document.querySelector('#categoryName'),
    categoryOrder: document.querySelector('#categoryOrder'),
    categoryDisplay: document.querySelector('#categoryDisplay'),
    submitButton: document.querySelector('#js-add-data-submit'),
  };

  const formValidator = new FormValidator(
    formObject.submitButton,
    'd-none',
    'is-invalid',
    'is-valid',
  );

  (function validateCategoryName() {
    const categoryNameMessageContainer =
      formObject.categoryName.parentElement.parentElement.querySelector('.invalid-feedback');

    formValidator.addTextInputValidator(
      formObject.categoryName,
      'category name',
      categoryNameMessageContainer,
      4,
      200,
      /^([A-Za-z0-9]{1})([\w\s'":,.&+|-]{0,199})$/,
      `Category name must be start with alphanumeric and 
      contains only alphanumeric, underscore or some specials 
      characters include , ' " : - ; _ + . |`,
    );

    (function checkCategoryNameDuplicateValidator () {
      const dataReader = new DataReader('https://tcm-shop-default-rtdb.firebaseio.com/categories');
      dataReader.readData((fullData) => {
        const dataList = (() => {
          const dataList = [];

          Object.keys(fullData).map((key) => {
            dataList.push(fullData[key]['CategoryName']);
          });

          return dataList;
        })();
  
        formValidator.checkDuplicateValidator(
          formObject.categoryName,
          'category name',
          categoryNameMessageContainer,
          dataList,
          false,
          false,
          true,
        );
      });
    })();
  })();

  (function validateCategoryOrder() {
    const categoryOrderMessageContainer =
      formObject.categoryOrder.parentElement.parentElement.querySelector('.invalid-feedback');
    formValidator.addNumberInputValidator(
      formObject.categoryOrder,
      'category order',
      categoryOrderMessageContainer,
      1,
      99,
      1,
    );
  })();

  (function createSubmitAddCategoryEvent() {
    const dataAdder = new DataAdder(
      'https://tcm-shop-default-rtdb.firebaseio.com/categories'
    );

    const submitAddEvent = () => {
      const formData = JSON.stringify({
        'CategoryName': formObject.categoryName.value,
        'CategoryOrder': Number(formObject.categoryOrder.value),
        'CategoryDisplay': formObject.categoryDisplay.getAttribute('value'),
        'CategoryProductQuantity': 0
      });

      const addSuccessFn = () => {
        toastCreator.createToast(
          'success',
          `Add category completed \n Category name: ${formObject.categoryName.value}`,
          2
        );

        formValidator.changeDuplicateValue(
          formObject.categoryName,
          formObject.categoryName.value,
          true
        );
        formValidator.resetForm(formObject.form);
      };

      const addFailedFn = () => {
        toastCreator.createToast(
          'danger',
          'Add category failed',
          2
        );
      };

      dataAdder.addData(
        formData,
        addSuccessFn,
        addFailedFn
      );
    };

    formValidator.createSubmitButtonEvent(
      submitAddEvent,
      true
    );
  })();
}

window.addEventListener('load', function () {
  createCustomDisplayStatusSelect();
  createFormValidator();
});