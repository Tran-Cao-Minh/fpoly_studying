import {
  CustomSelectCreator
} from '../../class/custom-select-creator';
import {
  DataReader,
  DataUpdater
} from '../../class/data-interactor';
import {
  FormValidator
} from '../../class/form-validator';
import {
  ToastCreator
} from '../../class/toast-creator';

const toastCreator: ToastCreator = new ToastCreator(
  'bottom',
  16,
  'right',
  16
);

const pageUrl: string = location.href;
const fetchLinkPrefix: string = 'https://tcm-shop-default-rtdb.firebaseio.com/orders/';
const id: string = pageUrl.substring(pageUrl.lastIndexOf('/') + 1);

const formObject = {
  form: <HTMLFormElement>document.querySelector('#updateOrderForm'),
  orderStatus: <HTMLElement>document.querySelector('#orderStatus'),
  orderDate: <HTMLInputElement>document.querySelector('#orderDate'),
  orderTotalMoney: <HTMLInputElement>document.querySelector('#orderTotalMoney'),
  customerName: <HTMLInputElement>document.querySelector('#customerName'),
  customerEmail: <HTMLInputElement>document.querySelector('#customerEmail'),
  customerPhone: <HTMLInputElement>document.querySelector('#customerPhone'),
  orderAddress: <HTMLTextAreaElement>document.querySelector('#orderAddress'),
  orderNote: <HTMLTextAreaElement>document.querySelector('#orderNote'),
  submitButton: <HTMLButtonElement>document.querySelector('#js-update-data-submit'),
};
enum OrderStatus { 
  ORDER_SUCCESS = 'Order Success',
  DELIVERING = 'Delivering',
  COMPLETED = 'Completed',
  CANCELED = 'Canceled'
}; 

const createCustomOrderStatusSelect = (
  orderStatus: string
): void => {
  const orderStatusSelect: HTMLElement = formObject.orderStatus;
  const orderStatusSelectContainer: HTMLElement =
    orderStatusSelect.querySelector('.custom-select-list');
  const orderStatusSelectText: HTMLElement =
    orderStatusSelect.querySelector('.custom-select-text');
  const orderStatusSelectLabel: HTMLElement =
    document.querySelector('[for=orderStatus]');
  const orderStatusSelectCreator: CustomSelectCreator = new CustomSelectCreator(
    orderStatusSelect,
    'active',
    orderStatusSelectContainer,
    [
      'value',
      'style'
    ],
  );
  orderStatusSelectCreator.createLabelPointer(orderStatusSelectLabel);

  interface orderStatusItem {
    value: string,
    style: string
  };
  const orderStatusList: Array<orderStatusItem> = [{
    value: OrderStatus.ORDER_SUCCESS,
    style: 'color: var(--text-primary); font-weight: 600;',
  }, {
    value: OrderStatus.DELIVERING,
    style: 'color: var(--text-warning); font-weight: 600;',
  }, {
    value: OrderStatus.COMPLETED,
    style: 'color: var(--text-success); font-weight: 600;',
  }, {
    value: OrderStatus.CANCELED,
    style: 'color: var(--text-danger); font-weight: 600;',
  }];

  orderStatusList.forEach((option: orderStatusItem) => {
    orderStatusSelectCreator.addOptionItem(
      option.value,
      [{
        key: 'value',
        data: option.value,
      }, {
        key: 'style',
        data: option.style,
      }]
    );
  });

  orderStatusSelectCreator.createCustomSelect(
    orderStatus,
    orderStatusSelectText,
    'choosen',
  );
};

