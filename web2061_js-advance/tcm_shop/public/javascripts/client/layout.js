import {
  SingleActivator
} from '../class/activator.js';
import {
  ToastCreator
} from '../class/toast-creator.js';
// import {
  
// } from '../class/popup-creator';

function createFlexibleMenu () {
  const mobileMenu = document.querySelector('.js-mobile-menu');
  const mobileMenuActivator = new SingleActivator('active', mobileMenu);
  const toggleBtnList = document.querySelectorAll('.js-mobile-menu-toggle');
  toggleBtnList.forEach(btn => {
    mobileMenuActivator.createEvent(btn, 'click');
  });
}

function checkLogin () {
  const accountArea = document.querySelector('.js-account');
}

function searchProduct () {
  const searchProductInput = document.querySelector('#js-search-product');

  searchProductInput.addEventListener('change', function () {
    let page = location.href.substring(location.href.lastIndexOf('/') + 1);
    if (page !== 'shop') {
      sessionStorage.setItem('searchProductKeyWord', searchProductInput.value);
      location.href = 'http://localhost:3000/shop';
    };
  });
}

window.addEventListener('load', function () {
  createFlexibleMenu();
  searchProduct();
});

