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

const formData = new FormData();

const toastCreator = new ToastCreator(
  'bottom',
  16,
  'right',
  16,
);

function createCustomDisplayStatusSelect() {
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
  categoryDisplaySelectLabelList.forEach(label => {
    categoryDisplaySelectCreator.createLabelPointer(label);
  });

  const displayStatusDataReader =
    new DataReader('http://localhost:3000/display-status/');

  displayStatusDataReader.readData({
    'columnList': [
      'PkDisplayStatus_Id',
      'StatusName',
    ],
    'searchValue': '',
    'searchMode': 'searchByValue',
    'searchColumn': 'PkDisplayStatus_Id',
    'orderRule': 'ASC',
    'orderColumn': 'PkDisplayStatus_Id',
    'resultQuantity': 999999999999,
    'pageNum': 1
  }, function addCategoryDisplaySelectData(data) {
    data.forEach(displayStatus => {
      categoryDisplaySelectCreator.addOptionItem(
        displayStatus.StatusName,
        [{
          key: 'value',
          data: displayStatus.PkDisplayStatus_Id,
        }, ]
      );
    });

    categoryDisplaySelectCreator.createCustomSelect(
      String(data[1].PkDisplayStatus_Id),
      categoryDisplaySelectText,
      'choosen',
    );
  });
}

function createFormValidator() {
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
  const categoryNameReader = new DataReader('http://localhost:3000/category/');
  categoryNameReader.readData({
      'columnList': [
        'CategoryName'
      ],
      'searchValue': '',
      'searchMode': 'searchByValue',
      'searchColumn': 'CategoryName',
      'orderRule': 'ASC',
      'orderColumn': 'CategoryName',
      'resultQuantity': 999999999999,
      'pageNum': 1
    },
    function addCategoryNameCheckExist (result) {
      let data = [];

      result.data.forEach(valueObject => {
        data.push(valueObject.CategoryName);
      });

      formValidator.checkDuplicateValidator(
        formObject.categoryName,
        'category name',
        categoryNameMessageContainer,
        data,
        false,
        false,
        true,
      );
    },
  );

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

  const fetchLink = 'http://localhost:3000/category/';
  const dataAdder = new DataAdder(
    fetchLink,
  );

  formValidator.createSubmitButtonEvent(
    function () {      
      formData.set(
        'categoryName',
        formObject.categoryName.value
      );
      formData.set(
        'categoryOrder',
        formObject.categoryOrder.value
      );
      formData.set(
        'categoryDisplay',
        formObject.categoryDisplay.getAttribute('value')
      );

      dataAdder.addData(
        formData,
        false,
        function (data) {
          if (data.result === 'success') {
            toastCreator.createToast(
              'success',
              data.notification,
              2,
            );
        
          } else if (data.result === 'fail') {
            toastCreator.createToast(
              'danger',
              data.notification,
              2,
            );
          };
        },
      );

      formValidator.resetForm(formObject.form);
    },
    true,
  );
}

window.addEventListener('load', function () {
  createCustomDisplayStatusSelect();
  createFormValidator();
});