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
  adminFilterCustomSelectCreator
} from './modules/create-custom-select.js';
import {
  searchAssistantCreator
} from './modules/create-search-assistant.js';
import {
  TableCreator
} from '../../class/table-creator.js';
import {
  tablePagingLinkCreator
} from './modules/tablePagingLinkCreator.js';

// api, default option key for filter
const dataFetchLink = 'https://tcm-shop-default-rtdb.firebaseio.com/categories.json';
const defaultColumnOptionValue = 'CategoryName';

// SEARCH SUGGESTER, FILTER
// todo: fix
const filterInformation = {
  'columnList': tableColumnKeyList,
  'searchValue': '',
  'searchMinValue': 'S',
  'searchMaxValue': 'H',
  'searchMode': 'searchByValue',
  'searchColumn': 'CategoryOrder',
  'orderColumn': 'CategoryOrder',
  'orderRule': 'DESC',
  'resultQuantity': resultQuantitySelect.getAttribute('value'),
  'pageNum': 1
};

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
// end SEARCH SUGGESTER, FILTER

// TABLE BUTTON EVENT
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
    deleteButton.addEventListener('click', function () {
      const categoryName = deleteButton.dataset.name;
      const categoryId = deleteButton.dataset.id;

      const deleteCategory = () => {
        tableDataDeleter.deleteData(
          categoryId,
          (data) => {
            if (data === null) {
              tableDataToastify.createToast(
                'success',
                `Delete Category - ${categoryName} completed`,
                2
              );

            } else {
              tableDataToastify.createToast(
                'danger',
                `Delete Category - ${categoryName} failed`,
                2
              );
            }

            (function changeTableData() {
              if (result.data.length > 0) {
                tableCreator.convertData(result.data);

                tablePagingLinkCreator.changePagingLink(
                  filterInformation.pageNum,
                  filterInformation.resultQuantity,
                  result.total,
                  (pageNum) => {
                    filterInformation.pageNum = pageNum;
                    changeTableData(filterInformation, true);
                  }
                );

              } else {
                --filterInformation.pageNum;
                changeTableData();
              };

              // tableDataReader.readData(
              //   filterInformation,
              //   (result) => {
              //     if (result.data.length > 0) {
              //       tableCreator.convertData(result.data);

              //       tablePagingLinkCreator.changePagingLink(
              //         filterInformation.pageNum,
              //         filterInformation.resultQuantity,
              //         result.total,
              //         function (pageNum) {
              //           filterInformation.pageNum = pageNum;
              //           changeTableData(filterInformation, true);
              //         },
              //       );

              //     } else {
              //       --filterInformation.pageNum;
              //       changeTableData();
              //     };
              //   },
              // );
            })();

            // (function updateSearchSuggestData() {
            //   tableDataReader.readData({
            //       'columnList': [
            //         searchColumnSelect.getAttribute('value'),
            //       ],
            //       'searchValue': '',
            //       'searchMode': 'searchByValue',
            //       'searchColumn': searchColumnSelect.getAttribute('value'),
            //       'orderRule': 'ASC',
            //       'orderColumn': searchColumnSelect.getAttribute('value'),
            //       'resultQuantity': 999999999999,
            //       'pageNum': 1
            //     },
            //     function (result) {
            //       let data = result.data;

            //       data = [
            //         ...new Map(data.map((item) => [item[searchColumnSelect.getAttribute('value')], item])).values(),
            //       ];

            //       searchSuggester.keyList = [searchColumnSelect.getAttribute('value')];
            //       searchSuggester.suggestData = data;
            //     },
            //   );
            // })();
          }
        );
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
      'CategoryName'
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

const tableDataReader = new DataReader(dataFetchLink);
tableDataReader.readData(fullData => {
  const tableColumnKeyList = [];
  tableColumnList.forEach(column => {
    tableColumnKeyList.push(column.key);
  });

  // *** can optimize
  const data =
    Object.keys(fullData).map((key) => {
      Object.keys(fullData[key]).map((column) => {
        let isDeleted = true;

        tableColumnKeyList.forEach(columnKey => {
          if (columnKey === column) {
            isDeleted = false;
          };
        });

        if (isDeleted) {
          delete fullData[key][column];
        };
      });

      fullData[key].FireBaseKey = key;
      return fullData[key];
    });
  // console.log(data);

  const searchByValueInput = document.querySelector('#js-overview-search-value');
  const searchByMinInput = document.querySelector('#js-overview-search-min');
  const searchByMaxInput = document.querySelector('#js-overview-search-max');
  const searchColumnSelect = document.querySelector('#js-overview-search-column');
  const orderColumnSelect = document.querySelector('#js-overview-order-column');
  const orderRuleSelect = document.querySelector('#js-overview-order-rule');
  const resultQuantitySelect = document.querySelector('#js-overview-rows');

  const changeTableData = (
    filterInformation = Object(),
    changePageNum = Boolean(),
  ) => {
    // *** can optimize
    const filterDataBySearch = (item) => {
      const searchMode = filterInformation.searchMode;
      const searchColumn = filterInformation.searchColumn;
      let columnValue;
      if (isNaN(item[searchColumn])) {
        columnValue = item[searchColumn].toLowerCase();

      } else {
        columnValue = item[searchColumn]
      };

      let isPassed = true;

      if (searchMode === 'searchByValue') {
        const searchValue = filterInformation.searchValue.toLowerCase();
        columnValue = columnValue.toString();

        if (searchValue !== '') {
          const searchValueList = searchValue.trim().split(/\s+/);
          isPassed = false;

          searchValueList.forEach(searchValue => {
            if (columnValue.includes(searchValue)) {
              isPassed = true;
            };
          });
        };
      } else if (searchMode === 'searchByMinMax') {
        const searchMin = filterInformation.searchMinValue.toLowerCase();
        const searchMax = filterInformation.searchMaxValue.toLowerCase();

        if (
          (
            searchMin !== '' &&
            searchMax !== '' &&
            (
              columnValue > searchMax ||
              columnValue < searchMin
            )
          ) ||
          (
            searchMin !== '' &&
            columnValue < searchMin
          ) ||
          (
            searchMax !== '' &&
            columnValue > searchMax
          )
        ) {
          isPassed = false;
        };
      };

      return isPassed;
    };

    const result = (() => {
      const result = data.filter(filterDataBySearch);
      result.sort((a, b) => {
        const orderRule = filterInformation.orderRule;
        const orderColumn = filterInformation.orderColumn;

        if (orderRule === 'ASC') {
          return (a[orderColumn] < b[orderColumn]) ? 1 : -1;

        } else if (orderRule === 'DESC') {
          return (a[orderColumn] > b[orderColumn]) ? 1 : -1;
        };
      });

      return result;
    })();

    // console.log(filterInformation);
    // console.log(result);

    (function showTableData() {
      const startIndex =
        (filterInformation.pageNum - 1) * filterInformation.resultQuantity;
      const endIndex = startIndex + filterInformation.resultQuantity;
      const tableResult = result.slice(
        startIndex,
        endIndex
      );
      tableCreator.convertData(tableResult);
    })();

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

    // *** can optimize
    (function createToastify() {
      const toastifyDisplayTime = 2;
      if (changePageNum === false) {
        const resultQuantity = result.length;

        if (resultQuantity > 0) {
          tableDataToastify.createToast(
            'success',
            `Filter data successully return ${resultQuantity} ${(resultQuantity === 1) ? 'row' : 'rows'} result`,
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
    })();
  };
  changeTableData(filterInformation, false);

  // *** can optimize
  (function createFilterEvent() {
    const confirmSearchButton = document.querySelector('#js-confirm-search-button');
    const searchByValueModeRadio = document.querySelector('#js-search-by-value');
    const searchByMinMaxModeRadio = document.querySelector('#js-search-by-min-max');
    confirmSearchButton.addEventListener('click', () => {
      if (searchByValueModeRadio.checked === true) {
        filterInformation.searchMode = 'searchByValue';
        filterInformation.searchValue = searchByValueInput.value;

      } else if (searchByMinMaxModeRadio.checked === true) {
        filterInformation.searchMode = 'searchByMinMax';
        filterInformation.searchMinValue = searchByMinInput.value;
        filterInformation.searchMaxValue = searchByMaxInput.value;
      };

      const searchColumnValue = searchColumnSelect.getAttribute('value');
      filterInformation.searchColumn = searchColumnValue;

      filterInformation.pageNum = 1;
      changeTableData(filterInformation, false);
    });
    orderColumnSelect.addEventListener('DOMSubtreeModified', () => {
      const orderColumnValue = orderColumnSelect.getAttribute('value');
      if (orderColumnValue !== filterInformation.orderColumn) {
        filterInformation.pageNum = 1;
        filterInformation.orderColumn = orderColumnValue;
        changeTableData(filterInformation, false);
      };
    });
    orderRuleSelect.addEventListener('DOMSubtreeModified', () => {
      const orderRuleValue = orderRuleSelect.getAttribute('value');
      if (orderRuleValue !== filterInformation.orderRule) {
        filterInformation.pageNum = 1;
        filterInformation.orderRule = orderRuleValue;
        changeTableData(filterInformation, false);
      };
    });
    resultQuantitySelect.addEventListener('DOMSubtreeModified', () => {
      const resultQuantityValue = resultQuantitySelect.getAttribute('value');
      if (resultQuantityValue !== filterInformation.resultQuantity) {
        filterInformation.pageNum = 1;
        filterInformation.resultQuantity = resultQuantityValue;
        changeTableData(filterInformation, false);
      };
    });
  })();
});