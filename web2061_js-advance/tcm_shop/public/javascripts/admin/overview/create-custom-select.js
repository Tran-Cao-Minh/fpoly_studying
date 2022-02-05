import {
  CustomSelectCreator
} from '../../class/custom-select-creator.js';

export function adminFilterCustomSelectCreator(
  columnList = [{
    name: String(),
    key: String(),
    type: String(),
  }, ],
  defaultColumnOptionValue = String(),
) {
  // search column 
  let searchColumnSelect =
    document.querySelector('#js-overview-search-column');
  let searchColumnSelectLabel =
    document.querySelector('[for=js-overview-search-column]');
  let searchColumnSelectText =
    searchColumnSelect.querySelector('.custom-select-text');
  let searchColumnSelectContainer =
    searchColumnSelect.querySelector('.custom-select-list');

  let searchColumnSelectCreator = new CustomSelectCreator(
    searchColumnSelect,
    'active',
    searchColumnSelectContainer,
    [
      'value',
      'type',
    ],
  );

  columnList.forEach(option => {
    searchColumnSelectCreator.addOptionItem(
      option.name,
      [{
          key: 'value',
          data: option.key,
        },
        {
          key: 'type',
          data: option.type,
        },
      ]
    );
  });

  searchColumnSelectCreator.createLabelPointer(searchColumnSelectLabel);

  searchColumnSelectCreator.createCustomSelect(
    defaultColumnOptionValue,
    searchColumnSelectText,
    'choosen',
  );
  // end search column 

  // order column 
  let orderColumnSelect =
    document.querySelector('#js-overview-order-column');
  let orderColumnSelectLabel =
    document.querySelector('[for=js-overview-order-column]');
  let orderColumnSelectText =
    orderColumnSelect.querySelector('.custom-select-text');
  let orderColumnSelectContainer =
    orderColumnSelect.querySelector('.custom-select-list');

  let orderColumnSelectCreator = new CustomSelectCreator(
    orderColumnSelect,
    'active',
    orderColumnSelectContainer,
    [
      'value',
    ],
  );

  columnList.forEach(option => {
    orderColumnSelectCreator.addOptionItem(
      option.name,
      [{
        key: 'value',
        data: option.key,
      }, ]
    );
  });

  orderColumnSelectCreator.createLabelPointer(orderColumnSelectLabel);

  orderColumnSelectCreator.createCustomSelect(
    defaultColumnOptionValue,
    orderColumnSelectText,
    'choosen',
  );
  // end order column 

  // order rule 
  let orderRuleSelect =
    document.querySelector('#js-overview-order-rule');
  let orderRuleSelectText =
    orderRuleSelect.querySelector('.custom-select-text');
  let orderRuleSelectContainer =
    orderRuleSelect.querySelector('.custom-select-list');

  let orderRuleSelectCreator = new CustomSelectCreator(
    orderRuleSelect,
    'active',
    orderRuleSelectContainer,
    [
      'value',
      'style',
    ],
  );

  let tableOrderRuleList = [{
      descriptionText: 'DESC',
      value: 'DESC',
      style: 'color: var(--text-danger);',
    },
    {
      descriptionText: 'ASC',
      value: 'ASC',
      style: 'color: var(--text-success);',
    },
  ];
  tableOrderRuleList.forEach(option => {
    orderRuleSelectCreator.addOptionItem(
      option.descriptionText,
      [{
          key: 'value',
          data: option.value,
        },
        {
          key: 'style',
          data: option.style,
        },
      ]
    );
  });

  orderRuleSelectCreator.createCustomSelect(
    'DESC',
    orderRuleSelectText,
    'choosen',
  );
  // end order rule 

  // rows 
  let rowsSelect =
    document.querySelector('#js-overview-rows');
  let rowsSelectText =
    rowsSelect.querySelector('.custom-select-text');
  let rowsSelectContainer =
    rowsSelect.querySelector('.custom-select-list');

  let rowsSelectCreator = new CustomSelectCreator(
    rowsSelect,
    'active',
    rowsSelectContainer,
    [
      'value',
    ],
  );

  let rowsSelectList = [{
      descriptionText: '5 rows',
      value: '5',
    },
    {
      descriptionText: '10 rows',
      value: '10',
    },
    {
      descriptionText: '15 rows',
      value: '15',
    },
  ];

  rowsSelectList.forEach(option => {
    rowsSelectCreator.addOptionItem(
      option.descriptionText,
      [{
        key: 'value',
        data: option.value,
      }, ]
    );
  });

  rowsSelectCreator.createCustomSelect(
    '5',
    rowsSelectText,
    'choosen',
  );
  // end rows 
};