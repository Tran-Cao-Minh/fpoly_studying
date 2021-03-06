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
import {
  SingleImagePreviewer
} from '../../class/image-previewer';

const toastCreator: ToastCreator = new ToastCreator(
  'bottom',
  16,
  'right',
  16,
);

const pageUrl: string = location.href;
const fetchLinkPrefix: string = 'https://tcm-shop-default-rtdb.firebaseio.com/products/';
const id: string = pageUrl.substring(pageUrl.lastIndexOf('/') + 1);

const formObject = {
  form: document.querySelector('#addProductForm'),
  productName: <HTMLInputElement>document.querySelector('#productName'),
  productPublisher: <HTMLInputElement>document.querySelector('#productPublisher'),
  productDimensions: <HTMLInputElement>document.querySelector('#productDimensions'),
  productPublishDate: <HTMLInputElement>document.querySelector('#productPublishDate'),
  productCategory: document.querySelector('#productCategory'),
  productTag: document.querySelector('#productTag'),
  productDisplay: document.querySelector('#productDisplay'),
  productPrice: <HTMLInputElement>document.querySelector('#productPrice'),
  productSalePercent: <HTMLInputElement>document.querySelector('#productSalePercent'),
  productQuantity: <HTMLInputElement>document.querySelector('#productQuantity'),
  productOrder: <HTMLInputElement>document.querySelector('#productOrder'),
  productPages: <HTMLInputElement>document.querySelector('#productPages'),
  productImage: <HTMLInputElement>document.querySelector('#productImage'),
  productDescription: <HTMLTextAreaElement>document.querySelector('#productDescription'),
  submitButton: <HTMLButtonElement>document.querySelector('#js-add-data-submit'),
};

const previewProductImage = (dataBase64: string): void => {
  const productImageInput: HTMLInputElement = document.querySelector('#productImage');
  const productImageFileNameContainer: HTMLElement =
    productImageInput.parentElement.querySelector('[for=productImage]');
  const productImageElement: HTMLImageElement =
    productImageInput.parentElement.parentElement.querySelector('img.js-preview-image');

  const productImagePreviewer: SingleImagePreviewer = new SingleImagePreviewer(productImageInput);
  productImagePreviewer.addShowImageFileNameEvent(productImageFileNameContainer);
  productImagePreviewer.addShowImageEvent(productImageElement);

  productImageInput.setAttribute('data-base64', dataBase64);
  productImageElement.src = dataBase64;
};

const createCustomDisplayStatusSelect = (productDisplay: string): void => {
  const productDisplaySelect: HTMLElement = document.querySelector('#productDisplay');
  const productDisplaySelectContainer: HTMLElement =
    productDisplaySelect.querySelector('.custom-select-list');
  const productDisplaySelectText: HTMLElement =
    productDisplaySelect.querySelector('.custom-select-text');
  const productDisplaySelectLabelList: NodeListOf<HTMLElement> =
    document.querySelectorAll('[for=productDisplay]');
  const productDisplaySelectCreator: CustomSelectCreator = new CustomSelectCreator(
    productDisplaySelect,
    'active',
    productDisplaySelectContainer,
    [
      'value',
    ],
  );
  productDisplaySelectLabelList.forEach((label: HTMLElement) => {
    productDisplaySelectCreator.createLabelPointer(label);
  });

  const displayStatus: Array<string> = ['Show', 'Hide'];
  displayStatus.forEach((item: string) => {
    productDisplaySelectCreator.addOptionItem(
      item,
      [{
        key: 'value',
        data: item,
      }]
    );
  });

  productDisplaySelectCreator.createCustomSelect(
    productDisplay,
    productDisplaySelectText,
    'choosen',
  );
};

