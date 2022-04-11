import {
  CustomSelectCreator
} from '../../class/custom-select-creator.js';
import {
  DataReader,
  DataUpdater
} from '../../class/data-interactor.js';
import {
  FormValidator
} from '../../class/form-validator.js';
import {
  ToastCreator
} from '../../class/toast-creator.js';

const toastCreator = new ToastCreator(
  'bottom',
  16,
  'right',
  16
);

const pageUrl = location.href;
const fetchLinkPrefix = 'https://tcm-shop-default-rtdb.firebaseio.com/orders/';
const id = pageUrl.substring(pageUrl.lastIndexOf('/') + 1);

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

const createCustomOrderStatusSelect = (
  orderStatus: string
) => {
  const orderStatusSelect: HTMLElement = formObject.orderStatus;
  const orderStatusSelectContainer: HTMLElement =
    orderStatusSelect.querySelector('.custom-select-list');
  const orderStatusSelectText: HTMLElement =
    orderStatusSelect.querySelector('.custom-select-text');
  const orderStatusSelectLabel: HTMLElement =
    document.querySelector('[for=orderStatus]');
  const orderStatusSelectCreator = new CustomSelectCreator(
    orderStatusSelect,
    'active',
    orderStatusSelectContainer,
    [
      'value',
      'style'
    ],
  );
  orderStatusSelectCreator.createLabelPointer(orderStatusSelectLabel);

  const orderStatusList = [{
    value: 'Order Success',
    style: 'color: var(--text-primary); font-weight: 600;',
  }, {
    value: 'Delivering',
    style: 'color: var(--text-warning); font-weight: 600;',
  }, {
    value: 'Completed',
    style: 'color: var(--text-success); font-weight: 600;',
  }, {
    value: 'Canceled',
    style: 'color: var(--text-danger); font-weight: 600;',
  }];

  orderStatusList.forEach((option = Object()) => {
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
) => {
  const formValidator = new FormValidator(
    formObject.submitButton,
    'd-none',
    'is-invalid',
    'is-valid',
  );

  (function createSubmitUpdateCategoryEvent() {
    const dataUpdater = new DataUpdater(fetchLinkPrefix);

    const submitUpdateEvent = () => {
      const updateSuccessFn = () => {
        toastCreator.createToast(
          'success',
          `Update order completed \n New order status: ${formObject.orderStatus.getAttribute('value')}`,
          2
        );

        const oldOrderStatus = orderStatus;
        orderStatus = formObject.orderStatus.getAttribute('value');

        let productQuantityToastSetTimeout: NodeJS.Timeout;
        const updateOverideProductsQuantitySuccessFn = () => {
          clearTimeout(productQuantityToastSetTimeout);

          productQuantityToastSetTimeout = setTimeout(() => {
            toastCreator.createToast(
              'success',
              'Update overide products quantity completed',
              2
            );
          }, 100);
        };
        const updateOverideProductsQuantityFailedFn = () => {
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
        const updateOverideProductsSoldQuantitySuccessFn = () => {
          clearTimeout(productSoldQuantityToastSetTimeout);

          productSoldQuantityToastSetTimeout = setTimeout(() => {
            toastCreator.createToast(
              'success',
              'Update overide products sold quantity completed',
              2
            );
          }, 100);
        };
        const updateOverideProductsSoldQuantityFailedFn = () => {
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
        ) {
          const CANCELED_STATUS = 'Canceled';
          if (oldOrderStatus === CANCELED_STATUS || orderStatus === CANCELED_STATUS) {
            const productsFetchLink = 'https://tcm-shop-default-rtdb.firebaseio.com/products';
            const productQuantityColumnKey = 'ProductQuantity';
            const productSoldQuantityColumnKey = 'ProductSoldQuantity';
            const productsInformationReader = new DataReader(productsFetchLink);

            const productFetchLinkPrefix = 'https://tcm-shop-default-rtdb.firebaseio.com/products/';
            const productDataUpdater = new DataUpdater(productFetchLinkPrefix);

            const updateProductQuantityAndSoldQuantity = (
              firebaseKey: string,
              productQuantity: number,
              productSoldQuantity: number,
              offset: number
            ) => {
              const productQuantitySuffixes = `${firebaseKey}/${productQuantityColumnKey}`;
              const newProductQuantity = (oldOrderStatus === CANCELED_STATUS) ?
                (productQuantity - offset) :
                (productQuantity + offset);
              productDataUpdater.updateData(
                productQuantitySuffixes,
                newProductQuantity,
                updateOverideProductsQuantitySuccessFn,
                updateOverideProductsQuantityFailedFn
              );

              const productSoldQuantitySuffixes = `${firebaseKey}/${productSoldQuantityColumnKey}`;
              const newProductSoldQuantity = (oldOrderStatus === CANCELED_STATUS) ?
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

      const updateFailedFn = () => {
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
        const newOrderStatus = `"${formObject.orderStatus.getAttribute('value')}"`;
        const orderStatusColumnKey = 'OrderStatus';
        const orderStatusSuffixes = `${id}/${orderStatusColumnKey}`;

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
} from '../../class/table-creator.js';
import {
  ImageFormatter,
  CurrencyFormatter
} from '../../class/data-formatter.js';
const showOrderDetails = (orderDetails = Object()) => {
  const dataTable: HTMLElement = document.querySelector('#js-data-table');
  const addTableButtonEvent: Function | null = null;
  const imageFormatter = new ImageFormatter(
    []
  );
  const currencyFormatter = new CurrencyFormatter('en-US', 'USD');
  const tableColumnList = [{
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
  const tableCreator = new TableCreator(
    dataTable,
    addTableButtonEvent,
    tableColumnList,
    'rem',
  );

  const productIdColumnKey = 'ProductId';
  const productQuantityColumnKey = 'ProductQuantity';
  const data: Array<Object> = [];
  let showOrderDetailsSetTimeout: NodeJS.Timeout;
  Object.keys(orderDetails).map((firebaseKey: string) => {
    const productFirebaseKey = orderDetails[firebaseKey][productIdColumnKey];

    const fetchLink = `https://tcm-shop-default-rtdb.firebaseio.com/products/${productFirebaseKey}`;
    const productInformationReader = new DataReader(fetchLink);

    productInformationReader.readData((product = Object()) => {
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
  categoryInformationReader.readData((order: { [key: string]: any }) => {
    formObject.orderDate.value = order.OrderDate;
    formObject.orderTotalMoney.value = order.OrderTotalMoney;
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