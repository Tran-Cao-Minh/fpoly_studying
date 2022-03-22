export function CustomSelectCreator(
  selectElement = Node(),
  activeClass = String(),
  selectOptionContainer = Node(),
  attributeList = [
    String(),
  ],
) {
  this.selectElement = selectElement;
  this.activeClass = activeClass;
  this.selectOptionContainer = selectOptionContainer;
  this.attributeList = attributeList;

  this.addOptionItem = function (
    displayValue = String(),
    attributeObjects = [{
      key: String(),
      data: String(),
    }, ],
  ) {
    let optionItem = document.createElement('li');
    attributeObjects.forEach(attribute => {
      optionItem.setAttribute(attribute.key, attribute.data);
    });
    optionItem.innerText = displayValue;

    this.selectOptionContainer.appendChild(optionItem);
  };

  this.createLabelPointer = function (element = Node()) {
    element.addEventListener('click', function () {
      selectElement.focus();
    })
  };

  this.createCustomSelect = function (
    defaultOptionValue = String(),
    selectTextContainer = Node(),
    optionActiveAttribute = String(),
  ) {
    let selectElement = this.selectElement;
    selectElement.setAttribute('tabindex', '0');
    let activeClass = this.activeClass;

    function changeCustomSelectStatus(status = Boolean()) {
      if (status) {
        selectElement.classList.add(activeClass);

      } else {
        selectElement.classList.remove(activeClass);
      };
    };

    selectElement.addEventListener('focus', function () {
      changeCustomSelectStatus(true);
      changeOptionStatus(optionList[currentOptionIndex]);
    });
    selectElement.addEventListener('focusout', function () {
      changeCustomSelectStatus(false);
    });
    selectElement.addEventListener('mouseenter', function () {
      changeCustomSelectStatus(true);
      changeOptionStatus(optionList[currentOptionIndex]);
    });
    selectElement.addEventListener('mouseleave', function () {
      changeCustomSelectStatus(false);
    });
    selectElement.addEventListener('click', function () {
      changeCustomSelectStatus(showCustomSelect);
      showCustomSelect = true;
    });

    let attributeList = this.attributeList;
    let optionList = selectElement.querySelectorAll('li');
    let showCustomSelect;
    let currentOptionIndex = 0;

    function setSelectElementAttr(option) {
      attributeList.forEach(attribute => {
        selectElement.setAttribute(attribute, option.getAttribute(attribute))
      });
      selectTextContainer.innerHTML = option.innerHTML;

      showCustomSelect = false;
    }

    function changeOptionStatus(option) {
      optionList.forEach(option => {
        option.removeAttribute(optionActiveAttribute);
      });
      option.setAttribute(optionActiveAttribute, '');
    }

    optionList.forEach((option, index) => {
      if (option.getAttribute('value') === defaultOptionValue) {
        setSelectElementAttr(option);
        showCustomSelect = true;
        currentOptionIndex = index;
        changeOptionStatus(option);
      }

      option.addEventListener('click', function () {
        setSelectElementAttr(option);
        currentOptionIndex = index;
        changeOptionStatus(option);
        changeCustomSelectStatus(false);
      });

      option.addEventListener('mouseenter', function () {
        changeOptionStatus(option);
      });
    });

    selectElement.addEventListener('keydown', function (event) {
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
        if (selectElement.classList.contains(activeClass)) {
          optionList[currentOptionIndex].click();
        } else {
          changeCustomSelectStatus(true);
        }
      }
    });
  }
};