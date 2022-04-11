import { LogCreateWithName, MethodLogger, PropertyLogger } from '../decorators';

@LogCreateWithName('Custom Select Creator')
export class CustomSelectCreator {
  @PropertyLogger
  private selectElement: HTMLElement;
  @PropertyLogger
  private activeClass: string;
  @PropertyLogger
  private selectOptionContainer: HTMLElement;
  @PropertyLogger
  private attributeList: Array<string>;

  constructor(
    selectElement: HTMLElement,
    activeClass: string,
    selectOptionContainer: HTMLElement,
    attributeList: Array<string>
  ) {
    this.selectElement = selectElement;
    this.activeClass = activeClass;
    this.selectOptionContainer = selectOptionContainer;
    this.attributeList = attributeList;
  }

  @MethodLogger
  public addOptionItem(
    displayValue: string,
    attributeObjects = [{
      key: String(),
      data: String(),
    }]
  ): void {
    const optionItem: HTMLLIElement = document.createElement('li');
    attributeObjects.forEach((attribute: { key: string, data: string }) => {
      optionItem.setAttribute(attribute.key, attribute.data);
    });
    optionItem.innerText = displayValue;

    this.selectOptionContainer.appendChild(optionItem);
  }

  @MethodLogger
  public createLabelPointer(element: HTMLElement): void {
    element.addEventListener('click', () => {
      this.selectElement.focus();
    });
  }

  @MethodLogger
  public createCustomSelect(
    defaultOptionValue: string,
    selectTextContainer: HTMLElement,
    optionActiveAttribute: string
  ): void {
    this.selectElement.setAttribute('tabindex', '0');

    const changeCustomSelectStatus = (status: boolean): void => {
      if (status) {
        this.selectElement.classList.add(this.activeClass);

      } else {
        this.selectElement.classList.remove(this.activeClass);
      };
    };

    const changeOptionStatus = (option: HTMLLIElement): void => {
      optionList.forEach((option: HTMLLIElement) => {
        option.removeAttribute(optionActiveAttribute);
      });
      option.setAttribute(optionActiveAttribute, '');
    };

    const optionList: NodeListOf<HTMLLIElement> = this.selectElement.querySelectorAll('li');
    let currentOptionIndex: number = 0;
    let showCustomSelect: boolean;

    (() => { // addSelectEvent
      this.selectElement.addEventListener('focus', () => {
        changeCustomSelectStatus(true);
        changeOptionStatus(optionList[currentOptionIndex]);
      });
      this.selectElement.addEventListener('focusout', () => {
        changeCustomSelectStatus(false);
      });
      this.selectElement.addEventListener('mouseenter', () => {
        changeCustomSelectStatus(true);
        changeOptionStatus(optionList[currentOptionIndex]);
      });
      this.selectElement.addEventListener('mouseleave', () => {
        changeCustomSelectStatus(false);
      });
      this.selectElement.addEventListener('click', () => {
        changeCustomSelectStatus(showCustomSelect);
        showCustomSelect = true;
      });

      this.selectElement.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.key === 'ArrowDown') {
          if (currentOptionIndex < (optionList.length - 1)) {
            currentOptionIndex++;
          } else {
            currentOptionIndex = 0;
          };
          changeOptionStatus(optionList[currentOptionIndex]);

        } else if (event.key === 'ArrowUp') {
          if (currentOptionIndex > 0) {
            currentOptionIndex--;
          } else {
            currentOptionIndex = optionList.length - 1;
          };
          changeOptionStatus(optionList[currentOptionIndex]);

        } else if (event.key === 'Enter') {
          if (this.selectElement.classList.contains(this.activeClass)) {
            optionList[currentOptionIndex].click();
          } else {
            changeCustomSelectStatus(true);
          };
        };
      });
    })();

    (() => { // addOptionEvent
      const setSelectElementAttr = (option: HTMLLIElement) => {
        this.attributeList.forEach(attribute => {
          this.selectElement.setAttribute(attribute, option.getAttribute(attribute))
        });
        selectTextContainer.innerHTML = option.innerHTML;

        showCustomSelect = false;
      };

      optionList.forEach((option, index) => {
        if (option.getAttribute('value') === defaultOptionValue) {
          setSelectElementAttr(option);
          showCustomSelect = true;
          currentOptionIndex = index;
          changeOptionStatus(option);
        }

        option.addEventListener('click', () => {
          setSelectElementAttr(option);
          currentOptionIndex = index;
          changeOptionStatus(option);
          changeCustomSelectStatus(false);
        });

        option.addEventListener('mouseenter', () => {
          changeOptionStatus(option);
        });
      });
    })();
  }
};