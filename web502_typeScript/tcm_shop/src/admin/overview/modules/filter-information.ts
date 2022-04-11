const searchByValueInput = <HTMLInputElement>document.querySelector('#js-overview-search-value');
const searchByMinInput = <HTMLInputElement>document.querySelector('#js-overview-search-min');
const searchByMaxInput = <HTMLInputElement>document.querySelector('#js-overview-search-max');
const searchColumnSelect = <HTMLElement>document.querySelector('#js-overview-search-column');
const orderColumnSelect = <HTMLElement>document.querySelector('#js-overview-order-column');
const orderRuleSelect = <HTMLElement>document.querySelector('#js-overview-order-rule');
const resultQuantitySelect = <HTMLElement>document.querySelector('#js-overview-rows');

import FilterInformation from '../../interfaces/filterInformation';
const createFilterInformation = (tableColumnKeyList: Array<string>): FilterInformation => {
   const filterInformation: FilterInformation = {
    'columnList': tableColumnKeyList,
    'searchValue': searchByValueInput.value,
    'searchMinValue': searchByMinInput.value,
    'searchMaxValue': searchByMaxInput.value,
    'searchMode': 'searchByValue',
    'searchColumn': searchColumnSelect.getAttribute('value'),
    'orderColumn': orderColumnSelect.getAttribute('value'),
    'orderRule': (orderRuleSelect.getAttribute('value') === 'ASC') ? 'ASC' : 'DESC',
    'resultQuantity': Number(resultQuantitySelect.getAttribute('value')),
    'pageNum': 1
  };

  return filterInformation;
};

export default createFilterInformation;