import { LogCreateWithName, PropertyLogger, MethodLogger } from '../decorators';

@LogCreateWithName('Suggester')
export class Suggester {
  @PropertyLogger
  public suggestData: Array<Object>;
  @PropertyLogger
  public keyList: Array<string>;

  constructor (
    suggestData: Array<Object>,
    keyList: Array<string>
  ) {
    this.suggestData = suggestData;
    this.keyList = keyList;
  }

  @MethodLogger
  public createSuggester (
    input: HTMLInputElement,
    selectOptionContainer: HTMLElement,
    optionActiveAttribute: string,
    activeClass: string,
    highlightClass: string
  ): void {
    let currentOptionIndex: number = 0;
    let optionList: NodeListOf<HTMLLIElement> = selectOptionContainer.querySelectorAll('li:not([not-access])');

    const changeCustomSelectStatus = (status: boolean): void => {
      if (status) {
        selectOptionContainer.classList.add(activeClass);

      } else {
        selectOptionContainer.classList.remove(activeClass);
      };
    };

    input.addEventListener('focusout', () => {
      changeCustomSelectStatus(false);
    });

    const escapeRegExp = (str: string): string => {
      return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    };

    const inputEvent = (): void => {
      changeCustomSelectStatus(true);

      let suggestResultQuantity: number = 0;
      let hidedSuggestQuantity: number = 0;
      const maxSuggestResult: number = 5;

      currentOptionIndex = -1;

      selectOptionContainer.innerHTML = '';
      const searchValue: string = input.value.trim();

      if (searchValue !== '') {
        const searchValueList: Array<string> 
          = escapeRegExp(searchValue).toLowerCase().split(/\s+/);

        searchValueList.forEach((value: string, index: number) => {
          const currentValue: string = value;
          const currentIndex: number = index;

          searchValueList.forEach((value: string, index: number) => {
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

        this.suggestData.forEach((dataObject: { [key: string]: any }) => {
          const checkContain = this.keyList.some((key: string) => {
            dataObject[key] = String(dataObject[key]);

            return searchValueList.some((value) => {
              return dataObject[key].toLowerCase().match(value);
            });
          });

          if (
            checkContain === true &&
            suggestResultQuantity < maxSuggestResult
          ) {
            let listItemContent: string = '';
            this.keyList.forEach((key: string, index: number) => {
              if (index > 0) {
                listItemContent += ' - ';
              }
              listItemContent += `${dataObject[key]}`;
            });
            const listItem: HTMLLIElement = document.createElement('li');
            listItem.setAttribute('value', listItemContent);
            listItem.setAttribute('index', String(suggestResultQuantity));

            let index: number, startIndex: number;
            const replacePositionList: Array<{
              index: number,
              length: number
            }> = [];

            searchValueList.forEach((value: string) => {
              startIndex = 0;

              while ((index = listItemContent.toLowerCase().indexOf(value, startIndex)) > -1) {
                startIndex = index + value.length;

                replacePositionList.push({
                  index: index,
                  length: value.length,
                });
              };
            });

            const openHightlightTag: string = `<span class="${highlightClass}">`;
            const closeHightlightTag: string = '</span>';
            let tagLength: number = 0;

            replacePositionList.sort((a, b) => {
              return a.index - b.index;
            });
            replacePositionList.forEach((replacePosition: { index: number, length: number }) => {
              const index = replacePosition.index + tagLength;
              const length = replacePosition.length;

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
          };
        });

      } else if (searchValue === '') {
        this.suggestData.forEach((dataObject: { [key: string]: any }) => {
          if (suggestResultQuantity < maxSuggestResult) {
            let listItemContent: string = '';
            this.keyList.forEach((key: string, index: number) => {
              if (index > 0) {
                listItemContent += ' - ';
              }
              listItemContent += `${dataObject[key]}`;
            });
            const listItem: HTMLLIElement = document.createElement('li');
            listItem.setAttribute('value', listItemContent);
            listItem.setAttribute('index', String(suggestResultQuantity));

            listItem.innerHTML = listItemContent;
            selectOptionContainer.appendChild(listItem);
            suggestResultQuantity++;

          } else {
            hidedSuggestQuantity++;
          };
        });
      }

      if (hidedSuggestQuantity > 0) {
        const listItem: HTMLLIElement = document.createElement('li');
        listItem.innerHTML = `+ ${hidedSuggestQuantity} More`;
        listItem.classList.add('text-center');
        listItem.setAttribute('not-access', '');
        selectOptionContainer.appendChild(listItem);
      };

      optionList = selectOptionContainer.querySelectorAll('li:not([not-access])');
      optionList.forEach((option: HTMLLIElement) => {
        createOptionEvent(option);
      });
    };

    input.addEventListener('input', inputEvent);
    input.addEventListener('focus', inputEvent);

    const changeOptionStatus = (option: HTMLLIElement): void => {
      optionList.forEach((option: HTMLLIElement) => {
        option.removeAttribute(optionActiveAttribute);
      });
      option.setAttribute(optionActiveAttribute, '');
    };

    const changeInputValue = (option: HTMLLIElement) => {
      input.value = option.getAttribute('value');
    };

    const createOptionEvent = (option: HTMLLIElement) => {
      option.addEventListener('mouseenter', () => {
        currentOptionIndex = Number(option.getAttribute('index'));
        changeOptionStatus(option);
      });

      option.addEventListener('click', () => {
        changeInputValue(option);
      });
    };

    input.addEventListener('keydown', (event: KeyboardEvent) => {
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
        };
      };
    });
  }
}