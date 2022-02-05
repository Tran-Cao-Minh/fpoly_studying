import {
  SingleActivator
} from '../class/activator.js';

let sidebar = document.querySelector('#sidebar');
let sidebarActivator = new SingleActivator('active', sidebar);
let toggleBtnList = document.querySelectorAll('.js-sidebar-toggle');
toggleBtnList.forEach(btn => {
  sidebarActivator.createEvent(btn, 'click');
});

let userInteractionArea = document.querySelector('.main__user-interaction');
let userDashboardActivator = new SingleActivator('active', userInteractionArea);
userDashboardActivator.createEvent(userInteractionArea, 'click');

import {
  MultipleActivator
} from '../class/activator.js';

let menuItemList = document.querySelectorAll('.js-menu-item-collapse');
let menuItemActivator = new MultipleActivator('active', menuItemList);
menuItemList.forEach(menuItem => {
  menuItemActivator.createEvent(menuItem, 'click');
});