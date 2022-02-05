import {
  SingleActivator
} from '../../class/activator.js';
import {
  DataReader
} from '../../class/data-interactor.js';
import {
  Suggester
} from '../../class/suggester.js';

export function searchAssistantCreator(
  defaultColumnOptionValue = String(),
  dataFetchLink = String(),
) {

  let searchInputContainer = document.querySelector('#js-search-input-container');
  let searchInputModeChanger = new SingleActivator('active', searchInputContainer);
  let changeModeInputList = document.querySelectorAll('[name=searchMode]');
  changeModeInputList.forEach(input => {
    searchInputModeChanger.createEvent(input, 'change');
  });

  let searchColumnSelect =
    document.querySelector('#js-overview-search-column');
  let searchColumnSelectValue = searchColumnSelect.getAttribute('value');
  let searchInputList = document.querySelectorAll('[id*="js-overview-search-"]');


  let tableDataReader = new DataReader(dataFetchLink);

  let searchSuggester;
  tableDataReader.readData({
      "columnList": [
        defaultColumnOptionValue
      ],
      "searchValue": "",
      "searchMode": "searchByValue",
      "searchColumn": "PkProductCategory_Id",
      "orderRule": "ASC",
      "orderColumn": "PkProductCategory_Id",
      "offset": 0,
      "rowCount": 999999999999
    },
    function (data) {
      data.forEach((dataObject, index) => {
        let currentValue = dataObject[defaultColumnOptionValue];
        let currentIndex = index;

        data.forEach((dataObject, index) => {
          if (
            currentValue === dataObject[defaultColumnOptionValue] &&
            currentIndex !== index
          ) {
            data.splice(index, 1);
          }
        });
      });

      searchSuggester = new Suggester(data, [defaultColumnOptionValue]);

      let searchByValueInput = document.querySelector('#js-overview-search-value');
      let searchByValueSuggestContainer = searchByValueInput.parentElement.querySelector('.custom-select-list');

      searchSuggester.createSuggester(
        searchByValueInput,
        searchByValueSuggestContainer,
        'choosen',
        'active',
        'highlight',
      );
    },
    100,
  );

  searchColumnSelect.addEventListener('DOMSubtreeModified', function () {
    if (searchColumnSelect.getAttribute('value') !== searchColumnSelectValue) {
      searchColumnSelectValue = searchColumnSelect.getAttribute('value');

      searchInputList.forEach(input => {
        input.setAttribute('type', searchColumnSelect.getAttribute('type'));
        input.value = '';
      });

      tableDataReader.readData({
          "columnList": [
            searchColumnSelectValue
          ],
          "searchValue": "",
          "searchMode": "searchByValue",
          "searchColumn": "PkProductCategory_Id",
          "orderRule": "ASC",
          "orderColumn": "PkProductCategory_Id",
          "offset": 0,
          "rowCount": 999999999999
        },
        function (data) {
          data.forEach((dataObject, index) => {
            let currentValue = dataObject[searchColumnSelectValue];
            let currentIndex = index;

            data.forEach((dataObject, index) => {
              if (
                currentValue === dataObject[searchColumnSelectValue] &&
                currentIndex !== index
              ) {
                data.splice(index, 1);
              }
            });
          });

          searchSuggester.keyList = [searchColumnSelect.getAttribute('value')];
          searchSuggester.suggestData = data;
        },
        100,
      );
    }
  });
}