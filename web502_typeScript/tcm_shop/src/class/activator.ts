class Activator {
  activeClass: string;

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
  targetElementList: NodeListOf<HTMLElement>;

  constructor(
    activeClass: string,
    targetElementList: NodeListOf<HTMLElement>
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