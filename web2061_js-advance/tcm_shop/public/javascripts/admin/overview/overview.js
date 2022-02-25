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

function addTableButtonEvent() {
  let deleteButtonList = document.querySelectorAll('.js-delete-data');

  deleteButtonList.forEach(deleteButton => {
    deleteButton.addEventListener('click', function () {
      let categoryName = deleteButton.dataset.name;
      let categoryId = deleteButton.dataset.id;
      confirmDeletePopupCreator.createConfirmDangerActionPopup(
        `
          Are you sure to delete Category - ${categoryName} ?
          <br>
          (<span class="text-danger fw-bold">*</span>) 
          The number of products in the category must be 0 to be deleted
        `,
        function () {
          tableDataDeleter.deleteData(
            categoryId,
            function (data) {
              switch (data.result) {
                case 'success':
                  tableDataToastify.createToast(
                    'success',
                    data.notification,
                    2,
                  );
                  break;

                case 'fail':
                  tableDataToastify.createToast(
                    'danger',
                    data.notification,
                    2,
                  );
                  break;

                case 'warning':
                  tableDataToastify.createToast(
                    'warning',
                    data.notification,
                    2,
                  );
              };

              function changeTableData() {
                tableDataReader.readData(
                  filterInformation,
                  function (result) {
                    if (result.data.length > 0) {
                      tableCreator.convertData(result.data);

                      tablePagingLinkCreator.changePagingLink(
                        filterInformation.pageNum,
                        filterInformation.resultQuantity,
                        result.total,
                        function (pageNum) {
                          filterInformation.pageNum = pageNum;
                          changeTableData(filterInformation, true);
                        },
                      );

                    } else {
                      --filterInformation.pageNum;
                      changeTableData();
                    };
                  },
                );
              };
              changeTableData();

              function updateSearchSuggestData() {
                tableDataReader.readData({
                    'columnList': [
                      searchColumnSelect.getAttribute('value'),
                    ],
                    'searchValue': '',
                    'searchMode': 'searchByValue',
                    'searchColumn': searchColumnSelect.getAttribute('value'),
                    'orderRule': 'ASC',
                    'orderColumn': searchColumnSelect.getAttribute('value'),
                    'resultQuantity': 999999999999,
                    'pageNum': 1
                  },
                  function (result) {
                    let data = result.data;

                    data = [
                      ...new Map(data.map((item) => [item[searchColumnSelect.getAttribute('value')], item])).values(),
                    ];

                    searchSuggester.keyList = [searchColumnSelect.getAttribute('value')];
                    searchSuggester.suggestData = data;
                  },
                );
              }
              updateSearchSuggestData();
            },
          );
        }
      );
    });
  });
};

import {
  LinkFormatter,
  ButtonFormatter,
} from '../../class/data-formatter.js';
const tableUpdateLinkFormatter = new LinkFormatter(
  './update-category/',
  ['btn-warning', 'btn-square'],
  '<i class="fas fa-file-alt"></i>',
);
const tableDeleteButtonFormatter = new ButtonFormatter(
  ['btn-danger', 'btn-square', 'me-2', 'js-delete-data'],
  '<i class="fas fa-trash"></i>',
);

let tableColumnList = [{
    name: 'Name',
    key: 'CategoryName',
    width: 12,
  },
  {
    name: 'Order',
    key: 'CategoryOrder',
    width: 6,
  },
  {
    name: 'Display',
    key: 'CategoryDisplay',
    width: 7,
  },
  {
    name: 'Quantity',
    key: 'CategoryProductQuantity',
    width: 7,
  },
  {
    name: 'Handle',
    key: 'CategoryId',
    width: 7,
    formatFunction: function (
      [id = String(), name = String()]
    ) {
      let deleteBtn = tableDeleteButtonFormatter.formatButton(
        [{
          key: 'id',
          value: id
        }, {
          key: 'name',
          value: name
        }]
      );
      let updateBtn = tableUpdateLinkFormatter.formatLink(id);
      return deleteBtn + updateBtn;
    },
    formatPrameterKeyList: [
      'CategoryId',
      'CategoryName'
    ],
  },
];

import {
  ToastCreator
} from '../../class/toast-creator.js';
const tableDataToastify = new ToastCreator(
  'bottom',
  16,
  'right',
  16,
);

import {
  DataDeleter
} from '../../class/data-interactor.js';
const tableDataDeleter = new DataDeleter(dataFetchLink);

import {
  ConfirmDangerActionPopupCreator
} from '../../class/popup-creator.js';
const confirmDeletePopupCreator = new ConfirmDangerActionPopupCreator('Delete');



import {
  Suggester
} from '../../class/suggester.js';
const searchSuggester = new Suggester([{}], [defaultColumnOptionValue]);

import {
  DataReader
} from '../../class/data-interactor.js';
const tableDataReader = new DataReader(dataFetchLink);

import {
  adminFilterCustomSelectCreator
} from './create-custom-select.js';
adminFilterCustomSelectCreator(
  columnList,
  defaultColumnOptionValue
);

import {
  searchAssistantCreator
} from './create-search-assistant.js';
searchAssistantCreator(
  defaultColumnOptionValue,
  dataFetchLink,
  searchSuggester,
);

// TABLE INTERACTION
import {
  TableCreator
} from '../../class/table-creator.js';
import {
  PagingLinkCreator
} from '../../class/paging-link-creator.js';

