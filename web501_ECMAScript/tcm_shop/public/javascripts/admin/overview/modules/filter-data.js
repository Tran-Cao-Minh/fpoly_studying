export const filterData = (
  data = [Object()],
  filterInformation = {
    'columnList': [String()],
    'searchValue': String(),
    'searchMinValue': String(),
    'searchMaxValue': String(),
    'searchMode': 'searchByValue' | 'searchByMinMax',
    'searchColumn': String(),
    'orderColumn': String(),
    'orderRule': String(),
  }
) => {
  const copyData = JSON.parse(JSON.stringify(data)); // deep clone
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
    const result = copyData.filter(filterDataBySearch);
    result.sort((a, b) => {
      const orderRule = filterInformation.orderRule;
      const orderColumn = filterInformation.orderColumn;

      if (orderRule === 'ASC') {
        return (a[orderColumn] > b[orderColumn]) ? 1 : -1;

      } else if (orderRule === 'DESC') {
        return (a[orderColumn] < b[orderColumn]) ? 1 : -1;
      };
    });

    return result;
  })();

  return result;
};

export const sliceData = (
  result = [Object()],
  filterInformation = {
    'resultQuantity': Number(),
    'pageNum': Number(),
  }
) => {
  const startIndex =
    (filterInformation.pageNum - 1) * filterInformation.resultQuantity;
  const endIndex = startIndex + Number(filterInformation.resultQuantity);

  return result.slice(
    startIndex,
    endIndex
  );
};

import {
  ToastCreator
} from '../../../class/toast-creator.js';
const tableDataToastify = new ToastCreator(
  'bottom',
  16,
  'right',
  16
);
export const filterDataToastify = (
  resultQuantity = Number(),
  changePageNum = Boolean(),
  pageNum = Number(),
) => {
  const toastifyDisplayTime = 2;
  if (changePageNum === false) {
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
      `Switch to page ${pageNum} completed`,
      toastifyDisplayTime,
    );
  };
};