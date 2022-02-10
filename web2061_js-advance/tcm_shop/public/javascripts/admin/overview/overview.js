let columnList = [{
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

let defaultColumnOptionValue = 'CategoryName';
let dataFetchLink = 'http://localhost:3000/category/';

import {
  LinkFormatter,
  ButtonFormatter,
} from '../../class/data-formatter.js';
let tableUpdateLinkFormatter = new LinkFormatter(
  './update/',
  ['btn-warning', 'btn-square'],
  '<i class="fas fa-file-alt"></i>',
);
let tableDeleteButtonFormatter = new ButtonFormatter(
  ['btn-danger', 'btn-square', 'me-2', 'js-delete-data'],
  '<i class="fas fa-trash"></i>',
);

function addTableButtonEvent() {
  let deleteButtonList = document.querySelectorAll('.js-delete-data');

  deleteButtonList.forEach(deleteButton => {
    deleteButton.addEventListener('click', function () {
      alert(deleteButton.dataset.id);
    });
  });
};

let tableColumnList = [{
    name: 'Name',
    key: 'CategoryName',
    width: '12rem',
  },
  {
    name: 'Order',
    key: 'CategoryOrder',
    width: '6rem',
  },
  {
    name: 'Display',
    key: 'CategoryDisplay',
    width: '7rem',
  },
  {
    name: 'Quantity',
    key: 'CategoryProductQuantity',
    width: '7rem',
  },
  {
    name: 'Handle',
    key: 'CategoryId',
    width: '8rem',
    formatFunction: function (id = Number()) {

        return tableDeleteButtonFormatter.formatButton(id) +
          tableUpdateLinkFormatter.formatLink(id);
    },
    formatPrameterKeyList: [
      'CategoryId',
    ],
  },
];

import {
  adminFilterCustomSelectCreator
} from './create-custom-select.js';
adminFilterCustomSelectCreator(columnList, defaultColumnOptionValue);

import {
  searchAssistantCreator
} from './create-search-assistant.js';
searchAssistantCreator(defaultColumnOptionValue, dataFetchLink);

import {
  DataReader
} from '../../class/data-interactor.js';

let tableColumnKeyList = [];
tableColumnList.forEach(column => {
  tableColumnKeyList.push(column.key);
});

let searchByValueInput = document.querySelector('#js-overview-search-value');
let searchColumnSelect = document.querySelector('#js-overview-search-column');
let orderColumnSelect = document.querySelector('#js-overview-order-column');
let orderRuleSelect = document.querySelector('#js-overview-order-rule');
let resultQuantitySelect = document.querySelector('#js-overview-rows');
let dataTable = document.querySelector('#js-data-table');

let tableDataReader = new DataReader(dataFetchLink);
let filterInformation = {
  "columnList": tableColumnKeyList,
  "searchValue": searchByValueInput.value,
  "searchMode": "searchByValue",
  "searchColumn": searchColumnSelect.getAttribute('value'),
  "orderColumn": orderColumnSelect.getAttribute('value'),
  "orderRule": orderRuleSelect.getAttribute('value'),
  "resultQuantity": resultQuantitySelect.getAttribute('value'),
  "pageNum": 1
};

import {
  TableCreator
} from '../../class/table-creator.js';

let tableCreator = new TableCreator(
  dataTable,
  addTableButtonEvent,
  tableColumnList,
);

function changeTableData (filterInformation) {
  tableDataReader.readData(
    filterInformation,
    function (data) {
      tableCreator.convertData(data);
    },
    100,
  );
};
changeTableData(filterInformation);

searchColumnSelect.addEventListener('DOMSubtreeModified', function() {
  let searchColumnValue = searchColumnSelect.getAttribute('value');
  if (searchColumnValue !== filterInformation.searchColumn) {
    filterInformation.pageNum = 1;
    filterInformation.searchColumn = searchColumnValue;
    changeTableData(filterInformation);
  };
});
orderColumnSelect.addEventListener('DOMSubtreeModified', function() {
  let orderColumnValue = orderColumnSelect.getAttribute('value');
  if (orderColumnValue !== filterInformation.orderColumn) {
    filterInformation.pageNum = 1;
    filterInformation.orderColumn = orderColumnValue;
    changeTableData(filterInformation);
  };
});
orderRuleSelect.addEventListener('DOMSubtreeModified', function() {
  let orderRuleValue = orderRuleSelect.getAttribute('value');
  if (orderRuleValue !== filterInformation.orderRule) {
    filterInformation.pageNum = 1;
    filterInformation.orderRule = orderRuleValue;
    changeTableData(filterInformation);
  };
});
resultQuantitySelect.addEventListener('DOMSubtreeModified', function() {
  let resultQuantityValue = resultQuantitySelect.getAttribute('value');
  if (resultQuantityValue !== filterInformation.resultQuantity) {
    filterInformation.pageNum = 1;
    filterInformation.resultQuantity = resultQuantityValue;
    changeTableData(filterInformation);
  };
});