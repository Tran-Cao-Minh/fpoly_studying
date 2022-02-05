export function Suggester(
  suggestData = Object(),
  keyList = Array(),
) {
  this.suggestData = suggestData;
  this.keyList = keyList;

  this.createSuggester = function (
    input = Node(),
    selectOptionContainer = Node(),
    optionActiveAttribute = String(),
    activeClass = String(),
    highlightClass = String(),
  ) {
    let that = this;
    let currentOptionIndex = 0;
    let optionList = selectOptionContainer.querySelectorAll('li:not([not-access])');

    function changeCustomSelectStatus(status = Boolean()) {
      if (status) {
        selectOptionContainer.classList.add(activeClass);

      } else {
        selectOptionContainer.classList.remove(activeClass);
      }
    };

    input.addEventListener('focusout', function () {
      changeCustomSelectStatus(false);
    });

    function escapeRegExp(str = String()) {
      return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    }

    function inputEvent() {
      changeCustomSelectStatus(true);

      let suggestResultQuantity = 0;
      let hidedSuggestQuantity = 0;
      let maxSuggestResult = 5;

      currentOptionIndex = -1;
      let suggestData = that.suggestData;
      let keyList = that.keyList;

      selectOptionContainer.innerHTML = '';
      let searchValue = input.value;

      if (searchValue !== '') {
        let searchValueList = escapeRegExp(searchValue).toLowerCase().trim().split(/\s+/);

        searchValueList.forEach((value, index) => {
          let currentValue = value;
          let currentIndex = index;

          searchValueList.forEach((value, index) => {
            if (
              currentValue.length > value.length &&
              currentValue.includes(value) &&
              currentIndex !== index
            ) {
              searchValueList.splice(index, 1);

            } else if (
              value.includes(currentValue) &&
              currentIndex !== index
            ) {
              searchValueList.splice(currentIndex, 1);
            }
          });
        });

        suggestData.forEach(dataObject => {
          let checkContain = keyList.some(key => {
            dataObject[key] = String(dataObject[key]);

            return searchValueList.some(value => {
              return dataObject[key].toLowerCase().match(value);
            });
          });

          if (
            checkContain === true &&
            suggestResultQuantity < maxSuggestResult
          ) {
            let listItemContent = '';
            keyList.forEach((key, index) => {
              if (index > 0) {
                listItemContent += ' - ';
              }
              listItemContent += `${dataObject[key]}`;
            });
            let listItem = document.createElement('li');
            listItem.setAttribute('value', listItemContent);
            listItem.setAttribute('index', suggestResultQuantity);

            let index, startIndex;
            let replacePositionList = [];

            searchValueList.forEach(value => {
              startIndex = 0;

              while ((index = listItemContent.toLowerCase().indexOf(value, startIndex)) > -1) {
                startIndex = index + value.length;

                replacePositionList.push({
                  index: index,
                  length: value.length,
                });
              }
            });

            let openHightlightTag = `<span class="${highlightClass}">`;
            let closeHightlightTag = '</span>';
            let tagLength = 0;

            replacePositionList.sort((a, b) => {
              return a.index - b.index;
            })
            replacePositionList.forEach(replacePosition => {
              let index = replacePosition.index + tagLength;
              let length = replacePosition.length;

              listItemContent =
                listItemContent.substring(0, index) +
                openHightlightTag + listItemContent.substring(index, index + length) + closeHightlightTag +
                listItemContent.substring(index + length);

              tagLength = tagLength + openHightlightTag.length + closeHightlightTag.length;
            });

            listItem.innerHTML = listItemContent;
            selectOptionContainer.appendChild(listItem);
            suggestResultQuantity++;

          } else if (checkContain === true) {
            hidedSuggestQuantity++;
          }
        });

      } else {
        suggestData.forEach(dataObject => {
          if (suggestResultQuantity < maxSuggestResult) {
            let listItemContent = '';
            keyList.forEach((key, index) => {
              if (index > 0) {
                listItemContent += ' - ';
              }
              listItemContent += `${dataObject[key]}`;
            });
            let listItem = document.createElement('li');
            listItem.setAttribute('value', listItemContent);
            listItem.setAttribute('index', suggestResultQuantity);

            listItem.innerHTML = listItemContent;
            selectOptionContainer.appendChild(listItem);
            suggestResultQuantity++;
          }
        });
      }

      if (hidedSuggestQuantity > 0) {
        let listItem = document.createElement('li');
        listItem.innerHTML = `+ ${hidedSuggestQuantity} More`;
        listItem.classList.add('text-center');
        listItem.setAttribute('not-access', '');
        selectOptionContainer.appendChild(listItem);
      };

      optionList = selectOptionContainer.querySelectorAll('li:not([not-access])');
      optionList.forEach(option => {
        createOptionEvent(option);
      });
    };

    input.addEventListener('input', inputEvent);
    input.addEventListener('focus', inputEvent);

    function changeOptionStatus(option = Node()) {
      optionList.forEach(option => {
        option.removeAttribute(optionActiveAttribute);
      });
      option.setAttribute(optionActiveAttribute, '');
    };

    function changeInputValue(option = Node()) {
      input.value = option.getAttribute('value');
    };

    function createOptionEvent(option = Node()) {
      option.addEventListener('mouseenter', function () {
        currentOptionIndex = option.getAttribute('index');
        changeOptionStatus(option);
      });

      option.addEventListener('click', function () {
        changeInputValue(option);
      });
    };

    input.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowDown') {
        if (currentOptionIndex < (optionList.length - 1)) {
          currentOptionIndex++;
        } else {
          currentOptionIndex = 0;
        }
        changeOptionStatus(optionList[currentOptionIndex]);

      } else if (event.key === 'ArrowUp') {
        if (currentOptionIndex > 0) {
          currentOptionIndex--;
        } else {
          currentOptionIndex = optionList.length - 1;
        }
        changeOptionStatus(optionList[currentOptionIndex]);

      } else if (event.key === 'Enter') {
        if (
          currentOptionIndex >= 0 &&
          currentOptionIndex < (optionList.length - 1)
        ) {
          changeInputValue(optionList[currentOptionIndex]);
          changeCustomSelectStatus(false);
        }
      }
    });
  };
}