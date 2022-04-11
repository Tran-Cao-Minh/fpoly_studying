import {
  SingleActivator
} from '../class/activator';

const sidebar: HTMLElement = document.querySelector('#sidebar');
const sidebarActivator: SingleActivator = new SingleActivator('active', sidebar);
const toggleBtnList: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.js-sidebar-toggle');
toggleBtnList.forEach((btn: HTMLButtonElement) => {
console.log(btn);
  sidebarActivator.createEvent(btn, 'click');
});

const userInteractionArea: HTMLElement = document.querySelector('.main__user-interaction');
const userDashboardActivator: SingleActivator = new SingleActivator('active', userInteractionArea);
userDashboardActivator.createEvent(userInteractionArea, 'click');

import {
  MultipleActivator
} from '../class/activator';

const menuItemList: NodeListOf<HTMLElement> = document.querySelectorAll('.js-menu-item-collapse');
const menuItemActivator: MultipleActivator = new MultipleActivator('active', menuItemList);
menuItemList.forEach((menuItem: HTMLElement) => {
  menuItemActivator.createEvent(menuItem, 'click');
});

// set link by page name
const pageName: string = (<HTMLElement>document.querySelector('#page-name')).innerText;
const asidePageLinkList: NodeListOf<HTMLAnchorElement> = document.querySelector('#sidebar').querySelectorAll('a');
asidePageLinkList.forEach((link: HTMLAnchorElement) => {
  if (link.dataset.pageName === pageName) {
    link.classList.add('active');
    link.removeAttribute('href');

    const linkContainer: HTMLElement = link.parentElement.parentElement.parentElement;
    linkContainer.classList.add('active');
  };
});

// check login
import {
  DataReader
} from '../class/data-interactor';
const userName: string = sessionStorage.getItem('userName');
const userPassword: string = sessionStorage.getItem('userPassword');

let checkLogin: boolean = false;
const fetchLink: string = 'https://tcm-shop-default-rtdb.firebaseio.com/users';
const dataReader: DataReader = new DataReader(fetchLink);

dataReader.readData((fullData: { [key: string]: any }) => {
  const userNameColumnKey = 'UserName';
  const userPasswordColumnKey = 'UserPassword';
  const userRoleColumnKey = 'UserRole';
  enum Role { ADMIN = 'Admin' };

  Object.keys(fullData).map((fireBaseKey: string) => {
    if (
      fullData[fireBaseKey][userNameColumnKey] === userName &&
      fullData[fireBaseKey][userPasswordColumnKey] === userPassword &&
      fullData[fireBaseKey][userRoleColumnKey] === Role.ADMIN
    ) {
      checkLogin = true;
    };
  });

  if (checkLogin === false) {
    location.href = '/admin/login';
  };
});