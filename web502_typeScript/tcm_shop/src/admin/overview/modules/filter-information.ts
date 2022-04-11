const searchByValueInput = <HTMLInputElement>document.querySelector('#js-overview-search-value');
const searchByMinInput = <HTMLInputElement>document.querySelector('#js-overview-search-min');
const searchByMaxInput = <HTMLInputElement>document.querySelector('#js-overview-search-max');
const searchColumnSelect = document.querySelector('#js-overview-search-column');
const orderColumnSelect = document.querySelector('#js-overview-order-column');
const orderRuleSelect = document.querySelector('#js-overview-order-rule');
const resultQuantitySelect = document.querySelector('#js-overview-rows');

import filterInformation from '../interfaces/filterInformation';
const createFilterInformation = (tableColumnKeyList: Array<string>) => {
   const filterInformation: filterInformation = {
    'columnList': tableColumnKeyList,
    'searchValue': searchByValueInput.value,
    'searchMinValue': searchByMinInput.value,
    'searchMaxValue': searchByMaxInput.value,
    'searchMode': 'searchByValue',
    'searchColumn': searchColumnSelect.getAttribute('value'),
    'orderColumn': orderColumnSelect.getAttribute('value'),
    'orderRule': orderRuleSelect.getAttribute('value'),
    'resultQuantity': Number(resultQuantitySelect.getAttribute('value')),
    'pageNum': 1
  };

  return filterInformation;
};

export default createFilterInformation;