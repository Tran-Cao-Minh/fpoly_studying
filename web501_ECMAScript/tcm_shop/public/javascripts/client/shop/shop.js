import {
  CustomSelectCreator
} from '../../class/custom-select-creator.js';
import {
  DataReader
} from '../../class/data-interactor.js';
import {
  CurrencyFormatter
} from '../../class/data-formatter.js';
import testProductList from './testProductList.js';
import {
  PagingLinkCreator
} from '../../class/paging-link-creator.js';
import { ToastCreator } from '../../class/toast-creator.js'

const pagingLinkContainer = document.querySelector('#js-table-paging-link-list');
const productPagingLinkCreator = new PagingLinkCreator(
  ['btn-white', 'btn-square', 'ms-1', 'me-1', 'mt-2'],
  ['btn-white', 'btn-square', 'fw-bold', 'ms-1', 'me-1', 'mt-2'],
  '<i class="fa-solid fa-step-backward"></i>',
  '<i class="fa-solid fa-step-forward"></i>',
  pagingLinkContainer,
  'd-none',
  'disabled',
  5
);
const currencyFormatter = new CurrencyFormatter('en-US', 'USD');
const addToCartToastCreator = new ToastCreator(
  'bottom',
  16,
  'right',
  16
);

class ProductListHandler {
  constructor(
    productListDataReader = new DataReader(),
    defaultOrderBy = String(),
    defaultOrderRule = String(),
    productListContainer = Node(),
  ) {
    this.productListDataReader = productListDataReader;
    this.productListContainer = productListContainer;

    this.filterInformation = {
      searchProductKeyWord: '',
      tagList: [],
      categoryList: [],
      orderBy: defaultOrderBy,
      orderRule: defaultOrderRule,
      pageNum: 1,
      pageSize: 12
    };
  }

  initProductListData(callBackFn = Function) {
    // this.productListDataReader.readData((data) => {
    //   const fullData = [];
    //   Object.keys(data).map((key) => {
    //     data[key].FireBaseKey = key;
    //     fullData.push(data[key]);
    //   });

    //   this.fullData = fullData;
    //   callBackFn();
    // });

    callBackFn();
  }

