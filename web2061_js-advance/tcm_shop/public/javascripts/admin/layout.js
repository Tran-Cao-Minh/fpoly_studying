import {
  SingleCollapser
} from '../class/collapser.js';

let sidebar = document.querySelector('#sidebar');
let sidebarCollapser = new SingleCollapser('active', sidebar);
let toggleBtnList = document.querySelectorAll('.js-sidebar-toggle');
toggleBtnList.forEach(btn => {
  sidebarCollapser.createEvent(btn, 'click');
});

let userInteractionArea = document.querySelector('.main__user-interaction');
let userDashboardCollapser = new SingleCollapser('active', userInteractionArea);
userDashboardCollapser.createEvent(userInteractionArea, 'click');

import {
  MultipleCollapser
} from '../class/collapser.js';

let menuItemList = document.querySelectorAll('.js-menu-item-collapse');
let menuItemCollapser = new MultipleCollapser('active', menuItemList);
menuItemList.forEach(menuItem => {
  menuItemCollapser.createEvent(menuItem, 'click');
});