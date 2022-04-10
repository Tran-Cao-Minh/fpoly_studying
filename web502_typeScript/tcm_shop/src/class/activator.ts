class Activator {
  activeClass: string;
  targetElementList: Array<HTMLElement>;

  constructor(
    activeClass: string
  ) {
    this.activeClass = activeClass;
  }
};

export class SingleActivator extends Activator {
  targetElement: HTMLElement;

  constructor(
    activeClass: string,
    targetElement: HTMLElement
  ) {
    super(activeClass);
    this.targetElement = targetElement;
  }

  createEvent(
    element: HTMLElement,
    event: string,
  ) {
    element.addEventListener(event, () => {
      this.targetElement.classList.toggle(this.activeClass);
    })
  }
};

export class MultipleActivator extends Activator {
  constructor(
    activeClass: string,
    targetElementList: Array<HTMLElement>
  ) {
    super(activeClass);
    this.targetElementList = targetElementList;
  }

  createEvent (
    element: HTMLElement,
    event: string,
  ) {
    element.addEventListener(event, () => {
      this.targetElementList.forEach((elementItem: HTMLElement) => {
        elementItem.classList.remove(this.activeClass);
      });
      element.classList.toggle(this.activeClass);
    })
  }
};