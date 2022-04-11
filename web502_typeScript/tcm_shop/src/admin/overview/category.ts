import {
  LinkFormatter,
  ButtonFormatter,
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
const dataFetchLink: string = 'https://tcm-shop-default-rtdb.firebaseio.com/categories';
const defaultColumnOptionValue: string = 'CategoryName';
// end FETCH LINK, DEFAULT OPTION

// GLOBAL
let data: Array<Object> = []; // must here
const searchSuggester: Suggester = new Suggester([{}], [defaultColumnOptionValue]); // must here
import FilterInformation from '../interfaces/filterInformation';
let filterInformation: FilterInformation; // must here
// end GLOBAL

// CONFIG COLUMN
const optionColumnList: Array<OptionColumnItem> = [{
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

const tableUpdateLinkFormatter: LinkFormatter = new LinkFormatter(
  './update-category/',
  ['btn-warning', 'btn-square'],
  '<i class="fas fa-file-alt"></i>',
);
const tableDeleteButtonFormatter: ButtonFormatter = new ButtonFormatter(
  ['btn-danger', 'btn-square', 'me-2', 'js-delete-data'],
  '<i class="fas fa-trash"></i>',
);
const tableColumnList: Array<TableColumnItem> = [{
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
      const deleteBtn: string = tableDeleteButtonFormatter.formatButton(
        [{
          key: 'id',
          value: id
        }, {
          key: 'name',
          value: name
        }, {
          key: 'product-quantity',
          value: String(productQuantity)
        }]
      );
      const updateBtn: string = tableUpdateLinkFormatter.formatLink(id);
      return deleteBtn + updateBtn;
    },
    formatPrameterKeyList: [
      'FireBaseKey',
      'CategoryName',
      'CategoryProductQuantity'
    ]
  }
];
// end CONFIG COLUMN

// ADD TABLE EVENT
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

  deleteButtonList.forEach((deleteButton) => {
    deleteButton.addEventListener('click', () => {
      const categoryName: string = deleteButton.dataset.name;
      const categoryId: string = deleteButton.dataset.id;
      // console.log(categoryId);
      const categoryProductQuantity: number = Number(deleteButton.dataset.productQuantity);

      const afterDeleteHandle = (deleteResult: null | undefined) => {
        if (deleteResult === null) {
          tableDataToastify.createToast(
            'success',
            `Delete Category - ${categoryName} completed`,
            2
          );
          data.splice(data.findIndex((item: { [key: string]: any }) => {
            item.FireBaseKey === categoryId
          }), 1);
          searchSuggester.suggestData = data;

          (function changeTableDataAfterDelete(): void {
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