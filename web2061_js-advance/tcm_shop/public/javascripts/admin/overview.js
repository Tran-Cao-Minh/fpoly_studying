let columnList = [{
    name: 'ID',
    key: 'PkProductCategory_Id',
    type: 'number',
  },
  {
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
    type: 'select',
  },
  {
    name: 'Quantity',
    key: 'ProductQuantity',
    type: 'number'
  },
]



import {
  CustomSelectCreator
} from '../class/custom-select-creator.js';

// search column custom select
let searchColumnSelect =
  document.querySelector('#js-overview-search-column');
let searchColumnSelectText =
  searchColumnSelect.querySelector('.custom-select-text');
let searchColumnSelectContainer =
  searchColumnSelect.querySelector('.custom-select-list');

let columnCustomSelectCreator = new CustomSelectCreator(
  searchColumnSelect,
  'active',
  searchColumnSelectContainer,
  [
    'value',
    'type',
  ],
);

columnList.forEach(column => {
  columnCustomSelectCreator.addOptionItem(
    column.name,
    [{
        key: 'value',
        data: column.key,
      },
      {
        key: 'type',
        data: column.type,
      },
    ]
  );
});

columnCustomSelectCreator.createCustomSelect(
  'CategoryName',
  searchColumnSelectText,
  'choosen',
);


searchColumnSelect.addEventListener('DOMSubtreeModified', function() {
  document.querySelector('#js-overview-search-value').setAttribute('type', searchColumnSelect.getAttribute('type'));
})
// end search column custom select



// let testColumnSelect =
//   document.querySelector('#js-test-column-select');
// let testColumnSelectText =
//   testColumnSelect.querySelector('.custom-select-text');
// let testColumnSelectContainer =
//   testColumnSelect.querySelector('.custom-select-list');

// let testCustomSelectCreator = new CustomSelectCreator(
//   testColumnSelect,
//   testColumnSelectText,
//   'active',
//   testColumnSelectContainer,
//   [
//     'value',
//     'type',
//     'nani',
//   ],
// );

// testCustomSelectCreator.addOptionItem(
//   'test',
//   [{
//       key: 'value',
//       data: 'test',
//     },
//     {
//       key: 'type',
//       data: 'test',
//     },
//     {
//       key: 'nani',
//       data: 'test',
//     },
//   ]
// );

// testCustomSelectCreator.createCustomSelect('test');