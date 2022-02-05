let columnList = [{
    name: 'ID',
    key: 'CategoryId',
    type: 'number',
  }, {
    name: 'Name',
    key: 'CategoryName',
    type: 'text',
  },
  {
    name: 'Order',
    key: 'CategoryOrder',
    type: 'number',
  },
  {
    name: 'Display',
    key: 'CategoryDisplay',
    type: 'text',
  },
  {
    name: 'Quantity',
    key: 'CategoryProductQuantity',
    type: 'number',
  },
];

import {
  adminFilterCustomSelectCreator
} from './create-custom-select.js';
adminFilterCustomSelectCreator(columnList);

import {
  SingleActivator
} from '../../class/activator.js';

let searchInputContainer = document.querySelector('#js-search-input-container');
let searchInputModeChanger = new SingleActivator('active', searchInputContainer);
let changeModeInputList = document.querySelectorAll('[name=searchMode]');
changeModeInputList.forEach(input => {
  searchInputModeChanger.createEvent(input, 'change');
});

let searchColumnSelect =
  document.querySelector('#js-overview-search-column');
let searchColumnSelectValue = searchColumnSelect.getAttribute('value');
let searchInputList = document.querySelectorAll('[id*="js-overview-search-"]');

import {
  DataReader
} from '../../class/data-interactor.js';

let tableDataReader = new DataReader('http://localhost:3000/category/');

searchColumnSelect.addEventListener('DOMSubtreeModified', function () {
  if (searchColumnSelect.getAttribute('value') !== searchColumnSelectValue) {
    searchColumnSelectValue = searchColumnSelect.getAttribute('value');

    searchInputList.forEach(input => {
      input.setAttribute('type', searchColumnSelect.getAttribute('type'));
    });

    tableDataReader.readData({
        "columnList": [
          searchColumnSelectValue
        ],
        "searchValue": "",
        "searchMode": "searchByValue",
        "searchColumn": "PkProductCategory_Id",
        "orderRule": "ASC",
        "orderColumn": "PkProductCategory_Id",
        "offset": 0,
        "rowCount": 999999999999
      },
      function (data) {
        alert(JSON.stringify(data));
      },
      100,
    );
  }
});



// let a = 1;
// a = ;
// test.readData({
//     "columnList": [
//       "CategoryOrder"
//     ],
//     "searchValue": "",
//     "searchMode": "searchByValue",
//     "searchColumn": "PkProductCategory_Id",
//     "orderRule": "ASC",
//     "orderColumn": "PkProductCategory_Id",
//     "offset": 0,
//     "rowCount": 2
//   },
//   function (data) {
//     alert(JSON.stringify(data));
//   }
// );
// let data = [0];
// alert(sessionStorage.getItem('itemgood'));




// let testColumnSelect =
//   document.querySelector('#js-test-column-select');
// let testColumnSelectText =
//   testColumnSelect.querySelector('.custom-select-text');
// let testColumnSelectContainer =
//   testColumnSelect.querySelector('.custom-select-list');

// let testCustomSelectCreator = new CustomSelectCreator(
//   testColumnSelect,
//   testColumnSelectText,
//   'active',
//   testColumnSelectContainer,
//   [
//     'value',
//     'type',
//     'nani',
//   ],
// );

// testCustomSelectCreator.addOptionItem(
//   'test',
//   [{
//       key: 'value',
//       data: 'test',
//     },
//     {
//       key: 'type',
//       data: 'test',
//     },
//     {
//       key: 'nani',
//       data: 'test',
//     },
//   ]
// );

// testCustomSelectCreator.createCustomSelect('test');