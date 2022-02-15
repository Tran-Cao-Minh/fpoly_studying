import {
  CustomSelectCreator
} from '../../class/custom-select-creator.js';
import {
  DataReader
} from '../../class/data-interactor.js';

const fetchLink = 'http://localhost:3000/category/';
const displayStatusDataReader =
  new DataReader('http://localhost:3000/display-status/');

const addCategoryForm = document.querySelector('[name=addCategoryForm]');

// window.addEventListener('load', function createCustomDisplayStatusSelect() {
//   const categoryDisplaySelect = document.querySelector('#categoryDisplay');
//   const categoryDisplaySelectContainer =
//     categoryDisplaySelect.querySelector('.custom-select-list');
//   const categoryDisplaySelectText =
//     categoryDisplaySelect.querySelector('.custom-select-text');
//   const categoryDisplaySelectLabelList =
//     document.querySelectorAll('[for=categoryDisplay]');
//   const categoryDisplaySelectCreator = new CustomSelectCreator(
//     categoryDisplaySelect,
//     'active',
//     categoryDisplaySelectContainer,
//     [
//       'value',
//     ],
//   );
//   categoryDisplaySelectLabelList.forEach(label => {
//     categoryDisplaySelectCreator.createLabelPointer(label);
//   });

//   displayStatusDataReader.readData({
//     'columnList': [
//       'PkDisplayStatus_Id',
//       'StatusName',
//     ],
//     'searchValue': '',
//     'searchMode': 'searchByValue',
//     'searchColumn': 'PkDisplayStatus_Id',
//     'orderRule': 'ASC',
//     'orderColumn': 'PkDisplayStatus_Id',
//     'resultQuantity': 999999999999,
//     'pageNum': 1
//   }, function addCategoryDisplaySelectData(data) {
//     data.forEach(displayStatus => {
//       categoryDisplaySelectCreator.addOptionItem(
//         displayStatus.StatusName,
//         [{
//           key: 'value',
//           data: displayStatus.PkDisplayStatus_Id,
//         }, ]
//       );
//     });

//     categoryDisplaySelectCreator.createCustomSelect(
//       String(data[1].PkDisplayStatus_Id),
//       categoryDisplaySelectText,
//       'choosen',
//     );
//   });
// });

import {
  FormValidator
} from '../../class/form-validator.js';

window.addEventListener('load', function createFormValidator() {
  const addCategoryFormObject = {
    categoryName: document.querySelector('#categoryName'),
    categoryOrder: document.querySelector('#categoryOrder'),
    categoryDisplay: document.querySelector('#categoryDisplay'),
    submitButton: document.querySelector('#js-add-data-submit'),
  };

  const addCategoryFormValidator = new FormValidator(
    addCategoryFormObject.submitButton,
    'd-none',
    'is-invalid',
    'is-valid',
  );

  const categoryNameMessageContainer =
    addCategoryFormObject.categoryName.parentElement.parentElement.querySelector('.invalid-feedback');

  addCategoryFormValidator.addTextInputValidator(
    addCategoryFormObject.categoryName,
    'category name',
    categoryNameMessageContainer,
    4,
    200,
    /^([A-Za-z0-9]{1})([\w\s'":,.&+|-]{0,199})$/,
    `Category name must be start with alphanumeric and 
    contains only alphanumeric, underscore or some specials 
    characters include , ' " : - ; _ + . |`,
  );

  const categoryOrderMessageContainer =
    addCategoryFormObject.categoryOrder.parentElement.parentElement.querySelector('.invalid-feedback');
  addCategoryFormValidator.addNumberInputValidator(
    addCategoryFormObject.categoryOrder,
    'category order',
    categoryOrderMessageContainer,
    1,
    99,
    1,
  );

  addCategoryFormValidator.createSubmitButtonEvent(
    function () {
      alert('passed');
    },
  );
});