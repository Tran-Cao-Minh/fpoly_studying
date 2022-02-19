export function PagingLinkCreator(
  iconClass = Array(String()),
  numberClass = Array(String()),
  firstPageIcon = String(),
  lastPageIcon = String(),
  container = Node(),
  hideClass = String(),
  itemChoosenAttribute = String(),
  maxPage = Number(odd),
) {
  this.iconClass = iconClass;
  this.getIconClass = function () {
    if (this.iconClass.length > 0) {
      let classValue = '';
      this.iconClass.forEach(item => {
        classValue += ` ${item}`;
      });
      classValue.slice(0, 1);

      return classValue;
    } else {
      return '';
    };
  };
  this.numberClass = numberClass;
  this.getNumberClass = function () {
    if (this.numberClass.length > 0) {
      let classValue = '';
      this.numberClass.forEach(item => {
        classValue += ` ${item}`;
      });
      classValue.slice(0, 1);

      return classValue;
    } else {
      return '';
    };
  };

  this.firstPageIcon = firstPageIcon;
  this.lastPageIcon = lastPageIcon;
  this.container = container;
  this.hideClass = hideClass;
  this.itemChoosenAttribute = itemChoosenAttribute;
  this.maxPage = maxPage;
  this.offset = (maxPage - 1) / 2;

  this.changePagingLink = function (
    pageNum = Number(),
    resultQuantity = Number(),
    total = Number(),
    pagingItemEvent = Function(pageNum = Number),
  ) {
    let pageQuantity = Math.ceil(total / resultQuantity);

    if (pageQuantity > 1) {
      this.container.classList.remove(hideClass);
      this.container.innerHTML = '';

      let pagingItemClass = this.getNumberClass();
      let itemChoosenAttribute = this.itemChoosenAttribute;
      let pagingLinkListContainer = this.container;
      function createPagingItem(i = Number()) {
        let pagingItem = document.createElement('li');
        pagingItem.setAttribute('class', pagingItemClass);
        pagingItem.innerHTML = i;
        pagingItem.setAttribute('value', i);
  
        if (i === pageNum) {
          pagingItem.setAttribute(itemChoosenAttribute, '');

        } else {
          pagingItem.addEventListener('click', function() {
            pagingItemEvent(i);
          });
        };

        pagingLinkListContainer.appendChild(pagingItem);
      }
  
      if (pageQuantity <= this.maxPage) {
        for (let i = 1; i <= pageQuantity; i++) {
          createPagingItem(i);
        };
      } else if (pageQuantity > maxPage) {
        let pagingItemFirst = document.createElement('li');
        pagingItemFirst.setAttribute('class', this.getIconClass());
        pagingItemFirst.innerHTML = this.firstPageIcon;
        pagingItemFirst.setAttribute('value', 1);
        pagingItemFirst.addEventListener('click', function() {
          pagingItemEvent(1);
        });
  
        let pagingItemLast = document.createElement('li');
        pagingItemLast.setAttribute('class', this.getIconClass());
        pagingItemLast.innerHTML = this.lastPageIcon;
        pagingItemLast.setAttribute('value', pageQuantity);
        pagingItemLast.addEventListener('click', function() {
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
      this.container.classList.add(hideClass);
    };
  };
}
