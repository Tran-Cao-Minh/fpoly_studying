import {
  SingleActivator
} from '../class/activator.js';

let sidebar: HTMLElement = document.querySelector('#sidebar');
let sidebarActivator = new SingleActivator('active', sidebar);
let toggleBtnList: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.js-sidebar-toggle');
toggleBtnList.forEach((btn: HTMLButtonElement) => {
  sidebarActivator.createEvent(btn, 'click');
});

let userInteractionArea: HTMLElement = document.querySelector('.main__user-interaction');
let userDashboardActivator = new SingleActivator('active', userInteractionArea);
userDashboardActivator.createEvent(userInteractionArea, 'click');

import {
  MultipleActivator
} from '../class/activator.js';

let menuItemList: NodeListOf<HTMLElement> = document.querySelectorAll('.js-menu-item-collapse');
let menuItemActivator = new MultipleActivator('active', menuItemList);
menuItemList.forEach((menuItem: HTMLElement) => {
  menuItemActivator.createEvent(menuItem, 'click');
});

// set link by page name
let pageName: string = (<HTMLElement>document.querySelector('#page-name')).innerText;
let asidePageLinkList: NodeListOf<HTMLAnchorElement> = document.querySelector('#sidebar').querySelectorAll('a');
asidePageLinkList.forEach((link: HTMLAnchorElement) => {
  if (link.dataset.pageName === pageName) {
    link.classList.add('active');
    link.removeAttribute('href');

    let linkContainer = link.parentElement.parentElement.parentElement;
    linkContainer.classList.add('active');
  };
});

// check login
import {
  DataReader
} from '../class/data-interactor.js';
const userName = sessionStorage.getItem('userName');
const userPassword = sessionStorage.getItem('userPassword');

let checkLogin = false;
const fetchLink = 'https://tcm-shop-default-rtdb.firebaseio.com/users';
const dataReader = new DataReader(fetchLink);

dataReader.readData((fullData = Object()) => {
  const userNameColumnKey = 'UserName';
  const userPasswordColumnKey = 'UserPassword';
  const userRoleColumnKey = 'UserRole';
  const ADMIN_ROLE = 'Admin';

  Object.keys(fullData).map((fireBaseKey: string) => {
    if (
      fullData[fireBaseKey][userNameColumnKey] === userName &&
      fullData[fireBaseKey][userPasswordColumnKey] === userPassword &&
      fullData[fireBaseKey][userRoleColumnKey] === ADMIN_ROLE
    ) {
      checkLogin = true;
    };
  });

  if (checkLogin === false) {
    location.href = '/admin/login';
  };
});