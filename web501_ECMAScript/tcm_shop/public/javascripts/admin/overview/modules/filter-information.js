const searchByValueInput = document.querySelector('#js-overview-search-value');
const searchByMinInput = document.querySelector('#js-overview-search-min');
const searchByMaxInput = document.querySelector('#js-overview-search-max');
const searchColumnSelect = document.querySelector('#js-overview-search-column');
const orderColumnSelect = document.querySelector('#js-overview-order-column');
const orderRuleSelect = document.querySelector('#js-overview-order-rule');
const resultQuantitySelect = document.querySelector('#js-overview-rows');

const createFilterInformation = (tableColumnKeyList = [String()]) => ({
  'columnList': tableColumnKeyList,
  'searchValue': searchByValueInput.value,
  'searchMinValue': searchByMinInput.value,
  'searchMaxValue': searchByMaxInput.value,
  'searchMode': 'searchByValue',
  'searchColumn': searchColumnSelect.getAttribute('value'),
  'orderColumn': orderColumnSelect.getAttribute('value'),
  'orderRule': orderRuleSelect.getAttribute('value'),
  'resultQuantity': resultQuantitySelect.getAttribute('value'),
  'pageNum': 1
});

export default createFilterInformation;