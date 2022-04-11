import {
  SingleActivator
} from '../../class/activator';

export function createFlexibleAside() {
  const asideFilter = document.querySelector('#filter');
  const asideFilterActivator = new SingleActivator('active', asideFilter);

  const toggleBtnList = document.querySelectorAll('-aside-filter-toggle');
  toggleBtnList.forEach(btn => {
    asideFilterActivator.createEvent(btn, 'click');
  });

  window.addEventListener('load', function () {
    if (window.innerWidth < 992) {
      asideFilter.classList.remove('active');
    };
  });
};