import {
  LinkFormatter,
  ButtonFormatter,
  ImageFormatter,
  CurrencyFormatter
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
let data: Array<Object> = []; // must here
const searchSuggester = new Suggester([{}], [defaultColumnOptionValue]); // must here
import filterInformation from './interfaces/filterInformation';
let filterInformation: filterInformation; // must here
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
const imageFormatter = new ImageFormatter(
  []
);
const currencyFormatter = new CurrencyFormatter('en-US', 'USD');

const tableColumnList = [{
    name: 'Name',
    key: 'ProductName',
    width: 20,
  },
  {
    name: 'Image',
    key: 'ProductImage',
    width: 6,
    formatFunction: (
      [base64 = String(), altText = String()]
    ) => {
      const img = imageFormatter.formatImage(base64, altText);
      return img;
    },
    formatPrameterKeyList: [
      'ProductImage',
      'ProductName'
    ]
  },
  {
    name: 'Price',
    key: 'ProductPrice',
    width: 7,
    formatFunction: (number: number) => {
      const price = currencyFormatter.formatCurrency(number);
      return price;
    },
    formatPrameterKeyList: [
      'ProductPrice'
    ]
  },
  {
    name: 'Quantity',
    key: 'ProductQuantity',
    width: 7,
  },
  {
    name: 'Sold',
    key: 'ProductSoldQuantity',
    width: 5.5,
  },
  {
    name: 'Views',
    key: 'ProductViews',
    width: 6,
  },
  {
    name: 'Handle',
    key: 'ProductHandle',
    width: 7,
    formatFunction: (
      [id = String(), name = String(), soldQuantity = Number(), category = String()]
    ) => {
      const deleteBtn = tableDeleteButtonFormatter.formatButton(
        [{
          key: 'id',
          value: id
        }, {
          key: 'name',
          value: name
        }, {
          key: 'sold-quantity',
          value: String(soldQuantity)
        }, {
          key: 'category',
          value: category
        }]
      );
      const updateBtn = tableUpdateLinkFormatter.formatLink(id);
      return deleteBtn + updateBtn;
    },
    formatPrameterKeyList: [
      'FireBaseKey',
      'ProductName',
      'ProductSoldQuantity',
      'ProductCategory'
    ]
  }
];
// end CONFIG COLUMN

// ADD TABLE EVENT
import {
  DataUpdater
} from '../../class/data-interactor.js';
const tableDataToastify = new ToastCreator(
  'bottom',
  16,
  'right',
  16
);
const tableDataDeleter = new DataDeleter(dataFetchLink);
const confirmDeletePopupCreator = new ConfirmDangerActionPopupCreator('Delete');

const addTableButtonEvent: Function | null = () => {
  const deleteButtonList: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.js-delete-data');

  deleteButtonList.forEach((deleteButton) => {
    deleteButton.addEventListener('click', () => {
      const productName = deleteButton.dataset.name;
      const productId = deleteButton.dataset.id;
      const productSoldQuantity = Number(deleteButton.dataset.soldQuantity);
      const productCategory = deleteButton.dataset.category;
      console.log(productCategory);

      const afterDeleteHandle = (deleteResult: null | undefined) => {
        if (deleteResult === null) {
          tableDataToastify.createToast(
            'success',
            `Delete Product - ${productName} completed`,
            2
          );
          data.splice(data.findIndex((item: { [key: string]: any }) => {
            item.FireBaseKey === productId
          }), 1);
          searchSuggester.suggestData = data;
          // console.log(data);

          (function changeTableDataAfterDelete() {
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
              changeTableDataAfterDelete();
            };
          })();

          (function decreaseCategoryProductQuantity(categoryName: string) {
            const categoriesFetchLink = 'https://tcm-shop-default-rtdb.firebaseio.com/categories';
            const categoryNameColumnKey = 'CategoryName';
            const categoryProductQuantityColumnKey = 'CategoryProductQuantity';
            const categoriesInformationReader = new DataReader(categoriesFetchLink);

            const categoryProductQuantityFetchLinkPrefix = 'https://tcm-shop-default-rtdb.firebaseio.com/categories/';
            const categoryProductQuantityDataUpdater = new DataUpdater(categoryProductQuantityFetchLinkPrefix);

            const updateCategoryProductQuantity = (
              firebaseKey: string,
              categoryProductQuantity: number
            ) => {
              const categoryProductQuantitySuffixes = firebaseKey + '/' + categoryProductQuantityColumnKey;
              const newCategoryProductQuantity = categoryProductQuantity - 1;

              categoryProductQuantityDataUpdater.updateData(
                categoryProductQuantitySuffixes,
                newCategoryProductQuantity,
                updateCategoryProductQuantitySuccessFn,
                updateCategoryProductQuantityFailedFn
              );
            };

            const updateCategoryProductQuantitySuccessFn = () => {
              setTimeout(() => {
                tableDataToastify.createToast(
                  'success',
                  `Update overide category product quantity of "${categoryName}" completed`,
                  2
                );
              }, 100);
            };
            const updateCategoryProductQuantityFailedFn = () => {
              setTimeout(() => {
                tableDataToastify.createToast(
                  'danger',
                  'Update overide pcategory product quantity failed',
                  2
                );
              }, 100);
            };

            categoriesInformationReader.readData((fullData: { [key: string]: any }) => {
              Object.keys(fullData).map((firebaseKey) => {
                if (fullData[firebaseKey][categoryNameColumnKey] === categoryName) {
                  updateCategoryProductQuantity(
                    firebaseKey,
                    fullData[firebaseKey][categoryProductQuantityColumnKey]
                  );
                };
              });
            });
          })(productCategory);

        } else {
          tableDataToastify.createToast(
            'danger',
            `Delete Product - ${productName} failed`,
            2
          );
        };
      };

      const deleteProduct = () => {
        if (productSoldQuantity === 0) {
          tableDataDeleter.deleteData(
            productId,
            afterDeleteHandle
          );

        } else {
          tableDataToastify.createToast(
            'warning',
            `The number of products sold of "${productName}" must be 0 to be deleted`,
            2,
          );
        };
      };

      confirmDeletePopupCreator.createConfirmDangerActionPopup(
        `
          Are you sure to delete Product - ${productName} ?
          <br>
          (<span class="text-danger fw-bold">*</span>) 
          The product must not be in any order to be deleted
        `,
        deleteProduct
      );
    });
  });
};
// end ADD TABLE EVENT

// TABLE CREATOR
const dataTable: HTMLElement = document.querySelector('#js-data-table');
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
tableDataReader.readData((fullData: { [key: string]: any }) => {
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

const changeTableData = (filterInformation: filterInformation, changePageNum: boolean) => {};
// end GENERAL