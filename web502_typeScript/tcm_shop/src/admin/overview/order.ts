import {
  LinkFormatter,
  CurrencyFormatter,
  DateFormatter
} from '../../class/data-formatter.js';
import tablePagingLinkCreator from './modules/table-paging-link-creator.js';

import {
  filterData,
  sliceData
} from './modules/filter-data.js';
import {
  Suggester
} from '../../class/suggester.js';
import {
  TableCreator
} from '../../class/table-creator.js';

// FETCH LINK, DEFAULT OPTION
const dataFetchLink = 'https://tcm-shop-default-rtdb.firebaseio.com/orders';
const defaultColumnOptionValue = 'CustomerEmail';
// end FETCH LINK, DEFAULT OPTION

// GLOBAL
let data = []; // must here
const searchSuggester = new Suggester([{}], [defaultColumnOptionValue]); // must here
let filterInformation; // must here
// end GLOBAL

// CONFIG COLUMN
const optionColumnList = [{
    name: 'Address',
    key: 'OrderAddress',
    type: 'text',
  },
  {
    name: 'Customer Email',
    key: 'CustomerEmail',
    type: 'text',
  },
  {
    name: 'Customer Name',
    key: 'CustomerName',
    type: 'text',
  },
  {
    name: 'Customer Phone',
    key: 'CustomerPhoneNumber',
    type: 'text',
  },
  {
    name: 'Date Created',
    key: 'OrderDate',
    type: 'date',
  },
  {
    name: 'Status',
    key: 'OrderStatus',
    type: 'text',
  },
  {
    name: 'Total Money',
    key: 'OrderTotalMoney',
    type: 'number',
  }
];

const tableUpdateLinkFormatter = new LinkFormatter(
  './update-order/',
  ['btn-warning', 'btn-square'],
  '<i class="fas fa-file-alt"></i>',
);
const currencyFormatter = new CurrencyFormatter('en-US', 'USD');
const dateFormatter = new DateFormatter('en-US', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
});

const tableColumnList = [{
    name: 'Name',
    key: 'CustomerName',
    width: 14,
  },
  {
    name: 'Email',
    key: 'CustomerEmail',
    width: 18,
  },
  {
    name: 'Phone',
    key: 'CustomerPhoneNumber',
    width: 9,
  },
  {
    name: 'Date',
    key: 'OrderDate',
    width: 8,
    formatFunction: (date) => {
      const dateAfterFormat = dateFormatter.formatDate(date);
      return dateAfterFormat;
    },
    formatPrameterKeyList: [
      'OrderDate'
    ]
  },
  {
    name: 'Total',
    key: 'OrderTotalMoney',
    width: 7,
    formatFunction: (number) => {
      const total = currencyFormatter.formatCurrency(number);
      return total;
    },
    formatPrameterKeyList: [
      'OrderTotalMoney'
    ]
  },
  {
    name: 'Status',
    key: 'OrderStatus',
    width: 9,
    formatFunction: (status) => {
      let statusWithColor = '';

      switch (status) {
        case 'Completed':
          statusWithColor = `<span class="text-success fw-bold">${status}</span>`;
          break;
        case 'Delivering':
          statusWithColor = `<span class="text-warning fw-bold">${status}</span>`;
          break;
        case 'Order Success':
          statusWithColor = `<span class="text-primary fw-bold">${status}</span>`;
          break;
        case 'Canceled':
          statusWithColor = `<span class="text-danger fw-bold">${status}</span>`;
          break;
        default:
          statusWithColor = 'Not have this case in overview/order.js';
      };

      return statusWithColor;
    },
    formatPrameterKeyList: [
      'OrderStatus'
    ]
  },
  {
    name: 'Handle',
    key: 'OrderHandle',
    width: 5,
    formatFunction: (id: string) => {
      const updateBtn = tableUpdateLinkFormatter.formatLink(id);
      return updateBtn;
    },
    formatPrameterKeyList: [
      'FireBaseKey'
    ]
  }
];
// end CONFIG COLUMN

// ADD TABLE EVENT
const addTableButtonEvent = null;
// end ADD TABLE EVENT

// TABLE CREATOR
const dataTable = document.querySelector('#js-data-table');
const tableCreator = new TableCreator(
  dataTable,
  addTableButtonEvent,
  tableColumnList,
  'rem',
);
const tableColumnKeyList = [];
tableColumnList.forEach((column) => {
  tableColumnKeyList.push(column.key);
});
// end TABLE CREATOR

// GENERAL
import {
  DataReader
} from '../../class/data-interactor.js';
import adminFilterCustomSelectCreator from './modules/create-custom-select.js';
import searchAssistantCreator from './modules/create-search-assistant.js';
import {
  filterDataToastify
} from './modules/filter-data.js';
import getDataArrayFormat from './modules/convert-data-to-array.js';
import createFilterEvent from './modules/create-filter-event.js';
import createFilterInformation from './modules/filter-information.js';

(function createAdminFilterCustomSelectCreator() {
  adminFilterCustomSelectCreator(
    optionColumnList,
    defaultColumnOptionValue
  );
})();
filterInformation = createFilterInformation(tableColumnKeyList);

searchAssistantCreator(
  defaultColumnOptionValue,
  dataFetchLink,
  searchSuggester,
);

const tableDataReader = new DataReader(dataFetchLink);
tableDataReader.readData((fullData) => {
  getDataArrayFormat(fullData, data);
  // console.log(data);

  const changeTableData = (
    filterInformation = Object(),
    changePageNum = Boolean(),
  ) => {
    const result = filterData(data, filterInformation);
    const displayedData = sliceData(result, filterInformation);
    tableCreator.convertData(displayedData);

    // console.log(filterInformation);

    tablePagingLinkCreator.changePagingLink(
      filterInformation.pageNum,
      filterInformation.resultQuantity,
      result.length,
      (pageNum) => {
        filterInformation.pageNum = pageNum;
        changeTableData(filterInformation, true);

        document.querySelector('#js-table-container').scrollIntoView();
      }
    );

    filterDataToastify(result.length, changePageNum, filterInformation.pageNum);
  };
  changeTableData(filterInformation, false);

  createFilterEvent(filterInformation, changeTableData);
});
// end GENERAL