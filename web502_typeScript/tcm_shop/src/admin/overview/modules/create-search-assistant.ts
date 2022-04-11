import {
  SingleActivator
} from '../../../class/activator.js';
import {
  DataReader
} from '../../../class/data-interactor.js';

const searchInputContainer: HTMLElement = document.querySelector('#js-search-input-container');
const searchInputModeChanger = new SingleActivator('active', searchInputContainer);
const changeModeInputList: NodeListOf<HTMLElement> = document.querySelectorAll('[name=searchMode]');
changeModeInputList.forEach((input) => {
  searchInputModeChanger.createEvent(input, 'change');
});

const searchColumnSelect =
  document.querySelector('#js-overview-search-column');
let searchColumnSelectValue = searchColumnSelect.getAttribute('value');
const searchInputList: NodeListOf<HTMLInputElement> = document.querySelectorAll('[id*="js-overview-search-"]');

const searchAssistantCreator = (
  defaultColumnOptionValue: string,
  dataFetchLink: string,
  searchSuggester: { [key: string]: any }
) => {
  const tableDataReader = new DataReader(dataFetchLink);
  let fullData: { [key: string]: any };

  const getSearchData = (columnKey: string) => {
    const searchData =
      Object.keys(fullData).map((key) => {
        const row: { [key: string]: any } = {};
        row[columnKey] = fullData[key][columnKey];
        return row;
      });
    
    const getUniqueIndex = (uniqueSearchData: { [key: string]: any }, uniqueItem: { [key: string]: any }) => {
      return uniqueSearchData.findIndex((item: { [key: string]: any }) => {
        return (item[columnKey] === uniqueItem[columnKey]);
      });
    };

    const uniqueSearchData = searchData.filter((uniqueItem, index, uniqueSearchData) => {
      return getUniqueIndex(uniqueSearchData, uniqueItem) === index;
    });

    return uniqueSearchData;
  };

  (function searchSuggesterInit() {
    tableDataReader.readData((result: { [key: string]: any }) => {
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

      searchInputList.forEach((input) => {
        input.setAttribute('type', searchColumnSelect.getAttribute('type'));
        input.value = '';
      });

      searchSuggester.keyList = [searchColumnSelect.getAttribute('value')];
      searchSuggester.suggestData = getSearchData(searchColumnSelectValue);
    }
  });
};

export default searchAssistantCreator;