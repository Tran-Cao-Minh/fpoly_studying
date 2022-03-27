import {
  LinkFormatter,
  ButtonFormatter,
} from '../../class/data-formatter.js';
import {
  ToastCreator
} from '../../class/toast-creator.js';
import {
  DataDeleter
} from '../../class/data-interactor.js';
import {
  ConfirmDangerActionPopupCreator
} from '../../class/popup-creator.js';
import {
  Suggester
} from '../../class/suggester.js';
import {
  DataReader
} from '../../class/data-interactor.js';
import {
  TableCreator
} from '../../class/table-creator.js';
import adminFilterCustomSelectCreator from './modules/create-custom-select.js';
import searchAssistantCreator from './modules/create-search-assistant.js';
import tablePagingLinkCreator from './modules/table-paging-link-creator.js';
import {
  filterData,
  sliceData,
  filterDataToastify
} from './modules/filter-data.js';
import getDataArrayFormat from './modules/convert-data-to-array.js';
import createFilterEvent from './modules/create-filter-event.js';
import createFilterInformation from './modules/filter-information.js';

// api, default option key for filter
const dataFetchLink = 'https://tcm-shop-default-rtdb.firebaseio.com/categories';
const defaultColumnOptionValue = 'CategoryName';

// SEARCH SUGGESTER
(function createAdminFilterCustomSelectCreator() {
  const columnList = [{
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
    }
  ];
  adminFilterCustomSelectCreator(
    columnList,
    defaultColumnOptionValue
  );
})();

const searchSuggester = new Suggester([{}], [defaultColumnOptionValue]);
searchAssistantCreator(
  defaultColumnOptionValue,
  dataFetchLink,
  searchSuggester,
);
// end SEARCH SUGGESTER

// TABLE BUTTON EVENT
let data = []; // must here
const tableDataToastify = new ToastCreator(
  'bottom',
  16,
  'right',
  16
);
const tableDataDeleter = new DataDeleter(dataFetchLink);
const confirmDeletePopupCreator = new ConfirmDangerActionPopupCreator('Delete');

const addTableButtonEvent = () => {
  const deleteButtonList = document.querySelectorAll('.js-delete-data');

  deleteButtonList.forEach(deleteButton => {
    deleteButton.addEventListener('click', () => {
      const categoryName = deleteButton.dataset.name;
      const categoryId = deleteButton.dataset.id;
      // console.log(categoryId);
      const categoryProductQuantity = Number(deleteButton.dataset.productQuantity);

      const afterDeleteHandle = (deleteResult) => {
        if (deleteResult === null) {
          tableDataToastify.createToast(
            'success',
            `Delete Category - ${categoryName} completed`,
            2
          );
          data.splice(data.findIndex((item) => {
            item.FireBaseKey === categoryId
          }), 1);
          searchSuggester.suggestData = data;

          (function changeTableData() {
            const result = filterData(data, filterInformation);
            const displayedData = sliceData(result, filterInformation);

            if (displayedData.length > 0) {
              tableCreator.convertData(displayedData);

              tablePagingLinkCreator.changePagingLink(
                filterInformation.pageNum,
                filterInformation.resultQuantity,
                result.length,
                (pageNum) => {
                  filterInformation.pageNum = pageNum;
                  changeTableData(filterInformation, true);
                }
              );

            } else {
              --filterInformation.pageNum;
              changeTableData();
            };
          })();

        } else {
          tableDataToastify.createToast(
            'danger',
            `Delete Category - ${categoryName} failed`,
            2
          );
        };
      };

      const deleteCategory = () => {
        if (categoryProductQuantity === 0) {
          tableDataDeleter.deleteData(
            categoryId,
            afterDeleteHandle
          );

        } else {
          tableDataToastify.createToast(
            'warning',
            `The number of products in Category - ${categoryName} must be 0 to be deleted`,
            2,
          );
        };
      };

      confirmDeletePopupCreator.createConfirmDangerActionPopup(
        `
          Are you sure to delete Category - ${categoryName} ?
          <br>
          (<span class="text-danger fw-bold">*</span>) 
          The number of products in the category must be 0 to be deleted
        `,
        deleteCategory
      );
    });
  });
};
// end TABLE BUTTON EVENT

// TABLE FORMAT for tableColumnList
const tableUpdateLinkFormatter = new LinkFormatter(
  './update-category/',
  ['btn-warning', 'btn-square'],
  '<i class="fas fa-file-alt"></i>',
);
const tableDeleteButtonFormatter = new ButtonFormatter(
  ['btn-danger', 'btn-square', 'me-2', 'js-delete-data'],
  '<i class="fas fa-trash"></i>',
);
// end TABLE FORMAT for tableColumnList

// CREATE TABLE CREATOR
const dataTable = document.querySelector('#js-data-table');
const tableColumnList = [{
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
    key: 'CategoryHandle',
    width: 7,
    formatFunction: (
      [id = String(), name = String(), productQuantity = Number()]
    ) => {
      const deleteBtn = tableDeleteButtonFormatter.formatButton(
        [{
          key: 'id',
          value: id
        }, {
          key: 'name',
          value: name
        }, {
          key: 'product-quantity',
          value: productQuantity
        }]
      );
      const updateBtn = tableUpdateLinkFormatter.formatLink(id);
      return deleteBtn + updateBtn;
    },
    formatPrameterKeyList: [
      'FireBaseKey',
      'CategoryName',
      'CategoryProductQuantity'
    ]
  }
];
const tableCreator = new TableCreator(
  dataTable,
  addTableButtonEvent,
  tableColumnList,
  'rem',
);
// end CREATE TABLE CREATOR

// FILTER
const tableColumnKeyList = [];
tableColumnList.forEach(column => {
  tableColumnKeyList.push(column.key);
});
const filterInformation = createFilterInformation(tableColumnKeyList);
// end FILTER

const tableDataReader = new DataReader(dataFetchLink);
tableDataReader.readData(fullData => {
  data = getDataArrayFormat(fullData, tableColumnKeyList);
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