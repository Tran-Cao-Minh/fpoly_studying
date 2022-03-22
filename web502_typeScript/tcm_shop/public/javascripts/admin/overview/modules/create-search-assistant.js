import {
  SingleActivator
} from '../../../class/activator.js';
import {
  DataReader
} from '../../../class/data-interactor.js';

const searchInputContainer = document.querySelector('#js-search-input-container');
const searchInputModeChanger = new SingleActivator('active', searchInputContainer);
const changeModeInputList = document.querySelectorAll('[name=searchMode]');
changeModeInputList.forEach(input => {
  searchInputModeChanger.createEvent(input, 'change');
});

const searchColumnSelect =
  document.querySelector('#js-overview-search-column');
let searchColumnSelectValue = searchColumnSelect.getAttribute('value');
const searchInputList = document.querySelectorAll('[id*="js-overview-search-"]');

export const searchAssistantCreator = (
  defaultColumnOptionValue = String(),
  dataFetchLink = String(),
  searchSuggester
) => {
  const tableDataReader = new DataReader(dataFetchLink);
  let fullData;

  const getSearchData = (columnKey) => {
    const searchData =
      Object.keys(fullData).map((key) => {
        const row = {};
        row[columnKey] = fullData[key][columnKey];
        return row;
      });

    (function removeDuplicate() {
      searchData.forEach((row, index) => {
        const currentValue = row[columnKey];
        const currentIndex = index;

        searchData.forEach((row, index) => {
          if (
            currentValue === row[columnKey] &&
            currentIndex !== index
          ) {
            searchData.splice(index, 1);
          }
        });
      });
    })();

    return searchData;
  };

  (function searchSuggesterInit() {
    tableDataReader.readData((result) => {
      fullData = result;
      const searchData = getSearchData(defaultColumnOptionValue);

      searchSuggester.keyList = [searchColumnSelect.getAttribute('value')];
      searchSuggester.suggestData = searchData;

      const searchByValueInput = document.querySelector('#js-overview-search-value');
      const searchByValueSuggestContainer = searchByValueInput.parentElement.querySelector('.custom-select-list');

      searchSuggester.createSuggester(
        searchByValueInput,
        searchByValueSuggestContainer,
        'choosen',
        'active',
        'highlight',
      );
    });
  })();

  searchColumnSelect.addEventListener('DOMSubtreeModified', () => {
    if (searchColumnSelect.getAttribute('value') !== searchColumnSelectValue) {
      searchColumnSelectValue = searchColumnSelect.getAttribute('value');

      searchInputList.forEach(input => {
        input.setAttribute('type', searchColumnSelect.getAttribute('type'));
        input.value = '';
      });

      searchSuggester.keyList = [searchColumnSelect.getAttribute('value')];
      searchSuggester.suggestData = getSearchData(searchColumnSelectValue);
    }
  });
};