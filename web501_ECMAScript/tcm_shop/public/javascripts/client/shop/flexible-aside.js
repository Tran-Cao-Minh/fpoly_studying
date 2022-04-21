import {
  SingleActivator
} from '../../class/activator.js';

export const createFlexibleAside = () => {
  const asideFilter = document.querySelector('#filter');
  const asideFilterActivator = new SingleActivator('active', asideFilter);

  const toggleBtnList = document.querySelectorAll('.js-aside-filter-toggle');
  toggleBtnList.forEach((btn) => {
    asideFilterActivator.createEvent(btn, 'click');
  });

  window.addEventListener('load', () => {
    if (window.innerWidth < 992) {
      asideFilter.classList.remove('active');
    };
  });
};