const createFilterEvent = (
  filterInformation = {
    'columnList': Array<string>,
    'searchValue': String(),
    'searchMinValue': String(),
    'searchMaxValue': String(),
    'searchMode': 'searchByValue' | 'searchByMinMax',
    'searchColumn': String(),
    'orderColumn': String(),
    'orderRule': String(),
  },
  changeTableData = Function(
    filterInformation,
    changePageNum = Boolean()
  )
) => {
  const searchByValueInput = document.querySelector('#js-overview-search-value');
  const searchByMinInput = document.querySelector('#js-overview-search-min');
  const searchByMaxInput = document.querySelector('#js-overview-search-max');
  const searchColumnSelect = document.querySelector('#js-overview-search-column');
  const orderColumnSelect = document.querySelector('#js-overview-order-column');
  const orderRuleSelect = document.querySelector('#js-overview-order-rule');
  const resultQuantitySelect = document.querySelector('#js-overview-rows');

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
};

export default createFilterEvent;