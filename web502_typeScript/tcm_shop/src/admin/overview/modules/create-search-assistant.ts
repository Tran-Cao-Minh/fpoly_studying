import {
  SingleActivator
} from '../../../class/activator';
import {
  DataReader
} from '../../../class/data-interactor';

const searchInputContainer: HTMLElement = document.querySelector('#js-search-input-container');
const searchInputModeChanger: SingleActivator = new SingleActivator('active', searchInputContainer);
const changeModeInputList: NodeListOf<HTMLInputElement> = document.querySelectorAll('[name=searchMode]');
changeModeInputList.forEach((input: HTMLInputElement) => {
  searchInputModeChanger.createEvent(input, 'change');
});

const searchColumnSelect: HTMLElement =
  document.querySelector('#js-overview-search-column');
let searchColumnSelectValue: string = searchColumnSelect.getAttribute('value');
const searchInputList: NodeListOf<HTMLInputElement> = document.querySelectorAll('[id*="js-overview-search-"]');

const searchAssistantCreator = (
  defaultColumnOptionValue: string,
  dataFetchLink: string,
  searchSuggester: { [key: string]: any }
): void => {
  const tableDataReader: DataReader = new DataReader(dataFetchLink);
  let fullData: { [key: string]: any };

  const getSearchData = (columnKey: string) => {
    const searchData: Array<{ [key: string]: any }> =
      Object.keys(fullData).map((key: string) => {
        const row: { [key: string]: any } = {};
        row[columnKey] = fullData[key][columnKey];
        return row;
      });
    
    const getUniqueIndex = (uniqueSearchData: { [key: string]: any }, uniqueItem: { [key: string]: any }) => {
      return uniqueSearchData.findIndex((item: { [key: string]: any }) => {
        return (item[columnKey] === uniqueItem[columnKey]);
      });
    };

    const uniqueSearchData: Array<{ [key: string]: any }> = searchData.filter((uniqueItem, index, uniqueSearchData) => {
      return getUniqueIndex(uniqueSearchData, uniqueItem) === index;
    });

    return uniqueSearchData;
  };

  (function searchSuggesterInit(): void {
    tableDataReader.readData((result: { [key: string]: any }) => {
      fullData = result;
      const searchData: Array<{ [key: string]: any }> = getSearchData(defaultColumnOptionValue);

      searchSuggester.keyList = [searchColumnSelect.getAttribute('value')];
      searchSuggester.suggestData = searchData;

      const searchByValueInput: HTMLInputElement = document.querySelector('#js-overview-search-value');
      const searchByValueSuggestContainer: HTMLElement 
        = searchByValueInput.parentElement.querySelector('.custom-select-list');

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