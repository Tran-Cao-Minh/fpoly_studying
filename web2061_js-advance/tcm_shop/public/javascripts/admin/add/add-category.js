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

window.addEventListener('load', function createCustomDisplayStatusSelect() {
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
});

function FormValidator (

) {
  
}