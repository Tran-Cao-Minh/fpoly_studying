import {
  LinkFormatter,
  ButtonFormatter,
  ImageFormatter,
  CurrencyFormatter
} from '../../class/data-formatter';
import {
  ToastCreator
} from '../../class/toast-creator';
import {
  DataDeleter
} from '../../class/data-interactor';
import {
  ConfirmDangerActionPopupCreator
} from '../../class/popup-creator';
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
const dataFetchLink: string = 'https://tcm-shop-default-rtdb.firebaseio.com/products';
const defaultColumnOptionValue: string = 'ProductName';
// end FETCH LINK, DEFAULT OPTION

// GLOBAL
let data: Array<{ [key: string]: any }> = []; // must here
const searchSuggester: Suggester = new Suggester([{}], [defaultColumnOptionValue]); // must here
import FilterInformation from '../interfaces/filterInformation';
let filterInformation: FilterInformation; // must here
// end GLOBAL

// CONFIG COLUMN
const optionColumnList: Array<OptionColumnItem> = [{
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

const tableUpdateLinkFormatter: LinkFormatter = new LinkFormatter(
  './update-product/',
  ['btn-warning', 'btn-square'],
  '<i class="fas fa-file-alt"></i>',
);
const tableDeleteButtonFormatter: ButtonFormatter = new ButtonFormatter(
  ['btn-danger', 'btn-square', 'me-2', 'js-delete-data'],
  '<i class="fas fa-trash"></i>',
);
const imageFormatter: ImageFormatter = new ImageFormatter(
  []
);
const currencyFormatter: CurrencyFormatter = new CurrencyFormatter('en-US', 'USD');

const tableColumnList: Array<TableColumnItem> = [{
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
      const img: string = imageFormatter.formatImage(base64, altText);
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
      const price: string = currencyFormatter.formatCurrency(number);
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
      const deleteBtn: string = tableDeleteButtonFormatter.formatButton(
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
      const updateBtn: string = tableUpdateLinkFormatter.formatLink(id);
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
} from '../../class/data-interactor';
const tableDataToastify: ToastCreator = new ToastCreator(
  'bottom',
  16,
  'right',
  16
);
const tableDataDeleter: DataDeleter = new DataDeleter(dataFetchLink);
const confirmDeletePopupCreator: ConfirmDangerActionPopupCreator 
  = new ConfirmDangerActionPopupCreator('Delete');

const addTableButtonEvent: Function | null = () => {
  const deleteButtonList: NodeListOf<HTMLButtonElement> = document.querySelectorAll('-delete-data');

  deleteButtonList.forEach((deleteButton: HTMLButtonElement) => {
    deleteButton.addEventListener('click', () => {
      const productName: string = deleteButton.dataset.name;
      const productId: string = deleteButton.dataset.id;
      const productSoldQuantity: number = Number(deleteButton.dataset.soldQuantity);
      const productCategory: string = deleteButton.dataset.category;
      // console.log(productCategory);

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
            const result: any = filterData(data, filterInformation);
            const displayedData: any = sliceData(result, filterInformation);

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

          (function decreaseCategoryProductQuantity(categoryName: string): void {
            const categoriesFetchLink: string = 'https://tcm-shop-default-rtdb.firebaseio.com/categories';
            const categoryNameColumnKey: string = 'CategoryName';
            const categoryProductQuantityColumnKey: string = 'CategoryProductQuantity';
            const categoriesInformationReader: DataReader = new DataReader(categoriesFetchLink);

            const categoryProductQuantityFetchLinkPrefix: string = 'https://tcm-shop-default-rtdb.firebaseio.com/categories/';
            const categoryProductQuantityDataUpdater: DataUpdater = new DataUpdater(categoryProductQuantityFetchLinkPrefix);

            const updateCategoryProductQuantity = (
              firebaseKey: string,
              categoryProductQuantity: number
            ): void => {
              const categoryProductQuantitySuffixes: string = firebaseKey + '/' + categoryProductQuantityColumnKey;
              const newCategoryProductQuantity: number = categoryProductQuantity - 1;

              categoryProductQuantityDataUpdater.updateData(
                categoryProductQuantitySuffixes,
                newCategoryProductQuantity,
                updateCategoryProductQuantitySuccessFn,
                updateCategoryProductQuantityFailedFn
              );
            };

            const updateCategoryProductQuantitySuccessFn = (): void => {
              setTimeout(() => {
                tableDataToastify.createToast(
                  'success',
                  `Update overide category product quantity of "${categoryName}" completed`,
                  2
                );
              }, 100);
            };
            const updateCategoryProductQuantityFailedFn = (): void => {
              setTimeout(() => {
                tableDataToastify.createToast(
                  'danger',
                  'Update overide pcategory product quantity failed',
                  2
                );
              }, 100);
            };

            categoriesInformationReader.readData((fullData: { [key: string]: any }) => {
              Object.keys(fullData).map((firebaseKey: string) => {
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
const dataTable: HTMLTableElement = document.querySelector('#js-data-table');
const tableCreator: TableCreator = new TableCreator(
  dataTable,
  addTableButtonEvent,
  tableColumnList,
  'rem',
);
const tableColumnKeyList: Array<string> = [];
tableColumnList.forEach((column: TableColumnItem) => {
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
import TableColumnItem from '../interfaces/tableColumnItem';

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

const tableDataReader: DataReader = new DataReader(dataFetchLink);
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

const changeTableData = (filterInformation: FilterInformation, changePageNum: boolean) => {};
// end GENERAL