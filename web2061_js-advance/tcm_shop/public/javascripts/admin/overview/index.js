let columnList = [{
    name: 'ID',
    key: 'CategoryId',
    type: 'number',
  }, {
    name: 'Name',
    key: 'CategoryName',
    type: 'text',
  },
  {
    name: 'Order',
    key: 'CategoryOrder',
    type: 'number',
  },
  {
    name: 'Display',
    key: 'CategoryDisplay',
    type: 'text',
  },
  {
    name: 'Quantity',
    key: 'CategoryProductQuantity',
    type: 'number',
  },
];

let defaultColumnOptionValue = 'CategoryName';
let dataFetchLink = 'http://localhost:3000/category/';

import {
  adminFilterCustomSelectCreator
} from './create-custom-select.js';
adminFilterCustomSelectCreator(columnList, defaultColumnOptionValue);

import {
  searchAssistantCreator
} from './create-search-assistant.js';
searchAssistantCreator(defaultColumnOptionValue, dataFetchLink);