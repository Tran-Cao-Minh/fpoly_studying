import {
  DataReader,
  DataUpdater
} from '../class/data-interactor.js';
import {
  ToastCreator
} from '../class/toast-creator.js';
import {
  CurrencyFormatter,
  DateFormatter
} from '../class/data-formatter.js';

const pageUrl = location.href;
const fetchLinkPrefix = 'http://localhost:3000/product/shop/';
const id = pageUrl.substring(pageUrl.lastIndexOf('/') + 1);

function fillProductDetailPageValue(product = Object()) {
  // set product tag img
  const productTagImg = document.querySelector('#product-tag-img');
  productTagImg.setAttribute('src', '/images/tags/' + product.TagImage);
  productTagImg.setAttribute('alt', product.TagName);

  // set product img
  const productImg = document.querySelector('#product-img');
  productImg.setAttribute('src', '/images/products/' + product.ProductImage);
  productImg.setAttribute('alt', product.ProductName);

  // set product name
  document.querySelector('#product-name').innerHTML =
    product.ProductName;

  // set product information
  document.querySelector('#product-category').innerHTML =
    `Category: ${product.CategoryName}`;

  const dateFormatter = new DateFormatter(
    'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    },
  );
  document.querySelector('#product-publish').innerHTML =
    `Publish: ${product.ProductPublisher} - ${dateFormatter.formatDate(new Date(product.ProductPublishDate))}`;

  document.querySelector('#product-dimensions').innerHTML =
    `Dimensions: ${product.ProductDimensions}`;

  document.querySelector('#product-pages').innerHTML =
    `Pages: ${product.ProductPages}`;

  document.querySelector('#product-views').innerHTML =
    product.ProductViews;

  // set product quantity
  document.querySelector('#product-quantity').innerHTML =
    product.ProductQuantity;

  // set product price group
  const currencyFormatter = new CurrencyFormatter('en-US', 'USD');
  document.querySelector('#product-price').innerHTML =
    currencyFormatter.formatCurrency(product.ProductPrice);

  document.querySelector('#product-sale-percent').innerHTML =
    `${product.ProductSalePercent}%`;

  const productOldPrice =
    (product.ProductPrice / (100 - product.ProductSalePercent)) * 100;
  document.querySelector('#product-old-price').innerHTML =
    currencyFormatter.formatCurrency(productOldPrice);

  // set product description
  document.querySelector('#product-description').innerHTML =
    product.ProductDescription;

  // update product view
  const updateViewLinkPrefix = 'http://localhost:3000/product/shop/increase-view/';
  const productViewUpdater = new DataUpdater(updateViewLinkPrefix);

  const updateViewFormData = new FormData();
  updateViewFormData.set(
    'ProductViews',
    product.ProductViews + 1
  );

  productViewUpdater.updateData(
    id,
    updateViewFormData,
    false,
    function (data) {
      console.log(data);
    },
  );
}

const productInformationReader = new DataReader(fetchLinkPrefix + id);
productInformationReader.readData(null, function (product) {
  fillProductDetailPageValue(product);
});