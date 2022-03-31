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
const dataFetchLink = 'https://tcm-shop-default-rtdb.firebaseio.com/products';
const defaultColumnOptionValue = 'ProductName';
// end FETCH LINK, DEFAULT OPTION

// GLOBAL
let data = []; // must here
const searchSuggester = new Suggester([{}], [defaultColumnOptionValue]); // must here
let filterInformation; // must here
// end GLOBAL

// CONFIG COLUMN
const optionColumnList = [{
    name: 'Name',
    key: 'ProductName',
    type: 'text',
  },
  {
    name: 'Category',
    key: 'ProductCategory',
    type: 'text',
  },
  {
    name: 'Dimensions',
    key: 'ProductDimensions',
    type: 'text',
  },
  {
    name: 'Display',
    key: 'ProductDisplay',
    type: 'text',
  },
  {
    name: 'Order',
    key: 'ProductOrder',
    type: 'number',
  },
  {
    name: 'Pages',
    key: 'ProductPages',
    type: 'number',
  },
  {
    name: 'Price',
    key: 'ProductPrice',
    type: 'number',
  },
  {
    name: 'Publish Date',
    key: 'ProductPublishDate',
    type: 'date',
  },
  {
    name: 'Publisher',
    key: 'ProductPublisher',
    type: 'text',
  },
  {
    name: 'Quantity',
    key: 'ProductQuantity',
    type: 'number',
  },
  {
    name: 'Sale Percent',
    key: 'ProductSalePercent',
    type: 'number',
  },
  {
    name: 'Tag',
    key: 'ProductTag',
    type: 'text',
  },
  {
    name: 'View',
    key: 'ProductViews',
    type: 'number',
  },
];

const tableUpdateLinkFormatter = new LinkFormatter(
  './update-product/',
  ['btn-warning', 'btn-square'],
  '<i class="fas fa-file-alt"></i>',
);
const tableDeleteButtonFormatter = new ButtonFormatter(
  ['btn-danger', 'btn-square', 'me-2', 'js-delete-data'],
  '<i class="fas fa-trash"></i>',
);
const tableColumnList = [{
    name: 'Name',
    key: 'ProductName',
    width: 12,
  },
  {
    name: 'Price',
    key: 'ProductPrice',
    width: 6,
  },
  {
    name: 'Quantity',
    key: 'ProductQuantity',
    width: 7,
  },
  {
    name: 'Image',
    key: 'ProductImage',
    width: 7,
  },
  {
    name: 'Handle',
    key: 'ProductHandle',
    width: 7,
    formatFunction: (
      [id = String(), name = String()]
    ) => {
      const deleteBtn = tableDeleteButtonFormatter.formatButton(
        [{
          key: 'id',
          value: id
        }, {
          key: 'name',
          value: name
        }]
      );
      const updateBtn = tableUpdateLinkFormatter.formatLink(id);
      return deleteBtn + updateBtn;
    },
    formatPrameterKeyList: [
      'FireBaseKey',
      'ProductName'
    ]
  }
];
// end CONFIG COLUMN

// ADD TABLE EVENT
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
tableColumnList.forEach(column => {
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