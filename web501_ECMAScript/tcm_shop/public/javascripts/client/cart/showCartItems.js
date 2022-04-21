import { CurrencyFormatter } from '../../class/data-formatter.js';
import {
  DataReader
} from '../../class/data-interactor.js';
// import CartDataManager from '../../class/cart-data-manager.js';

const showCartItems = () => {
  const cartItems = CartDataManager.getInstance().getCartData();
  if (cartItems.length > 0) {
    const cartItemsContainer = document.querySelector('#js-cart-items');
    const currencyFormatter = new CurrencyFormatter('en-US', 'USD');

    cartItems.forEach(item => {
      const dataReader = new DataReader(`https://tcm-shop-default-rtdb.firebaseio.com/products/${item.id}`);
      dataReader.readData(product => {
        const productPrice = currencyFormatter.formatCurrency(product.ProductPrice);
        const productOldPrice = currencyFormatter.formatCurrency(
          ((product.ProductPrice / (100 - product.ProductSalePercent)) * 100)
        );
        const productTagImg = (() => {
          switch (product.ProductTag) {
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

        (() => { // append new item to cart
          const cartItem = document.createElement('div');
          cartItem.classList.add('cart-item');
          cartItem.innerHTML += `
            <div class="cart-item-img">
              <div class="cart-item-tag">
                ${productTagImgElement}
              </div>
              <a href="/shop/product-detail/${item.id}" class="product-item-img">
                <img src="${product.ProductImage}" alt="${product.ProductName}">
              </a>
            </div>
          `;

          const cartItemInf = document.createElement('div');
          cartItemInf.classList.add('cart-item-inf');
          cartItemInf.innerHTML += `
            <div class="cart-item-name">
              ${product.ProductName}
            </div>
            <div class="cart-item-price-group">
              <div class="cart-item-price">
                ${productPrice}
              </div>
              <div class="cart-item-old-price">
                ${productOldPrice}
              </div>
            </div>
          `;

          // change product quantity, delete product
          

        })();

        cartItemsContainer.innerHTML += `
          <div class="cart-item">
            <div class="cart-item-img">
              <div class="cart-item-tag">
                ${productTagImgElement}
              </div>
              <a href="/shop/product-detail/${item.id}" class="product-item-img">
                <img src="${product.ProductImage}" alt="${product.ProductName}">
              </a>
            </div>
            <div class="cart-item-inf">
              <div class="cart-item-name">
                ${product.ProductName}
              </div>
              <div class="cart-item-price-group">
                <div class="cart-item-price">
                  ${productPrice}
                </div>
                <div class="cart-item-old-price">
                  ${productOldPrice}
                </div>
              </div>
              <div class="cart-item-handle-qty input-group">
                <button class="btn-square btn-primary" id="js-add-to-cart-decrease-btn">
                  <i class="fa-solid fa-minus"></i>
                </button>
                <input type="number" class="form-control" value="${item.qty}" id="js-add-to-cart-qty" step="1">
                <button class="btn-square btn-primary" id="js-add-to-cart-increase-btn">
                  <i class="fa-solid fa-plus"></i>
                </button>
              </div>
              <button class="btn btn-danger btn-square cart-item-remove">
                <i class="fa-solid fa-trash-can cart-item-remove-icon"></i>
              </button>
            </div>
          </div>
        `;
      });
    });
  }
};

export default showCartItems;