const createFormValidator = (
  orderStatus: string,
  orderDetails: {
    [key: string]: {
      ProductId: string,
      ProductQuantity: number
    }
  }
): void => {
  const formValidator: FormValidator = new FormValidator(
    formObject.submitButton,
    'd-none',
    'is-invalid',
    'is-valid',
  );

  (function createSubmitUpdateCategoryEvent() {
    const dataUpdater: DataUpdater = new DataUpdater(fetchLinkPrefix);

    const submitUpdateEvent = (): void => {
      const updateSuccessFn = (): void => {
        toastCreator.createToast(
          'success',
          `Update order completed \n New order status: ${formObject.orderStatus.getAttribute('value')}`,
          2
        );

        const oldOrderStatus: string = orderStatus;
        orderStatus = formObject.orderStatus.getAttribute('value');

        let productQuantityToastSetTimeout: NodeJS.Timeout;
        const updateOverideProductsQuantitySuccessFn = (): void => {
          clearTimeout(productQuantityToastSetTimeout);

          productQuantityToastSetTimeout = setTimeout(() => {
            toastCreator.createToast(
              'success',
              'Update overide products quantity completed',
              2
            );
          }, 100);
        };
        const updateOverideProductsQuantityFailedFn = (): void => {
          clearTimeout(productQuantityToastSetTimeout);

          productQuantityToastSetTimeout = setTimeout(() => {
            toastCreator.createToast(
              'danger',
              'Update overide products quantity failed',
              2
            );
          }, 100);
        };
        let productSoldQuantityToastSetTimeout: NodeJS.Timeout;
        const updateOverideProductsSoldQuantitySuccessFn = (): void => {
          clearTimeout(productSoldQuantityToastSetTimeout);

          productSoldQuantityToastSetTimeout = setTimeout(() => {
            toastCreator.createToast(
              'success',
              'Update overide products sold quantity completed',
              2
            );
          }, 100);
        };
        const updateOverideProductsSoldQuantityFailedFn = (): void => {
          clearTimeout(productSoldQuantityToastSetTimeout);

          productSoldQuantityToastSetTimeout = setTimeout(() => {
            toastCreator.createToast(
              'danger',
              'Update overide products sold quantity failed',
              2
            );
          }, 100);
        };

        (function updateOverideProductsSoldQuantityAndQuantity(
          oldOrderStatus: string,
          orderStatus: string,
          orderDetails: {
            [key: string]: {
              ProductId: string,
              ProductQuantity: number
            }
          }
        ): void {
          if (oldOrderStatus === OrderStatus.CANCELED || orderStatus === OrderStatus.CANCELED) {
            const productsFetchLink: string = 'https://tcm-shop-default-rtdb.firebaseio.com/products';
            const productQuantityColumnKey: string = 'ProductQuantity';
            const productSoldQuantityColumnKey: string = 'ProductSoldQuantity';
            const productsInformationReader: DataReader = new DataReader(productsFetchLink);

            const productFetchLinkPrefix: string = 'https://tcm-shop-default-rtdb.firebaseio.com/products/';
            const productDataUpdater: DataUpdater = new DataUpdater(productFetchLinkPrefix);

            const updateProductQuantityAndSoldQuantity = (
              firebaseKey: string,
              productQuantity: number,
              productSoldQuantity: number,
              offset: number
            ) => {
              const productQuantitySuffixes: string = `${firebaseKey}/${productQuantityColumnKey}`;
              const newProductQuantity: number = (oldOrderStatus === OrderStatus.CANCELED) ?
                (productQuantity - offset) :
                (productQuantity + offset);
              productDataUpdater.updateData(
                productQuantitySuffixes,
                newProductQuantity,
                updateOverideProductsQuantitySuccessFn,
                updateOverideProductsQuantityFailedFn
              );

              const productSoldQuantitySuffixes: string = `${firebaseKey}/${productSoldQuantityColumnKey}`;
              const newProductSoldQuantity: number = (oldOrderStatus === OrderStatus.CANCELED) ?
                (productSoldQuantity + offset) :
                (productSoldQuantity - offset);
              productDataUpdater.updateData(
                productSoldQuantitySuffixes,
                newProductSoldQuantity,
                updateOverideProductsSoldQuantitySuccessFn,
                updateOverideProductsSoldQuantityFailedFn
              );
            };

            productsInformationReader.readData((fullData: { [key: string]: any }) => {
              Object.keys(fullData).map((firebaseKey: string) => {
                Object.keys(orderDetails).map((orderFirebaseKey: string) => {
                  if (firebaseKey === orderDetails[orderFirebaseKey]['ProductId']) {
                    updateProductQuantityAndSoldQuantity(
                      firebaseKey,
                      fullData[firebaseKey][productQuantityColumnKey],
                      fullData[firebaseKey][productSoldQuantityColumnKey],
                      orderDetails[orderFirebaseKey]['ProductQuantity']
                    );
                  };
                });
              });
            });
          };
        })(oldOrderStatus, orderStatus, orderDetails);
      };

      const updateFailedFn = (): void => {
        toastCreator.createToast(
          'danger',
          'Update order status failed',
          2
        );
      };

      if (
        formObject.orderStatus.getAttribute('value') === orderStatus
      ) {
        toastCreator.createToast(
          'warning',
          'Please change at least one field before updating',
          2
        );

      } else {
        const newOrderStatus: string = `"${formObject.orderStatus.getAttribute('value')}"`;
        const orderStatusColumnKey: string = 'OrderStatus';
        const orderStatusSuffixes: string = `${id}/${orderStatusColumnKey}`;

        dataUpdater.updateData(
          orderStatusSuffixes,
          newOrderStatus,
          updateSuccessFn,
          updateFailedFn
        );
      };
    };

    formValidator.createSubmitButtonEvent(
      submitUpdateEvent,
      false
    );
  })();
};

