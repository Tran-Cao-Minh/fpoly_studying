import {
  DataReader,
  DataUpdater
} from '../class/data-interactor.js';
import {
  CurrencyFormatter,
  DateFormatter
} from '../class/data-formatter.js';
import InputQuantityController from '../class/input-quantity-controller.js';
// import CartDataManager from '../../class/cart-data-manager.js';
import { ToastCreator } from '../class/toast-creator.js';

const addToCartToastCreator = new ToastCreator(
  'bottom',
  16,
  'right',
  16
);
const pageUrl = location.href;
const fetchLinkPrefix = 'https://tcm-shop-default-rtdb.firebaseio.com/products/';
const id = pageUrl.substring(pageUrl.lastIndexOf('/') + 1);

const fillProductDetailPageValue = (product = Object()) => {
  (() => { // create input quantity controller
    const input = document.querySelector('#js-add-to-cart-qty');
    const qty = {
      min: 1,
      max: product.ProductQuantity
    };
    const step = 1;
    const handleBtn = {
      decrease: document.querySelector('#js-add-to-cart-decrease-btn'),
      increase: document.querySelector('#js-add-to-cart-increase-btn')
    };

    InputQuantityController.getInstance().createController(
      input,
      qty,
      step,
      handleBtn
    );

    (() => { // create add to cart event
      const addToCartBtn = document.querySelector('#js-add-to-cart');
      addToCartBtn.addEventListener('click', () => {
        CartDataManager.getInstance().increaseItemInCart(
          id,
          Number(input.value),
          product.ProductQuantity,
          () => {
            addToCartToastCreator.createToast(
              'success',
              `Add Product - ${product.ProductName} to cart success`,
              2
            );
          },
          () => {
            addToCartToastCreator.createToast(
              'danger',
              `Add Product - ${product.ProductName} to cart failed <br> (Exceed the maximum remaining product quantity - ${product.ProductQuantity})`,
              2
            );
          }
        )
      });
    })();

    (() => { // create buy now event
      const buyNowBtn = document.querySelector('#js-buy-now');
      buyNowBtn.addEventListener('click', () => {
        CartDataManager.getInstance().increaseItemInCart(
          id,
          Number(input.value),
          product.ProductQuantity,
          () => {
            location.href = '/cart';
          },
          () => {
            addToCartToastCreator.createToast(
              'danger',
              `Add Product - ${product.ProductName} to cart failed <br> (Exceed the maximum remaining product quantity - ${product.ProductQuantity})`,
              2
            );
          }
        )
      });
    })();
  })();



  // set product tag img
  const productTagImg = document.querySelector('#product-tag-img');
  if (product.ProductTag !== 'None') {
    productTagImg.innerHTML += `
      <img
        src="/images/tags/${product.ProductTag}.svg"
        alt="${product.ProductName}"
      >
    `;
  };

  // set product img
  const productImg = document.querySelector('#product-img');
  productImg.setAttribute('src', product.ProductImage);
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
  const updateViewLinkPrefix = `https://tcm-shop-default-rtdb.firebaseio.com/products/${id}/ProductViews`;
  const productViewUpdater = new DataUpdater(updateViewLinkPrefix);
  const updateViewFormData = product.ProductViews + 1;

  productViewUpdater.updateData(
    '',
    updateViewFormData,
    () => {
      console.log(`Update Product Views of Product - ${product.ProductName} success`);
    },
    () => {
      console.log(`Update Product Views of Product - ${product.ProductName} failed`);
    }
  );
}

const productInformationReader = new DataReader(fetchLinkPrefix + id);
productInformationReader.readData((product) => {
  // console.log(product);
  fillProductDetailPageValue(product);
});