import {
  SingleActivator
} from '../class/activator.js';

let mobileMenu = document.querySelector('.js-mobile-menu');
let mobileMenuActivator = new SingleActivator('active', mobileMenu);
let toggleBtnList = document.querySelectorAll('.js-mobile-menu-toggle');
toggleBtnList.forEach(btn => {
  mobileMenuActivator.createEvent(btn, 'click');
});