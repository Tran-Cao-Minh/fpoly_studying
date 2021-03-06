import filterInformation from "../../interfaces/filterInformation";

const createFilterEvent = (
  filterInformation: filterInformation,
  changeTableData: (
    filterInformation: filterInformation,
    changePageNum: boolean
  ) => any
): void => {
  const searchByValueInput: HTMLInputElement = document.querySelector('#js-overview-search-value');
  const searchByMinInput: HTMLInputElement = document.querySelector('#js-overview-search-min');
  const searchByMaxInput: HTMLInputElement = document.querySelector('#js-overview-search-max');
  const searchColumnSelect: HTMLElement = document.querySelector('#js-overview-search-column');
  const orderColumnSelect: HTMLElement = document.querySelector('#js-overview-order-column');
  const orderRuleSelect: HTMLElement = document.querySelector('#js-overview-order-rule');
  const resultQuantitySelect: HTMLElement = document.querySelector('#js-overview-rows');

  const confirmSearchButton: HTMLButtonElement = document.querySelector('#js-confirm-search-button');
  const searchByValueModeRadio: HTMLInputElement = document.querySelector('#js-search-by-value');
  const searchByMinMaxModeRadio: HTMLInputElement = document.querySelector('#js-search-by-min-max');

  confirmSearchButton.addEventListener('click', () => {
    if (searchByValueModeRadio.checked === true) {
      filterInformation.searchMode = 'searchByValue';
      filterInformation.searchValue = searchByValueInput.value;

    } else if (searchByMinMaxModeRadio.checked === true) {
      filterInformation.searchMode = 'searchByMinMax';
      filterInformation.searchMinValue = searchByMinInput.value;
      filterInformation.searchMaxValue = searchByMaxInput.value;
    };

    const searchColumnValue: string = searchColumnSelect.getAttribute('value');
    filterInformation.searchColumn = searchColumnValue;

    filterInformation.pageNum = 1;
    changeTableData(filterInformation, false);
  });
  orderColumnSelect.addEventListener('DOMSubtreeModified', () => {
    const orderColumnValue: string = orderColumnSelect.getAttribute('value');
    if (orderColumnValue !== filterInformation.orderColumn) {
      filterInformation.pageNum = 1;
      filterInformation.orderColumn = orderColumnValue;
      changeTableData(filterInformation, false);
    };
  });
  orderRuleSelect.addEventListener('DOMSubtreeModified', () => {
    const orderRuleValue: string = orderRuleSelect.getAttribute('value');
    if (orderRuleValue !== filterInformation.orderRule) {
      filterInformation.pageNum = 1;
      filterInformation.orderRule = (orderRuleValue === 'ASC') ? 'ASC' : 'DESC';
      changeTableData(filterInformation, false);
    };
  });
  resultQuantitySelect.addEventListener('DOMSubtreeModified', () => {
    const resultQuantityValue: number = Number(resultQuantitySelect.getAttribute('value'));
    if (resultQuantityValue !== filterInformation.resultQuantity) {
      filterInformation.pageNum = 1;
      filterInformation.resultQuantity = resultQuantityValue;
      changeTableData(filterInformation, false);
    };
  });
};

export default createFilterEvent;