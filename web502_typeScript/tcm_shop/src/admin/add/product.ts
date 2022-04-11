import {
  CustomSelectCreator
} from '../../class/custom-select-creator.js';
import {
  DataReader,
  DataAdder,
  DataUpdater
} from '../../class/data-interactor.js';
import {
  FormValidator
} from '../../class/form-validator.js';
import {
  ToastCreator
} from '../../class/toast-creator.js';
import {
  SingleImagePreviewer
} from '../../class/image-previewer.js';

const toastCreator = new ToastCreator(
  'bottom',
  16,
  'right',
  16,
);

const formObject = {
  form: <HTMLFormElement>document.querySelector('#addProductForm'),
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

const previewProductImage = () => {
  const productImageInput: HTMLInputElement = document.querySelector('#productImage');
  const productImageFileNameContainer: HTMLElement =
    productImageInput.parentElement.querySelector('[for=productImage]');
  const productImageElement: HTMLImageElement =
    productImageInput.parentElement.parentElement.querySelector('img.js-preview-image');

  const productImagePreviewer = new SingleImagePreviewer(productImageInput);
  productImagePreviewer.addShowImageFileNameEvent(productImageFileNameContainer);
  productImagePreviewer.addShowImageEvent(productImageElement);
};

const createCustomDisplayStatusSelect = () => {
  const productDisplaySelect: HTMLElement = document.querySelector('#productDisplay');
  const productDisplaySelectContainer: HTMLElement =
    productDisplaySelect.querySelector('.custom-select-list');
  const productDisplaySelectText: HTMLElement =
    productDisplaySelect.querySelector('.custom-select-text');
  const productDisplaySelectLabelList =
    document.querySelectorAll('[for=productDisplay]');
  const productDisplaySelectCreator = new CustomSelectCreator(
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

  const displayStatus = ['Show', 'Hide'];
  displayStatus.forEach((item) => {
    productDisplaySelectCreator.addOptionItem(
      item,
      [{
        key: 'value',
        data: item,
      }]
    );
  });

  productDisplaySelectCreator.createCustomSelect(
    displayStatus[0],
    productDisplaySelectText,
    'choosen',
  );
};

const createCustomCategorySelect = () => {
  const productCategorySelect: HTMLElement = document.querySelector('#productCategory');
  const productCategorySelectContainer: HTMLElement =
    productCategorySelect.querySelector('.custom-select-list');
  const productCategorySelectText: HTMLElement =
    productCategorySelect.querySelector('.custom-select-text');
  const productCategorySelectLabel: HTMLElement =
    document.querySelector('[for=productCategory]');
  const productCategorySelectCreator = new CustomSelectCreator(
    productCategorySelect,
    'active',
    productCategorySelectContainer,
    [
      'value',
    ],
  );
  productCategorySelectCreator.createLabelPointer(productCategorySelectLabel);

  const categoryDataReader =
    new DataReader('https://tcm-shop-default-rtdb.firebaseio.com/categories');
  const categoryNameColumnKey = 'CategoryName';

  categoryDataReader.readData((fullData = Object()) => {
    Object.keys(fullData).map((firebaseKey) => {
      const categoryName = fullData[firebaseKey][categoryNameColumnKey];

      productCategorySelectCreator.addOptionItem(
        categoryName,
        [{
          key: 'value',
          data: categoryName,
        }, ]
      );
    });

    productCategorySelectCreator.createCustomSelect(
      fullData[Object.keys(fullData)[0]][categoryNameColumnKey],
      productCategorySelectText,
      'choosen',
    );
  });
};

const createCustomTagSelect = () => {
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

  const productTagList = ['None', 'Hot', 'New'];
  productTagList.forEach((item) => {
    productTagSelectCreator.addOptionItem(
      item,
      [{
        key: 'value',
        data: item,
      }]
    );
  });

  productTagSelectCreator.createCustomSelect(
    productTagList[0],
    productTagSelectText,
    'choosen',
  );
}

const createFormValidator = () => {
  const formValidator = new FormValidator(
    formObject.submitButton,
    'd-none',
    'is-invalid',
    'is-valid',
  );

  (function validateProductName() {
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

    const productNameReader = new DataReader('https://tcm-shop-default-rtdb.firebaseio.com/products');
    const productNameColumnKey = 'ProductName';
    productNameReader.readData((fullData = Object()) => {
      const productNameList: Array<string> = [];

      Object.keys(fullData).map((key) => {
        productNameList.push(fullData[key][productNameColumnKey]);
      });

      formValidator.checkDuplicateValidator(
        formObject.productName,
        'product name',
        productNameMessageContainer,
        productNameList,
        false,
        false,
        true,
      );
    }, );
  })();

  (function validateProductPublisher() {
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

  (function validateProductDimensions() {
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

  (function validateProductPublishDate() {
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

  (function validateProductPrice() {
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

  (function validateProductSalePercent() {
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

  (function validateProductQuantity() {
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

  (function validateProductOrder() {
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

  (function validateProductPages() {
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

  (function validateProductImage() {
    const productImageMessageContainer: HTMLElement =
      formObject.productImage.parentElement.parentElement.querySelector('.invalid-feedback');

    formValidator.addFileInputValidator(
      formObject.productImage,
      'product image',
      productImageMessageContainer,
      ['image/jpeg', '+/webp', ],
      0,
      2,
    );
  })();

  (function validateProductDescription() {
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

  (function createSubmitAddProductEvent() {
    const fetchLink = 'https://tcm-shop-default-rtdb.firebaseio.com/products';
    const dataAdder = new DataAdder(fetchLink);

    const submitAddEvent = () => {
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

        'ProductViews': 0,
        'ProductSoldQuantity': 0
      });

      const addSuccessFn = () => {
        toastCreator.createToast(
          'success',
          `Add product completed \n Product name: ${formObject.productName.value}`,
          2
        );

        formValidator.changeDuplicateValue(
          formObject.productName,
          formObject.productName.value,
          true
        );

        formValidator.resetForm(formObject.form);
        (function resetImg() {
          (<HTMLImageElement>formObject.productImage.parentElement.parentElement.querySelector('img.js-preview-image')).src = '/images/base/preview-img.svg';
          (<HTMLElement>formObject.productImage.parentElement.querySelector('[for=productImage]')).innerText = 'Choose an image';
        })();

        (function increaseCategoryProductQuantity(categoryName: string) {
          const categoriesFetchLink = 'https://tcm-shop-default-rtdb.firebaseio.com/categories';
          const categoryNameColumnKey = 'CategoryName';
          const categoryProductQuantityColumnKey = 'CategoryProductQuantity';
          const categoriesInformationReader = new DataReader(categoriesFetchLink);

          const categoryProductQuantityFetchLinkPrefix = 'https://tcm-shop-default-rtdb.firebaseio.com/categories/';
          const categoryProductQuantityDataUpdater = new DataUpdater(categoryProductQuantityFetchLinkPrefix);

          const updateCategoryProductQuantity = (
            firebaseKey: string,
            categoryProductQuantity: number
          ) => {
            const categoryProductQuantitySuffixes = firebaseKey + '/' + categoryProductQuantityColumnKey;
            const newCategoryProductQuantity = categoryProductQuantity + 1;

            categoryProductQuantityDataUpdater.updateData(
              categoryProductQuantitySuffixes,
              newCategoryProductQuantity,
              updateCategoryProductQuantitySuccessFn,
              updateCategoryProductQuantityFailedFn
            );
          };

          const updateCategoryProductQuantitySuccessFn = () => {
            setTimeout(() => {
              toastCreator.createToast(
                'success',
                `Update overide category product quantity of "${categoryName}" completed`,
                2
              );
            }, 100);
          };
          const updateCategoryProductQuantityFailedFn = () => {
            setTimeout(() => {
              toastCreator.createToast(
                'danger',
                'Update overide pcategory product quantity failed',
                2
              );
            }, 100);
          };

          categoriesInformationReader.readData((fullData: { [key: string]: any }) => {
            Object.keys(fullData).map((firebaseKey) => {
              if (fullData[firebaseKey][categoryNameColumnKey] === categoryName) {
                updateCategoryProductQuantity(
                  firebaseKey,
                  fullData[firebaseKey][categoryProductQuantityColumnKey]
                );
              };
            });
          });
        })(formObject.productCategory.getAttribute('value'));
      };

      const addFailedFn = () => {
        toastCreator.createToast(
          'danger',
          'Add product failed',
          2
        );
      };

      dataAdder.addData(
        formData,
        addSuccessFn,
        addFailedFn
      );
    };

    formValidator.createSubmitButtonEvent(
      submitAddEvent,
      true
    );
  })();
}

window.addEventListener('load', () => {
  previewProductImage();

  createCustomDisplayStatusSelect();
  createCustomCategorySelect();
  createCustomTagSelect();

  createFormValidator();
});