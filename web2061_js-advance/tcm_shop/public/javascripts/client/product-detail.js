import {
  DataReader,
  DataUpdater
} from '../class/data-interactor.js';
import {
  ToastCreator
} from '../class/toast-creator.js';

const pageUrl = location.href;
const fetchLinkPrefix = 'http://localhost:3000/product/shop/';
const id = pageUrl.substring(pageUrl.lastIndexOf('/') + 1);

const productInformationReader = new DataReader(fetchLinkPrefix + id);

productInformationReader.readData(null, function (product) {
  // set product tag img
  const productTagImg = document.querySelector('#product-tag-img');
  productTagImg.setAttribute('src', '/images/tags/' + product.TagImage);
  productTagImg.setAttribute('alt', product.TagName);

  // set product img
  const productImg = document.querySelector('#product-img');
  productImg.setAttribute('src', '/images/products/' + product.ProductImage);
  productImg.setAttribute('alt', product.ProductName);


  ###


});
