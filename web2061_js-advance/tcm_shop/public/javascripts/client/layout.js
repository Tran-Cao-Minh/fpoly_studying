import {
  SingleActivator
} from '../class/activator.js';
import {
  ToastCreator
} from '../class/toast-creator.js';
import {
  #
} from '../class/popup-creator';

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


window.addEventListener('load', function () {
  createFlexibleMenu();
});

