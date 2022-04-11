import {
  CustomSelectCreator
} from '../../../class/custom-select-creator.js';

const adminFilterCustomSelectCreator = (
  columnList = [{
    name: String(),
    key: String(),
    type: String()
  }, ],
  defaultColumnOptionValue: string
) => {
  (function createSearchColumnCustomSelect() {
    const searchColumnSelect: HTMLElement = document.querySelector('#js-overview-search-column');
    const searchColumnSelectLabel: HTMLElement = document.querySelector('[for=js-overview-search-column]');
    const searchColumnSelectText: HTMLElement = searchColumnSelect.querySelector('.custom-select-text');
    const searchColumnSelectContainer: HTMLElement = searchColumnSelect.querySelector('.custom-select-list');

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
    const orderColumnSelect: HTMLElement = document.querySelector('#js-overview-order-column');
    const orderColumnSelectLabel: HTMLElement = document.querySelector('[for=js-overview-order-column]');
    const orderColumnSelectText: HTMLElement = orderColumnSelect.querySelector('.custom-select-text');
    const orderColumnSelectContainer: HTMLElement = orderColumnSelect.querySelector('.custom-select-list');
  
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
    const orderRuleSelect: HTMLElement = document.querySelector('#js-overview-order-rule');
    const orderRuleSelectText: HTMLElement = orderRuleSelect.querySelector('.custom-select-text');
    const orderRuleSelectContainer: HTMLElement = orderRuleSelect.querySelector('.custom-select-list');
  
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
    const rowsSelect: HTMLElement =
      document.querySelector('#js-overview-rows');
    const rowsSelectText: HTMLElement =
      rowsSelect.querySelector('.custom-select-text');
    const rowsSelectContainer: HTMLElement =
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