  getProductList() {
    this.productListContainer.innerHTML = '';
    // const productListData = JSON.parse(JSON.stringify(this.fullData)); // deep clone
    let productListData = JSON.parse(JSON.stringify(testProductList)); // deep clone
    // console.log(this.filterInformation);

    (() => { // filterData
      const filterData = (item) => {
        // console.log(item);

        let isPassed = true;

        (() => { // filter by search key word
          const productName = item.ProductName;
          const productDescription = item.ProductDescription;
          const searchValueList 
            = this.filterInformation.searchProductKeyWord.trim().split(/\s+/); 
          searchValueList.forEach(searchValue => {
            if (
              !productName.includes(searchValue) &&
              !productDescription.includes(searchValue)
            ) {
              isPassed = false;
            };
          });
        })();

        (() => { // filter by category
          const productCategory = item.ProductCategory;
          const filterCategoryList = this.filterInformation.categoryList;

          if (
            !filterCategoryList.includes(productCategory) &&
            filterCategoryList.length > 0
          ) {
            isPassed = false;
          };
        })();

        (() => { // filter by special
          const productTag = item.ProductTag;
          const filterTagList = this.filterInformation.tagList;

          if (
            !filterTagList.includes(productTag) &&
            filterTagList.length > 0
          ) {
            isPassed = false;
          };
        })();

        // console.log(isPassed);
        return isPassed;
      };

      productListData = productListData.filter((filterData));
    })();

    (() => { // create paging link
      productPagingLinkCreator.changePagingLink(
        this.filterInformation.pageNum,
        this.filterInformation.pageSize,
        productListData.length,
        (pageNum) => {
          this.filterInformation.pageNum = pageNum;
          this.getProductList();
        }
      )
    })();

    (() => { // sort data
      const sortDataByColumnKey = (
        columnKey = String(),
        orderRule = 'ASC' || 'DESC'
      ) => {
        productListData.sort((a, b) => {
          if (orderRule === 'ASC') {
            return (a[columnKey] > b[columnKey]) ? 1 : -1;
  
          } else if (orderRule === 'DESC') {
            return (a[columnKey] < b[columnKey]) ? 1 : -1;
          };
        });
      };

      sortDataByColumnKey('ProductOrder', 'DESC');
      sortDataByColumnKey(
        this.filterInformation.orderBy,
        this.filterInformation.orderRule
      );
    })();

    (() => { // slice data
      const startIndex =
        (this.filterInformation.pageNum - 1) * this.filterInformation.pageSize;
      const endIndex = startIndex + this.filterInformation.pageSize;

      productListData = productListData.slice(
        startIndex,
        endIndex
      );
    })();

    productListData.forEach(product => {
      const productPrice = currencyFormatter.formatCurrency(product.ProductPrice);
      const productOldPrice = currencyFormatter.formatCurrency(
        ((product.ProductPrice / (100 - product.ProductSalePercent)) * 100)
      );
      const productTagImg = (() => {
        switch(product.ProductTag) {
          case 'None':
            return null;
          case 'Hot':
            return 'hot.svg';
          case 'New':
            return 'new.svg';
        };
      })();
      const productTagImgElement = productTagImg ? 
        `
          <img
           src="/images/tags/${productTagImg}"
           alt="Product Tag"
          >
        ` :
        '';

      productListContainer.innerHTML += `
        <div class="product-item">
          <div class="product-item-tag">
            ${productTagImgElement}
          </div>
          <a href="/shop/product-detail/${product.FireBaseKey}" class="product-item-img">
            <img src="${product.ProductImage}" alt="${product.ProductName}">
          </a>
          <div class="product-information">
            <a href="/shop/product-detail/${product.FireBaseKey}" class="product-item-name">
              ${product.ProductName}
            </a>
            <div class="product-item-price-group">
              <span class="product-item-price">
                ${productPrice}
              </span>
              <span class="product-item-old-price">
                ${productOldPrice}
              </span>
            </div>
          </div>
          <button class="js-add-to-cart btn-primary"
            data-id="${product.FireBaseKey}"
            data-max-qty="${product.ProductQuantity}"
            data-name="${product.ProductName}"
          >
            Add to cart
          </button>
        </div>
      `;
    });

    const addToCartBtnList = document.querySelectorAll('.js-add-to-cart');
    addToCartBtnList.forEach(btn => {
      btn.addEventListener('click', () => {
        CartDataManager.getInstance().addItemToCart(
          btn.dataset.id,
          1,
          Number(btn.dataset.maxQty),
          () => {
            addToCartToastCreator.createToast(
              'success',
              `Add Product - ${btn.dataset.name} to cart success`,
              2
            );
          },
          () => {
            addToCartToastCreator.createToast(
              'danger',
              `Add Product - ${btn.dataset.name} to cart failed <br> (Exceed the maximum remaining product quantity - ${btn.dataset.maxQty})`,
              2
            );
          }
        )
      });
    });
  }
};

const productListFetchLink = 'https://tcm-shop-default-rtdb.firebaseio.com/products';
const productListDataReader = new DataReader(productListFetchLink);
const productListContainer = document.querySelector('#product-list-container');

const defaultOrderBy = 'ProductViews';
const defaultOrderRule = 'ASC';
const productListHandler = new ProductListHandler(
  productListDataReader,
  defaultOrderBy,
  defaultOrderRule,
  productListContainer
);

const createOrderFilter = () => {
  // order by 
  const orderBySelect =
    document.querySelector('#js-shop-order-by');
  const orderBySelectText =
    orderBySelect.querySelector('.custom-select-text');
  const orderBySelectContainer =
    orderBySelect.querySelector('.custom-select-list');

  const orderBySelectCreator = new CustomSelectCreator(
    orderBySelect,
    'active',
    orderBySelectContainer,
    [
      'value',
    ],
  );

  const shopOrderByList = [{
    descriptionText: 'View',
    value: 'ProductViews',
  },
  {
    descriptionText: 'Price',
    value: 'ProductPrice',
  },
  {
    descriptionText: 'Name',
    value: 'ProductName',
  },
  ];
  shopOrderByList.forEach((option) => {
    orderBySelectCreator.addOptionItem(
      option.descriptionText,
      [{
        key: 'value',
        data: option.value,
      },]
    );
  });

  orderBySelectCreator.createCustomSelect(
    defaultOrderBy,
    orderBySelectText,
    'choosen',
  );

  orderBySelect.addEventListener('DOMSubtreeModified', () => {
    const orderBySelectValue = orderBySelect.getAttribute('value');
    if (orderBySelectValue !== productListHandler.filterInformation.orderBy) {
      productListHandler.filterInformation.orderBy = orderBySelectValue;
      productListHandler.getProductList();
    };
  });
  // end order by 

  // order rule 
  const orderRuleSelect =
    document.querySelector('#js-shop-order-rule');
  const orderRuleSelectText =
    orderRuleSelect.querySelector('.custom-select-text');
  const orderRuleSelectContainer =
    orderRuleSelect.querySelector('.custom-select-list');

  const orderRuleSelectCreator = new CustomSelectCreator(
    orderRuleSelect,
    'active',
    orderRuleSelectContainer,
    [
      'value',
      'style',
    ],
  );

  const shopOrderRuleList = [{
    value: 'DESC',
    style: 'color: var(--text-danger);',
  },
  {
    value: 'ASC',
    style: 'color: var(--text-success);',
  },
  ];
  shopOrderRuleList.forEach((option) => {
    orderRuleSelectCreator.addOptionItem(
      option.value,
      [{
        key: 'value',
        data: option.value,
      },
      {
        key: 'style',
        data: option.style,
      },
      ]
    );
  });

  orderRuleSelectCreator.createCustomSelect(
    defaultOrderRule,
    orderRuleSelectText,
    'choosen',
  );

  orderRuleSelect.addEventListener('DOMSubtreeModified', () => {
    const orderRuleSelectValue = orderRuleSelect.getAttribute('value');
    if (orderRuleSelectValue !== productListHandler.filterInformation.orderRule) {
      productListHandler.filterInformation.orderRule = orderRuleSelectValue;
      productListHandler.getProductList();
    };
  });
  // end order rule 
};

