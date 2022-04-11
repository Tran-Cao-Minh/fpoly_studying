import {
  CustomSelectCreator
} from '../../../class/custom-select-creator';
import OptionColumnItem from '../../interfaces/optionColumnItem';

const adminFilterCustomSelectCreator = (
  columnList: Array<OptionColumnItem>,
  defaultColumnOptionValue: string
): void => {
  (function createSearchColumnCustomSelect(): void {
    const searchColumnSelect: HTMLElement = document.querySelector('#js-overview-search-column');
    const searchColumnSelectLabel: HTMLElement = document.querySelector('[for=js-overview-search-column]');
    const searchColumnSelectText: HTMLElement = searchColumnSelect.querySelector('.custom-select-text');
    const searchColumnSelectContainer: HTMLElement = searchColumnSelect.querySelector('.custom-select-list');

    const searchColumnSelectCreator: CustomSelectCreator = new CustomSelectCreator(
      searchColumnSelect,
      'active',
      searchColumnSelectContainer,
      [
        'value',
        'type',
      ],
    );

    columnList.forEach((option: OptionColumnItem) => {
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

  (function createOrderColumnCustomSelect(): void {
    const orderColumnSelect: HTMLElement = document.querySelector('#js-overview-order-column');
    const orderColumnSelectLabel: HTMLElement = document.querySelector('[for=js-overview-order-column]');
    const orderColumnSelectText: HTMLElement = orderColumnSelect.querySelector('.custom-select-text');
    const orderColumnSelectContainer: HTMLElement = orderColumnSelect.querySelector('.custom-select-list');
  
    const orderColumnSelectCreator: CustomSelectCreator = new CustomSelectCreator(
      orderColumnSelect,
      'active',
      orderColumnSelectContainer,
      [
        'value',
      ],
    );
  
    columnList.forEach((option: OptionColumnItem) => {
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

  (function createOrderRuleCustomSelect(): void {
    const orderRuleSelect: HTMLElement = document.querySelector('#js-overview-order-rule');
    const orderRuleSelectText: HTMLElement = orderRuleSelect.querySelector('.custom-select-text');
    const orderRuleSelectContainer: HTMLElement = orderRuleSelect.querySelector('.custom-select-list');
  
    const orderRuleSelectCreator: CustomSelectCreator = new CustomSelectCreator(
      orderRuleSelect,
      'active',
      orderRuleSelectContainer,
      [
        'value',
        'style',
      ],
    );
  
    interface OrderRuleItem {
      descriptionText: string,
      value: string,
      style: string,
    };
    const tableOrderRuleList: Array<OrderRuleItem> = [{
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
    tableOrderRuleList.forEach((option: OrderRuleItem) => {
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
  
    const rowsSelectCreator: CustomSelectCreator = new CustomSelectCreator(
      rowsSelect,
      'active',
      rowsSelectContainer,
      [
        'value',
      ],
    );
  
    interface RowsSelectItem {
      descriptionText: string,
      value: string
    };
    const rowsSelectList: Array<RowsSelectItem> = [{
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
  
    rowsSelectList.forEach((option: RowsSelectItem) => {
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