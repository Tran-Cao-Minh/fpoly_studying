import {
  CustomSelectCreator
} from '../../class/custom-select-creator.js';
import {
  DataReader
} from '../../class/data-interactor.js';
import {
  CurrencyFormatter
} from '../../class/data-formatter.js';

let defaultOrderBy = 'ProductViews';
let defaultOrderRule = 'ASC';
const productListContainer = document.querySelector('#product-list-container');

let productListFetchLink = 'http://localhost:3000/product/shop';
const productListDataReader = new DataReader(productListFetchLink);

const currencyFormatter = new CurrencyFormatter('en-US', 'USD');

function ProductListReader () {
  this.filter = {
    tagList: [],
    categoryList: [],
    orderBy: defaultOrderBy,
    orderRule: defaultOrderRule,
  };

  this.getProductList = function () {
    productListContainer.innerHTML = '';

    productListDataReader.readData(this.filter, function (data) {
      data.forEach(product => {
        let productOldPrice = 
          (product.ProductPrice / (100 - product.ProductSalePercent)) * 100;

        let productPrice = currencyFormatter.formatCurrency(product.ProductPrice);
        productOldPrice = currencyFormatter.formatCurrency(productOldPrice);

        productListContainer.innerHTML += `
          <div class="product-item">
            <div class="product-item-tag">
              <img src="../public/images/tags/${product.TagImage}" alt="Product Tag">
            </div>
            <a href="./user-product-detail.html?id=${product.PkProduct_Id}" class="product-item-img">
              <img src="../public/images/products/${product.ProductImage}" alt="${product.ProductName}">
            </a>
            <div class="product-information">
              <a href="./user-product-detail.html?id=${product.PkProduct_Id}" class="product-item-name">
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
            <button class="product-item-add-to-cart btn-primary"
              data-id="${product.PkProduct_Id}"
            >
              Add to cart
            </button>
          </div>
        `;
      });
    });
  };
}
let productListReader = new ProductListReader();
productListReader.getProductList();

window.addEventListener('load', function createOrderFilter() {
  // order by 
  let orderBySelect =
    document.querySelector('#js-shop-order-by');
  let orderBySelectText =
    orderBySelect.querySelector('.custom-select-text');
  let orderBySelectContainer =
    orderBySelect.querySelector('.custom-select-list');

  const orderBySelectCreator = new CustomSelectCreator(
    orderBySelect,
    'active',
    orderBySelectContainer,
    [
      'value',
    ],
  );

  let shopOrderByList = [{
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
  shopOrderByList.forEach(option => {
    orderBySelectCreator.addOptionItem(
      option.descriptionText,
      [{
        key: 'value',
        data: option.value,
      }, ]
    );
  });

  orderBySelectCreator.createCustomSelect(
    defaultOrderBy,
    orderBySelectText,
    'choosen',
  );

  orderBySelect.addEventListener('DOMSubtreeModified', function () {
    let orderBySelectValue = orderBySelect.getAttribute('value');
    if (orderBySelectValue !== productListReader.filter.orderBy) {
      productListReader.filter.orderBy = orderBySelectValue;
      productListReader.getProductList();
    };
  });
  // end order by 

  // order rule 
  let orderRuleSelect =
    document.querySelector('#js-shop-order-rule');
  let orderRuleSelectText =
    orderRuleSelect.querySelector('.custom-select-text');
  let orderRuleSelectContainer =
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

  let shopOrderRuleList = [{
      descriptionText: 'DESC',
      value: 'DESC',
      style: 'color: var(--text-danger);',
    },
    {
      descriptionText: 'ASC',
      value: 'ASC',
      style: 'color: var(--text-success);',
    },
  ];
  shopOrderRuleList.forEach(option => {
    orderRuleSelectCreator.addOptionItem(
      option.descriptionText,
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

  orderRuleSelect.addEventListener('DOMSubtreeModified', function () {
    let orderRuleSelectValue = orderRuleSelect.getAttribute('value');
    if (orderRuleSelectValue !== productListReader.filter.orderRule) {
      productListReader.filter.orderRule = orderRuleSelectValue;
      productListReader.getProductList();
    };
  });
  // end order rule 
});

window.addEventListener('load', function createFilterInput() {
  let productTagsFetchLink = 'http://localhost:3000/product/shop/tags';
  const productTagsDataReader = new DataReader(productTagsFetchLink);

  productTagsDataReader.readData(null, function (data) {
    let filterSpecialList = document.querySelector('#filter-special');

    data.forEach(tag => {
      filterSpecialList.innerHTML += `
        <label class="filter-item">
          <input class="form-check-input" type="checkbox" name="productTagList" 
            id="productTag-${tag.PkProductTag_Id}"
            value="${tag.PkProductTag_Id}"
          >
          <label for="productTag-${tag.PkProductTag_Id}"></label>
          <span class="filter-name text-truncate">
            ${tag.TagName}
          </span>
        </label>
      `;
    });
    
    let filterSpecialInputList = filterSpecialList.querySelectorAll('input');

    filterSpecialInputList.forEach(input => {
      input.addEventListener('change', function () {
        if (input.checked === true) {
          productListReader.filter.tagList.push(input.value);

        } else if (input.checked === false) {
          productListReader.filter.tagList.splice(
            productListReader.filter.tagList.indexOf(input.value),
            1
          );
        };

        productListReader.getProductList();
      });
    });
  });

  let productCategoryFetchLink = 'http://localhost:3000/category/shop';
  const productCategoryDataReader = new DataReader(productCategoryFetchLink);

  productCategoryDataReader.readData(null, function (data) {
    let filterCategoryList = document.querySelector('#filter-category');

    data.forEach(category => {
      filterCategoryList.innerHTML += `
        <label class="filter-item">
          <input class="form-check-input" type="checkbox" name="productCategoryList" 
            id="productCategory-${category.PkProductCategory_Id}"
            value="${category.PkProductCategory_Id}"
          >
          <label for="productCategory-${category.PkProductCategory_Id}"></label>
          <span class="filter-name text-truncate">
            ${category.CategoryName}
          </span>
        </label>
      `;
    });
        
    let filterCategoryInputList = filterCategoryList.querySelectorAll('input');

    filterCategoryInputList.forEach(input => {
      input.addEventListener('change', function () {
        if (input.checked === true) {
          productListReader.filter.categoryList.push(input.value);

        } else if (input.checked === false) {
          productListReader.filter.categoryList.splice(
            productListReader.filter.categoryList.indexOf(input.value),
            1
          );
        };

        productListReader.getProductList();
      });
    });
  });
});