const createFilterInput = () => {
  (() => { // tag filter
    const filterSpecialList = document.querySelector('#filter-special');
    const tagList = ['None', 'Hot', 'New'];

    tagList.forEach((tag = String()) => {
      filterSpecialList.innerHTML += `
          <label class="filter-item">
            <input class="form-check-input" type="checkbox" name="productTagList" 
              id="productTag-${tag}"
              value="${tag}"
            >
            <label for="productTag-${tag}"></label>
            <span class="filter-name text-truncate">
              ${tag}
            </span>
          </label>
        `;

      const filterSpecialInputList = filterSpecialList.querySelectorAll('input');

      filterSpecialInputList.forEach((input) => {
        input.addEventListener('change', () => {
          if (input.checked === true) {
            productListHandler.filterInformation.tagList.push(input.value);

          } else if (input.checked === false) {
            productListHandler.filterInformation.tagList.splice(
              productListHandler.filterInformation.tagList.indexOf(input.value),
              1
            );
          };

          productListHandler.getProductList();
        });
      });
    });
  })();

  (() => { // category filter
    const productCategoryFetchLink = 'https://tcm-shop-default-rtdb.firebaseio.com/categories';
    const productCategoryDataReader = new DataReader(productCategoryFetchLink);

    productCategoryDataReader.readData((fullData) => {
      const filterCategoryList = document.querySelector('#filter-category');

      Object.keys(fullData).map((key) => {
        filterCategoryList.innerHTML += `
          <label class="filter-item">
            <input class="form-check-input" type="checkbox" name="productCategoryList" 
              id="productCategory-${fullData[key]['CategoryName']}"
              value="${fullData[key]['CategoryName']}"
            >
            <label for="productCategory-${fullData[key]['CategoryName']}"></label>
            <span class="filter-name text-truncate">
              ${fullData[key]['CategoryName']}
            </span>
          </label>
        `;
      });

      const filterCategoryInputList = filterCategoryList.querySelectorAll('input');

      filterCategoryInputList.forEach((input) => {
        input.addEventListener('change', () => {
          if (input.checked === true) {
            productListHandler.filterInformation.categoryList.push(input.value);

          } else if (input.checked === false) {
            productListHandler.filterInformation.categoryList.splice(
              productListHandler.filterInformation.categoryList.indexOf(input.value),
              1
            );
          };

          productListHandler.getProductList();
        });
      });
    });
  })();
};

window.addEventListener('load', () => {
  productListHandler.initProductListData(() => {
    const searchProductInput = document.querySelector('#js-search-product');
    if (sessionStorage.getItem('searchProductKeyWord') !== null) {
      productListHandler.filterInformation.searchProductKeyWord =
        sessionStorage.getItem('searchProductKeyWord');
      searchProductInput.value = sessionStorage.getItem('searchProductKeyWord');
    
      sessionStorage.removeItem('searchProductKeyWord');
    } else {
      productListHandler.filterInformation.searchProductKeyWord =
        searchProductInput.value;
    };
    productListHandler.getProductList();
    
    // product key word
    searchProductInput.addEventListener('change', () => {
      productListHandler.filterInformation.searchProductKeyWord =
        searchProductInput.value;

      productListHandler.getProductList();
    });
    // end product key word

    createOrderFilter();
    createFilterInput();
  });
});

import {
  createFlexibleAside
} from './flexible-aside.js';
createFlexibleAside();