const createCustomCategorySelect = (productCategory: string): void => {
  const productCategorySelect: HTMLElement = document.querySelector('#productCategory');
  const productCategorySelectContainer: HTMLElement =
    productCategorySelect.querySelector('.custom-select-list');
  const productCategorySelectText: HTMLElement =
    productCategorySelect.querySelector('.custom-select-text');
  const productCategorySelectLabel: HTMLElement =
    document.querySelector('[for=productCategory]');
  const productCategorySelectCreator: CustomSelectCreator = new CustomSelectCreator(
    productCategorySelect,
    'active',
    productCategorySelectContainer,
    [
      'value',
    ],
  );
  productCategorySelectCreator.createLabelPointer(productCategorySelectLabel);

  const categoryDataReader: DataReader =
    new DataReader('https://tcm-shop-default-rtdb.firebaseio.com/categories');
  const categoryNameColumnKey: string = 'CategoryName';

  categoryDataReader.readData((fullData: { [key: string]: any }) => {
    Object.keys(fullData).map((firebaseKey: string) => {
      const categoryName: string = fullData[firebaseKey][categoryNameColumnKey];

      productCategorySelectCreator.addOptionItem(
        categoryName,
        [{
          key: 'value',
          data: categoryName,
        },]
      );
    });

    productCategorySelectCreator.createCustomSelect(
      productCategory,
      productCategorySelectText,
      'choosen',
    );
  });
};

const createCustomTagSelect = (productTag: string): void => {
  const productTagSelect: HTMLElement = document.querySelector('#productTag');
  const productTagSelectContainer: HTMLElement =
    productTagSelect.querySelector('.custom-select-list');
  const productTagSelectText: HTMLElement =
    productTagSelect.querySelector('.custom-select-text');
  const productTagSelectLabel: HTMLElement =
    document.querySelector('[for=productTag]');
  const productTagSelectCreator = new CustomSelectCreator(
    productTagSelect,
    'active',
    productTagSelectContainer,
    [
      'value',
    ],
  );
  productTagSelectCreator.createLabelPointer(productTagSelectLabel);

  const productTagList: Array<string> = ['None', 'Hot', 'New'];
  productTagList.forEach((item: string) => {
    productTagSelectCreator.addOptionItem(
      item,
      [{
        key: 'value',
        data: item,
      }]
    );
  });

  productTagSelectCreator.createCustomSelect(
    productTag,
    productTagSelectText,
    'choosen',
  );
}