let tableColumnKeyList = [];
tableColumnList.forEach(column => {
  tableColumnKeyList.push(column.key);
});

let searchByValueInput = document.querySelector('#js-overview-search-value');
let searchByMinInput = document.querySelector('#js-overview-search-min');
let searchByMaxInput = document.querySelector('#js-overview-search-max');
let searchColumnSelect = document.querySelector('#js-overview-search-column');
let orderColumnSelect = document.querySelector('#js-overview-order-column');
let orderRuleSelect = document.querySelector('#js-overview-order-rule');
let resultQuantitySelect = document.querySelector('#js-overview-rows');
let dataTable = document.querySelector('#js-data-table');

let filterInformation = {
  'columnList': tableColumnKeyList,
  'searchValue': searchByValueInput.value,
  'searchMinValue': searchByMinInput.value,
  'searchMaxValue': searchByMaxInput.value,
  'searchMode': 'searchByValue',
  'searchColumn': searchColumnSelect.getAttribute('value'),
  'orderColumn': orderColumnSelect.getAttribute('value'),
  'orderRule': orderRuleSelect.getAttribute('value'),
  'resultQuantity': resultQuantitySelect.getAttribute('value'),
  'pageNum': 1
};

let tableCreator = new TableCreator(
  dataTable,
  addTableButtonEvent,
  tableColumnList,
  'rem',
);

let pagingLinkContainer = document.querySelector('#js-table-paging-link-list');
const tablePagingLinkCreator = new PagingLinkCreator(
  ['btn-white', 'btn-square', 'ms-1', 'me-1', 'mt-2'],
  ['btn-white', 'btn-square', 'fw-bold', 'ms-1', 'me-1', 'mt-2'],
  '<i class="fa-solid fa-step-backward"></i>',
  '<i class="fa-solid fa-step-forward"></i>',
  pagingLinkContainer,
  'd-none',
  'disabled',
  5,
);

function changeTableData(
  filterInformation = Object(),
  changePageNum = Boolean(),
) {
  tableDataReader.readData(
    filterInformation,
    function (result) {
      tableCreator.convertData(result.data);
      tablePagingLinkCreator.changePagingLink(
        filterInformation.pageNum,
        filterInformation.resultQuantity,
        result.total,
        function (pageNum) {
          filterInformation.pageNum = pageNum;
          changeTableData(filterInformation, true);

          document.querySelector('#js-table-container').scrollIntoView();
        },
      );

      let toastifyDisplayTime = 2;
      if (changePageNum === false) {
        if (result.total > 1) {
          tableDataToastify.createToast(
            'success',
            `Filter data successully return ${result.total} rows result`,
            toastifyDisplayTime,
          );
        } else if (result.total === 1) {
          tableDataToastify.createToast(
            'success',
            `Filter data successully return 1 row result`,
            toastifyDisplayTime,
          );

        } else {
          tableDataToastify.createToast(
            'warning',
            `No suitable data`,
            toastifyDisplayTime,
          );
        };
      } else {
        tableDataToastify.createToast(
          'success',
          `Switch to page ${filterInformation.pageNum} completed`,
          toastifyDisplayTime,
        );
      };
    },
  );
}
changeTableData(filterInformation, false);

let confirmSearchButton = document.querySelector('#js-confirm-search-button');
let searchByValueModeRadio = document.querySelector('#js-search-by-value');
let searchByMinMaxModeRadio = document.querySelector('#js-search-by-min-max');
confirmSearchButton.addEventListener('click', function () {
  if (searchByValueModeRadio.checked === true) {
    filterInformation.searchMode = 'searchByValue';
    filterInformation.searchValue = searchByValueInput.value;

  } else if (searchByMinMaxModeRadio.checked === true) {
    filterInformation.searchMode = 'searchByMinMax';
    filterInformation.searchMinValue = searchByMinInput.value;
    filterInformation.searchMaxValue = searchByMaxInput.value;
  };

  let searchColumnValue = searchColumnSelect.getAttribute('value');
  filterInformation.searchColumn = searchColumnValue;

  filterInformation.pageNum = 1;
  changeTableData(filterInformation, false);
});
orderColumnSelect.addEventListener('DOMSubtreeModified', function () {
  let orderColumnValue = orderColumnSelect.getAttribute('value');
  if (orderColumnValue !== filterInformation.orderColumn) {
    filterInformation.pageNum = 1;
    filterInformation.orderColumn = orderColumnValue;
    changeTableData(filterInformation, false);
  };
});
orderRuleSelect.addEventListener('DOMSubtreeModified', function () {
  let orderRuleValue = orderRuleSelect.getAttribute('value');
  if (orderRuleValue !== filterInformation.orderRule) {
    filterInformation.pageNum = 1;
    filterInformation.orderRule = orderRuleValue;
    changeTableData(filterInformation, false);
  };
});
resultQuantitySelect.addEventListener('DOMSubtreeModified', function () {
  let resultQuantityValue = resultQuantitySelect.getAttribute('value');
  if (resultQuantityValue !== filterInformation.resultQuantity) {
    filterInformation.pageNum = 1;
    filterInformation.resultQuantity = resultQuantityValue;
    changeTableData(filterInformation, false);
  };
});
// END TABLE INTERACTION