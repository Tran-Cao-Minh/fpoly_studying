export function SingleCollapser (activeClass, targetElement) {
  this.activeClass = activeClass;
  this.targetElement = targetElement;

  this.createEvent = function (element, event) {
    let targetElement = this.targetElement;
    let activeClass = this.activeClass;

    element.addEventListener(event, function () {
      targetElement.classList.toggle(activeClass);
    })
  }
};

export function MultipleCollapser (activeClass, targetElementList) {
  this.activeClass = activeClass;
  this.targetElementList = targetElementList;

  this.createEvent = function (element, event) {
    let targetElementList = this.targetElementList;
    let activeClass = this.activeClass;

    element.addEventListener(event, function () {
      targetElementList.forEach(elementItem => {
        elementItem.classList.remove(activeClass);
      });
      element.classList.toggle(activeClass);
    })
  }
};