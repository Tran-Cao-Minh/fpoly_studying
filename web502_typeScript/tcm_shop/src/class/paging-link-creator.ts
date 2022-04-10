export class PagingLinkCreator {
  iconClass: Array<string>;
  numberClass: Array<string>;
  firstPageIcon: string;
  lastPageIcon: string;
  container: HTMLElement;
  hideClass: string;
  itemChoosenAttribute: string;
  maxPage: number;
  offset: number;

  constructor (
    iconClass: Array<string>,
    numberClass: Array<string>,
    firstPageIcon: string,
    lastPageIcon: string,
    container: HTMLElement,
    hideClass: string,
    itemChoosenAttribute: string,
    maxPage: number
  ) {
    this.iconClass = iconClass;
    this.numberClass = numberClass;

    this.firstPageIcon = firstPageIcon;
    this.lastPageIcon = lastPageIcon;
    this.container = container;
    this.hideClass = hideClass;
    this.itemChoosenAttribute = itemChoosenAttribute;
    this.maxPage = maxPage;
    this.offset = (maxPage - 1) / 2;
  }

  getFullClassName (classArray: Array<string>) {
    if (classArray.length > 0) {
      let classValue = '';
      classArray.forEach(item => {
        classValue += ` ${item}`;
      });
      classValue.slice(0, 1);

      return classValue;
    } else {
      return '';
    };
  }

  changePagingLink (
    pageNum: number,
    resultQuantity: number,
    total: number,
    pagingItemEvent: (pageNum: number) => any
  ) {
    const pageQuantity = Math.ceil(total / resultQuantity);

    if (pageQuantity > 1) {
      this.container.classList.remove(this.hideClass);
      this.container.innerHTML = '';

      const pagingItemClass = this.getFullClassName(this.numberClass);
      const createPagingItem = (i: number) => {
        const pagingItem: HTMLLIElement = document.createElement('li');
        pagingItem.setAttribute('class', pagingItemClass);
        pagingItem.innerHTML = String(i);
        pagingItem.setAttribute('value', String(i));
  
        if (i === pageNum) {
          pagingItem.setAttribute(this.itemChoosenAttribute, '');

        } else {
          pagingItem.addEventListener('click', () => {
            pagingItemEvent(i);
          });
        };

        this.container.appendChild(pagingItem);
      };
  
      if (pageQuantity <= this.maxPage) {
        for (let i = 1; i <= pageQuantity; i++) {
          createPagingItem(i);
        };
      } else if (pageQuantity > this.maxPage) {
        const pagingItemFirst = document.createElement('li');
        pagingItemFirst.setAttribute('class', this.getFullClassName(this.iconClass));
        pagingItemFirst.innerHTML = this.firstPageIcon;
        pagingItemFirst.setAttribute('value', '1');
        pagingItemFirst.addEventListener('click', () => {
          pagingItemEvent(1);
        });
  
        const pagingItemLast = document.createElement('li');
        pagingItemLast.setAttribute('class', this.getFullClassName(this.iconClass));
        pagingItemLast.innerHTML = this.lastPageIcon;
        pagingItemLast.setAttribute('value', String(pageQuantity));
        pagingItemLast.addEventListener('click', () => {
          pagingItemEvent(pageQuantity);
        });
  
        if (
          pageNum > this.offset &&
          pageNum <= (pageQuantity - this.offset)
        ) {
          this.container.appendChild(pagingItemFirst);
          for (let i = (pageNum - 1); i <= (pageNum + 1); i++) {
            createPagingItem(i);
          };
          this.container.appendChild(pagingItemLast);
  
        } else if (pageNum <= this.offset) {
          for (let i = 1; i <= (this.offset * 2); i++) {
            createPagingItem(i);
          };
          this.container.appendChild(pagingItemLast);
  
        } else if (pageNum > (pageQuantity - this.offset)) {
          this.container.appendChild(pagingItemFirst);
          for (let i = (pageQuantity - (this.offset + 1)); i <= pageQuantity; i++) {
            createPagingItem(i);
          };
        };
      };

    } else {
      this.container.classList.add(this.hideClass);
    };
  }
}
