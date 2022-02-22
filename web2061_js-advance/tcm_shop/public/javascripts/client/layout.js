import {
  SingleActivator
} from '../class/activator.js';

window.addEventListener('load', function () {
  const mobileMenu = document.querySelector('.js-mobile-menu');
  const mobileMenuActivator = new SingleActivator('active', mobileMenu);
  const toggleBtnList = document.querySelectorAll('.js-mobile-menu-toggle');
  toggleBtnList.forEach(btn => {
    mobileMenuActivator.createEvent(btn, 'click');
  });
});