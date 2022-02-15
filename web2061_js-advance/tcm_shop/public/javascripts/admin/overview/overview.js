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
const tableUpdateLinkFormatter = new LinkFormatter(
  './update/',
  ['btn-warning', 'btn-square'],
  '<i class="fas fa-file-alt"></i>',
);
const tableDeleteButtonFormatter = new ButtonFormatter(
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
let searchByMinInput = document.querySelector('#js-overview-search-min');
let searchByMaxInput = document.querySelector('#js-overview-search-max');
let searchColumnSelect = document.querySelector('#js-overview-search-column');
let orderColumnSelect = document.querySelector('#js-overview-order-column');
let orderRuleSelect = document.querySelector('#js-overview-order-rule');
let resultQuantitySelect = document.querySelector('#js-overview-rows');
let dataTable = document.querySelector('#js-data-table');

let tableDataReader = new DataReader(dataFetchLink);
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

import {
  TableCreator
} from '../../class/table-creator.js';

let tableCreator = new TableCreator(
  dataTable,
  addTableButtonEvent,
  tableColumnList,
  'rem',
);

function PagingLinkCreator(
  iconClass = Array(String()),
  numberClass = Array(String()),
  firstPageIcon = String(),
  lastPageIcon = String(),
  container = Node(),
  hideClass = String(),
  itemChoosenAttribute = String(),
  maxPage = Number(odd),
) {
  this.iconClass = iconClass;
  this.getIconClass = function () {
    if (this.iconClass.length > 0) {
      let classValue = '';
      this.iconClass.forEach(item => {
        classValue += ` ${item}`;
      });
      classValue.slice(0, 1);

      return classValue;
    } else {
      return '';
    };
  };
  this.numberClass = numberClass;
  this.getNumberClass = function () {
    if (this.numberClass.length > 0) {
      let classValue = '';
      this.numberClass.forEach(item => {
        classValue += ` ${item}`;
      });
      classValue.slice(0, 1);

      return classValue;
    } else {
      return '';
    };
  };

  this.firstPageIcon = firstPageIcon;
  this.lastPageIcon = lastPageIcon;
  this.container = container;
  this.hideClass = hideClass;
  this.itemChoosenAttribute = itemChoosenAttribute;
  this.maxPage = maxPage;
  this.offset = (maxPage - 1) / 2;

  this.changePagingLink = function (
    pageNum = Number(),
    resultQuantity = Number(),
    total = Number(),
    pagingItemEvent = Function(pageNum = Number),
  ) {
    let pageQuantity = Math.ceil(total / resultQuantity);

    if (pageQuantity > 1) {
      this.container.classList.remove(hideClass);
      this.container.innerHTML = '';

      let pagingItemClass = this.getNumberClass();
      let itemChoosenAttribute = this.itemChoosenAttribute;
      let pagingLinkListContainer = this.container;
      function createPagingItem(i = Number()) {
        let pagingItem = document.createElement('li');
        pagingItem.setAttribute('class', pagingItemClass);
        pagingItem.innerHTML = i;
        pagingItem.setAttribute('value', i);
  
        if (i === pageNum) {
          pagingItem.setAttribute(itemChoosenAttribute, '');

        } else {
          pagingItem.addEventListener('click', function() {
            pagingItemEvent(i);
          });
        };

        pagingLinkListContainer.appendChild(pagingItem);
      }
  
      if (pageQuantity <= this.maxPage) {
        for (let i = 1; i <= pageQuantity; i++) {
          createPagingItem(i);
        };
      } else if (pageQuantity > maxPage) {
        let pagingItemFirst = document.createElement('li');
        pagingItemFirst.setAttribute('class', this.getIconClass());
        pagingItemFirst.innerHTML = this.firstPageIcon;
        pagingItemFirst.setAttribute('value', 1);
        pagingItemFirst.addEventListener('click', function() {
          pagingItemEvent(1);
        });
  
        let pagingItemLast = document.createElement('li');
        pagingItemLast.setAttribute('class', this.getIconClass());
        pagingItemLast.innerHTML = this.lastPageIcon;
        pagingItemLast.setAttribute('value', pageQuantity);
        pagingItemLast.addEventListener('click', function() {
          pagingItemEvent(pageQuantity);
        });
  
        if (
          pageNum > this.offset &&
          pageNum <= (pageQuantity - this.offset)
        ) {
          this.container.appendChild(pagingItemFirst);
          for (let i = (pageNum - 1); i <= (pageNum + 1); i++) {
            createPagingItem(i);
          };
          this.container.appendChild(pagingItemLast);
  
        } else if (pageNum <= this.offset) {
          for (let i = 1; i <= (this.offset * 2); i++) {
            createPagingItem(i);
          };
          this.container.appendChild(pagingItemLast);
  
        } else if (pageNum > (pageQuantity - this.offset)) {
          this.container.appendChild(pagingItemFirst);
          for (let i = (pageQuantity - (this.offset + 1)); i <= pageQuantity; i++) {
            createPagingItem(i);
          };
        };
      };

    } else {
      this.container.classList.add(hideClass);
    };
  };
}

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

import {
  ToastCreator
} from '../../class/toast-creator.js';

const tableDataToastify = new ToastCreator(
  'bottom',
  16,
  'right',
  16,
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