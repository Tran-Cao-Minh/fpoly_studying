function Activator (
  activeClass = String(),
) {
  this.activeClass = activeClass;
};

export function SingleActivator(
  activeClass = String(),
  targetElement = Node(),
) {
  Activator.call(this, activeClass);
  this.targetElement = targetElement;

  this.createEvent = function (
    element = Node(),
    event = String(),
  ) {
    let targetElement = this.targetElement;
    let activeClass = this.activeClass;

    element.addEventListener(event, function () {
      targetElement.classList.toggle(activeClass);
    })
  };
};

export function MultipleActivator(
  activeClass = String(),
  targetElementList = [
    Node(),
  ],
) {
  Activator.call(this, activeClass);
  this.targetElementList = targetElementList;

  this.createEvent = function (
    element = Node(),
    event = String(),
  ) {
    let targetElementList = this.targetElementList;
    let activeClass = this.activeClass;

    element.addEventListener(event, function () {
      targetElementList.forEach(elementItem => {
        elementItem.classList.remove(activeClass);
      });
      element.classList.toggle(activeClass);
    })
  };
};