import filterInformation from "../../interfaces/filterInformation";

export const filterData = (
  data: Array<{ [key: string]: any }>,
  filterInformation: filterInformation
): any => {
  const copyData: any = JSON.parse(JSON.stringify(data)); // deep clone
  const filterDataBySearch = (item: { [key: string]: any }) => {
    const searchMode: string = filterInformation.searchMode;
    const searchColumn: string = filterInformation.searchColumn;
    let columnValue: string;
    if (isNaN(item[searchColumn])) {
      columnValue = item[searchColumn].toLowerCase();

    } else {
      columnValue = item[searchColumn]
    };

    let isPassed: boolean = true;

    if (searchMode === 'searchByValue') {
      const searchValue: string = filterInformation.searchValue.toLowerCase();
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
      const searchMin: string = filterInformation.searchMinValue.toLowerCase();
      const searchMax: string = filterInformation.searchMaxValue.toLowerCase();

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
    const result: any = copyData.filter(filterDataBySearch);
    result.sort((a: { [key: string]: any }, b: { [key: string]: any }) => {
      const orderRule: 'ASC' | 'DESC' = filterInformation.orderRule;
      const orderColumn: string = filterInformation.orderColumn;

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
  result: Array<{ [key: string]: any }>,
  filterInformation: filterInformation
): any => {
  const startIndex: number =
    (filterInformation.pageNum - 1) * filterInformation.resultQuantity;
  const endIndex: number = startIndex + Number(filterInformation.resultQuantity);

  return result.slice(
    startIndex,
    endIndex
  );
};

import {
  ToastCreator
} from '../../../class/toast-creator';
const tableDataToastify = new ToastCreator(
  'bottom',
  16,
  'right',
  16
);
export const filterDataToastify = (
  resultQuantity: number,
  changePageNum: boolean,
  pageNum: number,
): void => {
  const toastifyDisplayTime: number = 2;
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