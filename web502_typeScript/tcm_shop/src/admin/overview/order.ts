import {
  LinkFormatter,
  CurrencyFormatter,
  DateFormatter
} from '../../class/data-formatter';
import tablePagingLinkCreator from './modules/table-paging-link-creator';

import {
  filterData,
  sliceData
} from './modules/filter-data';
import {
  Suggester
} from '../../class/suggester';
import {
  TableCreator
} from '../../class/table-creator';

// FETCH LINK, DEFAULT OPTION
const dataFetchLink: string = 'https://tcm-shop-default-rtdb.firebaseio.com/orders';
const defaultColumnOptionValue: string = 'CustomerEmail';
// end FETCH LINK, DEFAULT OPTION

// GLOBAL
let data: Array<Object> = []; // must here
const searchSuggester: Suggester = new Suggester([{}], [defaultColumnOptionValue]); // must here
import FilterInformation from '../interfaces/filterInformation';
let filterInformation: FilterInformation; // must here
// end GLOBAL

// CONFIG COLUMN
const optionColumnList: Array<OptionColumnItem> = [{
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

const tableUpdateLinkFormatter: LinkFormatter = new LinkFormatter(
  './update-order/',
  ['btn-warning', 'btn-square'],
  '<i class="fas fa-file-alt"></i>',
);
const currencyFormatter: CurrencyFormatter = new CurrencyFormatter('en-US', 'USD');
const dateFormatter: DateFormatter = new DateFormatter('en-US', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
});

import TableColumnItem from '../interfaces/tableColumnItem';
const tableColumnList: Array<TableColumnItem> = [{
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
    formatFunction: (date: string) => {
      const dateAfterFormat: string = dateFormatter.formatDate(date);
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
    formatFunction: (number: number) => {
      const total: string = currencyFormatter.formatCurrency(number);
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
    formatFunction: (status: string) => {
      let statusWithColor: string = '';

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
          statusWithColor = 'Not have this case in overview/order';
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
const addTableButtonEvent: Function | null = null;
// end ADD TABLE EVENT

// TABLE CREATOR
const dataTable: HTMLTableElement = document.querySelector('#js-data-table');
const tableCreator = new TableCreator(
  dataTable,
  addTableButtonEvent,
  tableColumnList,
  'rem',
);
const tableColumnKeyList: Array<string> = [];
tableColumnList.forEach((column) => {
  tableColumnKeyList.push(column.key);
});
// end TABLE CREATOR

// GENERAL
import {
  DataReader
} from '../../class/data-interactor';
import adminFilterCustomSelectCreator from './modules/create-custom-select';
import searchAssistantCreator from './modules/create-search-assistant';
import {
  filterDataToastify
} from './modules/filter-data';
import getDataArrayFormat from './modules/convert-data-to-array';
import createFilterEvent from './modules/create-filter-event';
import createFilterInformation from './modules/filter-information';
import OptionColumnItem from '../interfaces/optionColumnItem';

(function createAdminFilterCustomSelectCreator(): void {
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
tableDataReader.readData((fullData: { [key: string]: any }) => {
  getDataArrayFormat(fullData, data);
  // console.log(data);

  const changeTableData = (
    filterInformation: FilterInformation,
    changePageNum: boolean,
  ): void => {
    const result: any = filterData(data, filterInformation);
    const displayedData: any = sliceData(result, filterInformation);
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