import {
  TableCreator
} from '../../class/table-creator';
import {
  ImageFormatter,
  CurrencyFormatter
} from '../../class/data-formatter';
import TableColumnItem from '../interfaces/tableColumnItem';
import { Order } from '../interfaces/dataItem';

const showOrderDetails = (orderDetails: { [key: string]: any }): void => {
  const dataTable: HTMLTableElement = document.querySelector('#js-data-table');
  const addTableButtonEvent: Function | null = null;
  const imageFormatter: ImageFormatter = new ImageFormatter(
    []
  );
  const currencyFormatter: CurrencyFormatter = new CurrencyFormatter('en-US', 'USD');
  
  const tableColumnList: Array<TableColumnItem> = [{
    name: 'Name',
    key: 'ProductName',
    width: 20,
  },
  {
    name: 'Image',
    key: 'ProductImage',
    width: 6,
    formatFunction: (
      [base64 = String(), altText = String()]
    ) => {
      const img = imageFormatter.formatImage(base64, altText);
      return img;
    },
    formatPrameterKeyList: [
      'ProductImage',
      'ProductName'
    ]
  },
  {
    name: 'Price',
    key: 'ProductPrice',
    width: 6,
    formatFunction: (number: number) => {
      const price = currencyFormatter.formatCurrency(number);
      return price;
    },
    formatPrameterKeyList: [
      'ProductPrice'
    ]
  },
  {
    name: 'Quantity',
    key: 'ProductQuantity',
    width: 6,
  },
  ];
  const tableCreator: TableCreator = new TableCreator(
    dataTable,
    addTableButtonEvent,
    tableColumnList,
    'rem',
  );

  const productIdColumnKey: string = 'ProductId';
  const productQuantityColumnKey: string = 'ProductQuantity';
  const data: Array<Object> = [];
  let showOrderDetailsSetTimeout: NodeJS.Timeout;
  Object.keys(orderDetails).map((firebaseKey: string) => {
    const productFirebaseKey = orderDetails[firebaseKey][productIdColumnKey];

    const fetchLink: string 
      = `https://tcm-shop-default-rtdb.firebaseio.com/products/${productFirebaseKey}`;
    const productInformationReader: DataReader = new DataReader(fetchLink);

    productInformationReader.readData((product: { [key: string]: any}) => {
      data.push({
        ...product,
        ProductQuantity: orderDetails[firebaseKey][productQuantityColumnKey]
      });

      clearTimeout(showOrderDetailsSetTimeout);

      showOrderDetailsSetTimeout = setTimeout(() => {
        tableCreator.convertData(data);
      }, 300);
    });
  });
};

window.addEventListener('load', () => {
  const categoryInformationReader = new DataReader(fetchLinkPrefix + id);
  categoryInformationReader.readData((order: Order) => {
    formObject.orderDate.value = order.OrderDate;
    formObject.orderTotalMoney.value = String(order.OrderTotalMoney);
    formObject.customerName.value = order.CustomerName;
    formObject.customerEmail.value = order.CustomerEmail;
    formObject.customerPhone.value = order.CustomerPhoneNumber;
    formObject.orderAddress.value = order.OrderAddress;
    formObject.orderNote.value = order.OrderNote ? order.OrderNote : 'None';
    createCustomOrderStatusSelect(order.OrderStatus);

    createFormValidator(
      order.OrderStatus,
      order.OrderDetails
    );
    showOrderDetails(order.OrderDetails);
  });
});