const createFormValidator = (
  productName: string,
  productPublisher: string,
  productDimensions: string,
  productPublishDate: string,
  productCategory: string,
  productTag: string,
  productDisplay: string,
  productPrice: string,
  productSalePercent: string,
  productQuantity: string,
  productOrder: string,
  productPages: string,
  productImage: string,
  productDescription: string,
  productSoldQuantity: number,
  productViews: number
) => {
  const formValidator: FormValidator = new FormValidator(
    formObject.submitButton,
    'd-none',
    'is-invalid',
    'is-valid',
  );

  (function validateProductName(): void {
    const productNameMessageContainer: HTMLElement =
      formObject.productName.parentElement.parentElement.querySelector('.invalid-feedback');

    formValidator.addTextInputValidator(
      formObject.productName,
      'product name',
      productNameMessageContainer,
      4,
      200,
      /^([A-Za-z0-9]{1})([\w\s'":,.&+|-]{3,199})$/,
      `Product name must be start with alphanumeric and 
      contains only alphanumeric, underscore or some specials 
      characters include , ' " : - ; _ + . |`,
    );

    (function checkProductNameDuplicateValidator(): void {
      const productNameReader: DataReader = new DataReader('https://tcm-shop-default-rtdb.firebaseio.com/products');
      const productNameColumnKey: string = 'ProductName';
      productNameReader.readData((fullData = Object()) => {
        const productNameList: Array<string> = (() => {
          const productNameList: Array<string> = [];

          Object.keys(fullData).map((key) => {
            productNameList.push(fullData[key][productNameColumnKey]);
          });

          const productNameIndex = productNameList.indexOf(productName);
          productNameList.splice(productNameIndex, 1);

          return productNameList;
        })();

        formValidator.checkDuplicateValidator(
          formObject.productName,
          'product name',
          productNameMessageContainer,
          productNameList,
          false,
          false,
          true,
        );
      });
    })();
  })();

  (function validateProductPublisher(): void {
    const productPublisherMessageContainer: HTMLElement =
      formObject.productPublisher.parentElement.parentElement.querySelector('.invalid-feedback');

    formValidator.addTextInputValidator(
      formObject.productPublisher,
      'product publisher',
      productPublisherMessageContainer,
      4,
      200,
      /^([A-Za-z0-9]{1})([\w\s'":,.&+|-]{3,199})$/,
      `Product publisher must be start with alphanumeric and 
      contains only alphanumeric, underscore or some specials 
      characters include , ' " : - ; _ + . |`,
    );
  })();

  (function validateProductDimensions(): void {
    const productDimensionsMessageContainer: HTMLElement =
      formObject.productDimensions.parentElement.parentElement.querySelector('.invalid-feedback');

    formValidator.addTextInputValidator(
      formObject.productDimensions,
      'product dimensions',
      productDimensionsMessageContainer,
      4,
      200,
      /^([A-Za-z0-9]{1})([\w\s'":,.&+|-]{0,199})$/,
      `Product dimensions must be start with alphanumeric and 
      contains only alphanumeric, underscore or some specials 
      characters include , ' " : - ; _ + . |`,
    );
  })();

  (function validateProductPublishDate(): void {
    const productPublishDateMessageContainer: HTMLElement =
      formObject.productPublishDate.parentElement.parentElement.querySelector('.invalid-feedback');

    formValidator.addDateInputValidator(
      formObject.productPublishDate,
      'product publish date',
      productPublishDateMessageContainer, {
      day: 1,
      month: 1,
      year: 1800
    }, {
      day: 31,
      month: 12,
      year: 3000
    },
    );
  })();

  (function validateProductPrice(): void {
    const productPriceMessageContainer: HTMLElement =
      formObject.productPrice.parentElement.parentElement.querySelector('.invalid-feedback');

    formValidator.addNumberInputValidator(
      formObject.productPrice,
      'product price',
      productPriceMessageContainer,
      0,
      999999999.99,
      0.01
    );
  })();

  (function validateProductSalePercent(): void {
    const productSalePercentMessageContainer: HTMLElement =
      formObject.productSalePercent.parentElement.parentElement.querySelector('.invalid-feedback');

    formValidator.addNumberInputValidator(
      formObject.productSalePercent,
      'product sale percent',
      productSalePercentMessageContainer,
      0,
      100,
      1
    );
  })();

  (function validateProductQuantity(): void {
    const productQuantityMessageContainer: HTMLElement =
      formObject.productQuantity.parentElement.parentElement.querySelector('.invalid-feedback');

    formValidator.addNumberInputValidator(
      formObject.productQuantity,
      'product quantity',
      productQuantityMessageContainer,
      0,
      999999999,
      1
    );
  })();

  (function validateProductOrder(): void {
    const productOrderMessageContainer: HTMLElement =
      formObject.productOrder.parentElement.parentElement.querySelector('.invalid-feedback');

    formValidator.addNumberInputValidator(
      formObject.productOrder,
      'product order',
      productOrderMessageContainer,
      1,
      99,
      1,
    );
  })();

  (function validateProductPages(): void {
    const productPagesMessageContainer: HTMLElement =
      formObject.productPages.parentElement.parentElement.querySelector('.invalid-feedback');

    formValidator.addNumberInputValidator(
      formObject.productPages,
      'product pages',
      productPagesMessageContainer,
      1,
      99999,
      1
    );
  })();

  (function validateProductImage(): void {
    const productImageMessageContainer: HTMLElement =
      formObject.productImage.parentElement.parentElement.querySelector('.invalid-feedback');

    formValidator.addFileInputValidator(
      formObject.productImage,
      'product image',
      productImageMessageContainer,
      ['image/jpeg', 'image/webp',],
      0,
      2,
    );
  })();

  (function validateProductDescription(): void {
    const productDescriptionMessageContainer: HTMLElement =
      formObject.productDescription.parentElement.parentElement.querySelector('.invalid-feedback');

    formValidator.addTextInputValidator(
      formObject.productDescription,
      'product description',
      productDescriptionMessageContainer,
      50,
      2000,
      /^([A-Za-z0-9]{1})([\s\S]{49,1999})$/,
      `Product description must be start with alphanumeric`,
    );
  })();

  (function createSubmitAddProductEvent(): void {
    const dataUpdater: DataUpdater = new DataUpdater(fetchLinkPrefix);

    const submitAddEvent = (): void => {
      const updateSuccessFn = (): void => {
        toastCreator.createToast(
          'success',
          `Update product completed \n Product name: ${formObject.productName.value}`,
          2
        );

        (function changeCategoryProductQuantity(newCategoryName: string, oldCategoryName): void {
          if (newCategoryName !== oldCategoryName) {
            const categoriesFetchLink: string 
              = 'https://tcm-shop-default-rtdb.firebaseio.com/categories';
            const categoryNameColumnKey: string = 'CategoryName';
            const categoryProductQuantityColumnKey: string = 'CategoryProductQuantity';
            const categoriesInformationReader: DataReader = new DataReader(categoriesFetchLink);

            const categoryProductQuantityFetchLinkPrefix: string 
              = 'https://tcm-shop-default-rtdb.firebaseio.com/categories/';
            const categoryProductQuantityDataUpdater: DataUpdater 
              = new DataUpdater(categoryProductQuantityFetchLinkPrefix);

            const changeCategoryProductQuantity = (
              categoryName: string,
              firebaseKey: string,
              categoryProductQuantity: number,
              unit: number
            ): void => {
              const updateCategoryProductQuantitySuccessFn = (): void => {
                setTimeout(() => {
                  toastCreator.createToast(
                    'success',
                    `Update overide category product quantity of "${categoryName}" completed`,
                    2
                  );
                }, 100);
              };
              const updateCategoryProductQuantityFailedFn = (): void => {
                setTimeout(() => {
                  toastCreator.createToast(
                    'danger',
                    'Update overide category product quantity failed',
                    2
                  );
                }, 100);
              };

              const categoryProductQuantitySuffixes: string = firebaseKey + '/' + categoryProductQuantityColumnKey;
              const newCategoryProductQuantity: number = categoryProductQuantity + unit;

              categoryProductQuantityDataUpdater.updateData(
                categoryProductQuantitySuffixes,
                newCategoryProductQuantity,
                updateCategoryProductQuantitySuccessFn,
                updateCategoryProductQuantityFailedFn
              );
            };

            categoriesInformationReader.readData((fullData: { [key: string]: any }) => {
              Object.keys(fullData).map((firebaseKey: string) => {
                if (fullData[firebaseKey][categoryNameColumnKey] === newCategoryName) {
                  changeCategoryProductQuantity(
                    newCategoryName,
                    firebaseKey,
                    fullData[firebaseKey][categoryProductQuantityColumnKey],
                    1
                  );
                };
                if (fullData[firebaseKey][categoryNameColumnKey] === oldCategoryName) {
                  changeCategoryProductQuantity(
                    oldCategoryName,
                    firebaseKey,
                    fullData[firebaseKey][categoryProductQuantityColumnKey],
                    -1
                  );
                };
              });
            });
          };
        })(formObject.productCategory.getAttribute('value'), productCategory);

        productName = formObject.productName.value;
        productPublisher = formObject.productPublisher.value;
        productDimensions = formObject.productDimensions.value;
        productPublishDate = formObject.productPublishDate.value;
        productCategory = formObject.productCategory.getAttribute('value');
        productTag = formObject.productTag.getAttribute('value');
        productDisplay = formObject.productDisplay.getAttribute('value');
        productPrice = formObject.productPrice.value;
        productSalePercent = formObject.productSalePercent.value;
        productQuantity = formObject.productQuantity.value;
        productOrder = formObject.productOrder.value;
        productPages = formObject.productPages.value;
        productImage = formObject.productImage.dataset.base64;
        productDescription = formObject.productDescription.value;
      };

      const updateFailedFn = (): void => {
        toastCreator.createToast(
          'danger',
          'Update product failed',
          2
        );
      };

      if (
        formObject.productName.value === productName &&
        formObject.productPublisher.value === productPublisher &&
        formObject.productDimensions.value === productDimensions &&
        formObject.productPublishDate.value === productPublishDate &&
        formObject.productCategory.getAttribute('value') === productCategory &&
        formObject.productTag.getAttribute('value') === productTag &&
        formObject.productDisplay.getAttribute('value') === productDisplay &&
        formObject.productPrice.value === productPrice &&
        formObject.productSalePercent.value === productSalePercent &&
        formObject.productQuantity.value === productQuantity &&
        formObject.productOrder.value === productOrder &&
        formObject.productPages.value === productPages &&
        formObject.productImage.dataset.base64 === productImage &&
        formObject.productDescription.value === productDescription
      ) {
        toastCreator.createToast(
          'warning',
          'Please change at least one field before updating',
          2
        );

      } else {
        const formData = JSON.stringify({
          'ProductName': formObject.productName.value,
          'ProductPublisher': formObject.productPublisher.value,
          'ProductDimensions': formObject.productDimensions.value,
          'ProductPublishDate': formObject.productPublishDate.value,
          'ProductCategory': formObject.productCategory.getAttribute('value'),
          'ProductTag': formObject.productTag.getAttribute('value'),
          'ProductDisplay': formObject.productDisplay.getAttribute('value'),
          'ProductPrice': Number(formObject.productPrice.value),
          'ProductSalePercent': Number(formObject.productSalePercent.value),
          'ProductQuantity': Number(formObject.productQuantity.value),
          'ProductOrder': Number(formObject.productOrder.value),
          'ProductPages': Number(formObject.productPages.value),
          'ProductImage': formObject.productImage.dataset.base64,
          'ProductDescription': formObject.productDescription.value,
          'ProductViews': productViews,
          'ProductSoldQuantity': productSoldQuantity
        });

        dataUpdater.updateData(
          id,
          formData,
          updateSuccessFn,
          updateFailedFn
        );
      };
    };

    formValidator.createSubmitButtonEvent(
      submitAddEvent,
      false
    );
  })();
}

import { Product } from '../interfaces/dataItem';
window.addEventListener('load', () => {
  const productInformationReader = new DataReader(fetchLinkPrefix + id);
  productInformationReader.readData((product: Product) => {
    formObject.productName.value = product.ProductName;
    formObject.productPublisher.value = product.ProductPublisher;
    formObject.productDimensions.value = product.ProductDimensions;
    formObject.productPublishDate.value = product.ProductPublishDate;
    createCustomCategorySelect(product.ProductCategory);
    createCustomTagSelect(product.ProductTag);
    createCustomDisplayStatusSelect(product.ProductDisplay);
    formObject.productPrice.value = String(product.ProductPrice);
    formObject.productSalePercent.value = String(product.ProductSalePercent);
    formObject.productQuantity.value = String(product.ProductQuantity);
    formObject.productOrder.value = String(product.ProductOrder);
    formObject.productPages.value = String(product.ProductPages);
    previewProductImage(product.ProductImage);
    formObject.productDescription.value = product.ProductDescription;

    createFormValidator(
      product.ProductName,
      product.ProductPublisher,
      product.ProductDimensions,
      product.ProductPublishDate,
      product.ProductCategory,
      product.ProductTag,
      product.ProductDisplay,
      String(product.ProductPrice),
      String(product.ProductSalePercent),
      String(product.ProductQuantity),
      String(product.ProductOrder),
      String(product.ProductPages),
      product.ProductImage,
      product.ProductDescription,
      product.ProductSoldQuantity,
      product.ProductViews
    );
  });
});