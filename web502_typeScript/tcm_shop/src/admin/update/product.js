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
import {
  SingleImagePreviewer
} from '../../class/image-previewer.js';

const toastCreator = new ToastCreator(
  'bottom',
  16,
  'right',
  16,
);

const pageUrl = location.href;
const fetchLinkPrefix = 'https://tcm-shop-default-rtdb.firebaseio.com/products/';
const id = pageUrl.substring(pageUrl.lastIndexOf('/') + 1);

const formObject = {
  form: document.querySelector('#addProductForm'),
  productName: document.querySelector('#productName'),
  productPublisher: document.querySelector('#productPublisher'),
  productDimensions: document.querySelector('#productDimensions'),
  productPublishDate: document.querySelector('#productPublishDate'),
  productCategory: document.querySelector('#productCategory'),
  productTag: document.querySelector('#productTag'),
  productDisplay: document.querySelector('#productDisplay'),
  productPrice: document.querySelector('#productPrice'),
  productSalePercent: document.querySelector('#productSalePercent'),
  productQuantity: document.querySelector('#productQuantity'),
  productOrder: document.querySelector('#productOrder'),
  productPages: document.querySelector('#productPages'),
  productImage: document.querySelector('#productImage'),
  productDescription: document.querySelector('#productDescription'),
  submitButton: document.querySelector('#js-add-data-submit'),
};

const previewProductImage = (dataBase64 = String()) => {
  const productImageInput = document.querySelector('#productImage');
  const productImageFileNameContainer =
    productImageInput.parentElement.querySelector('[for=productImage]');
  const productImageElement =
    productImageInput.parentElement.parentElement.querySelector('img.js-preview-image');

  const productImagePreviewer = new SingleImagePreviewer(productImageInput);
  productImagePreviewer.addShowImageFileNameEvent(productImageFileNameContainer);
  productImagePreviewer.addShowImageEvent(productImageElement);

  productImageInput.setAttribute('data-base64', dataBase64);
  productImageElement.src = dataBase64;
};

const createCustomDisplayStatusSelect = (productDisplay = String()) => {
  const productDisplaySelect = document.querySelector('#productDisplay');
  const productDisplaySelectContainer =
    productDisplaySelect.querySelector('.custom-select-list');
  const productDisplaySelectText =
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
  productDisplaySelectLabelList.forEach((label = Node()) => {
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
    productDisplay,
    productDisplaySelectText,
    'choosen',
  );
};

const createCustomCategorySelect = (productCategory = String()) => {
  const productCategorySelect = document.querySelector('#productCategory');
  const productCategorySelectContainer =
    productCategorySelect.querySelector('.custom-select-list');
  const productCategorySelectText =
    productCategorySelect.querySelector('.custom-select-text');
  const productCategorySelectLabel =
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
      productCategory,
      productCategorySelectText,
      'choosen',
    );
  });
};

const createCustomTagSelect = (productTag = String()) => {
  const productTagSelect = document.querySelector('#productTag');
  const productTagSelectContainer =
    productTagSelect.querySelector('.custom-select-list');
  const productTagSelectText =
    productTagSelect.querySelector('.custom-select-text');
  const productTagSelectLabel =
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
    productTag,
    productTagSelectText,
    'choosen',
  );
}

const createFormValidator = (
  productName = String(),
  productPublisher = String(),
  productDimensions = String(),
  productPublishDate = String(),
  productCategory = String(),
  productTag = String(),
  productDisplay = String(),
  productPrice = String(),
  productSalePercent = String(),
  productQuantity = String(),
  productOrder = String(),
  productPages = String(),
  productImage = String(),
  productDescription = String(),
  productSoldQuantity = Number(),
  productViews = Number()
) => {
  const formValidator = new FormValidator(
    formObject.submitButton,
    'd-none',
    'is-invalid',
    'is-valid',
  );

  (function validateProductName() {
    const productNameMessageContainer =
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

    (function checkProductNameDuplicateValidator() {
      const productNameReader = new DataReader('https://tcm-shop-default-rtdb.firebaseio.com/products');
      const productNameColumnKey = 'ProductName';
      productNameReader.readData((fullData = Object()) => {
        const productNameList = (() => {
          const productNameList = [];

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
      }, );
    })();
  })();

  (function validateProductPublisher() {
    const productPublisherMessageContainer =
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
    const productDimensionsMessageContainer =
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
    const productPublishDateMessageContainer =
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
    const productPriceMessageContainer =
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
    const productSalePercentMessageContainer =
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
    const productQuantityMessageContainer =
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
    const productOrderMessageContainer =
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
    const productPagesMessageContainer =
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
    const productImageMessageContainer =
      formObject.productImage.parentElement.parentElement.querySelector('.invalid-feedback');

    formValidator.addFileInputValidator(
      formObject.productImage,
      'product image',
      productImageMessageContainer,
      ['image/jpeg', 'image/webp', ],
      0,
      2,
    );
  })();

  (function validateProductDescription() {
    const productDescriptionMessageContainer =
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
    const dataUpdater = new DataUpdater(fetchLinkPrefix);

    const submitAddEvent = () => {
      const updateSuccessFn = () => {
        toastCreator.createToast(
          'success',
          `Update product completed \n Product name: ${formObject.productName.value}`,
          2
        );

        (function changeCategoryProductQuantity(newCategoryName = String(), oldCategoryName) {
          if (newCategoryName !== oldCategoryName) {
            const categoriesFetchLink = 'https://tcm-shop-default-rtdb.firebaseio.com/categories';
            const categoryNameColumnKey = 'CategoryName';
            const categoryProductQuantityColumnKey = 'CategoryProductQuantity';
            const categoriesInformationReader = new DataReader(categoriesFetchLink);

            const categoryProductQuantityFetchLinkPrefix = 'https://tcm-shop-default-rtdb.firebaseio.com/categories/';
            const categoryProductQuantityDataUpdater = new DataUpdater(categoryProductQuantityFetchLinkPrefix);

            const changeCategoryProductQuantity = (
              categoryName = String(),
              firebaseKey = String(),
              categoryProductQuantity = Number(),
              unit = Number()
            ) => {
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
                    'Update overide category product quantity failed',
                    2
                  );
                }, 100);
              };

              const categoryProductQuantitySuffixes = firebaseKey + '/' + categoryProductQuantityColumnKey;
              const newCategoryProductQuantity = categoryProductQuantity + unit;

              categoryProductQuantityDataUpdater.updateData(
                categoryProductQuantitySuffixes,
                newCategoryProductQuantity,
                updateCategoryProductQuantitySuccessFn,
                updateCategoryProductQuantityFailedFn
              );
            };

            categoriesInformationReader.readData((fullData) => {
              Object.keys(fullData).map((firebaseKey) => {
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

      const updateFailedFn = () => {
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

window.addEventListener('load', () => {
  const productInformationReader = new DataReader(fetchLinkPrefix + id);
  productInformationReader.readData((product) => {
    formObject.productName.value = product.ProductName;
    formObject.productPublisher.value = product.ProductPublisher;
    formObject.productDimensions.value = product.ProductDimensions;
    formObject.productPublishDate.value = product.ProductPublishDate;
    createCustomCategorySelect(product.ProductCategory);
    createCustomTagSelect(product.ProductTag);
    createCustomDisplayStatusSelect(product.ProductDisplay);
    formObject.productPrice.value = product.ProductPrice;
    formObject.productSalePercent.value = product.ProductSalePercent;
    formObject.productQuantity.value = product.ProductQuantity;
    formObject.productOrder.value = product.ProductOrder;
    formObject.productPages.value = product.ProductPages;
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
    );
  });
});