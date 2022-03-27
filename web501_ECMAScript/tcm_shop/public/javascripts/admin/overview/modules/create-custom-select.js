import {
  CustomSelectCreator
} from '../../../class/custom-select-creator.js';

const adminFilterCustomSelectCreator = (
  columnList = [{
    name: String(),
    key: String(),
    type: String()
  }, ],
  defaultColumnOptionValue = String()
) => {
  (function createSearchColumnCustomSelect() {
    const searchColumnSelect = document.querySelector('#js-overview-search-column');
    const searchColumnSelectLabel = document.querySelector('[for=js-overview-search-column]');
    const searchColumnSelectText = searchColumnSelect.querySelector('.custom-select-text');
    const searchColumnSelectContainer = searchColumnSelect.querySelector('.custom-select-list');

    const searchColumnSelectCreator = new CustomSelectCreator(
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
  })();

  (function createOrderColumnCustomSelect() {
    const orderColumnSelect = document.querySelector('#js-overview-order-column');
    const orderColumnSelectLabel = document.querySelector('[for=js-overview-order-column]');
    const orderColumnSelectText = orderColumnSelect.querySelector('.custom-select-text');
    const orderColumnSelectContainer = orderColumnSelect.querySelector('.custom-select-list');
  
    const orderColumnSelectCreator = new CustomSelectCreator(
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
  })();

  (function createOrderRuleCustomSelect() {
    const orderRuleSelect = document.querySelector('#js-overview-order-rule');
    const orderRuleSelectText = orderRuleSelect.querySelector('.custom-select-text');
    const orderRuleSelectContainer = orderRuleSelect.querySelector('.custom-select-list');
  
    const orderRuleSelectCreator = new CustomSelectCreator(
      orderRuleSelect,
      'active',
      orderRuleSelectContainer,
      [
        'value',
        'style',
      ],
    );
  
    const tableOrderRuleList = [{
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
      'ASC',
      orderRuleSelectText,
      'choosen',
    );
  })();

  (function createRowsQuantityCustomSelect() {
    const rowsSelect =
      document.querySelector('#js-overview-rows');
    const rowsSelectText =
      rowsSelect.querySelector('.custom-select-text');
    const rowsSelectContainer =
      rowsSelect.querySelector('.custom-select-list');
  
    const rowsSelectCreator = new CustomSelectCreator(
      rowsSelect,
      'active',
      rowsSelectContainer,
      [
        'value',
      ],
    );
  
    const rowsSelectList = [{
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
  })();
};

export default adminFilterCustomSelectCreator;