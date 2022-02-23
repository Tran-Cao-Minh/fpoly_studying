import {
  CustomSelectCreator
} from '../../class/custom-select-creator.js';
import {
  DataReader,
  DataAdder
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

const formData = new FormData();

const toastCreator = new ToastCreator(
  'bottom',
  16,
  'right',
  16,
);

function previewProductImage() {
  const productImageInput = document.querySelector('#productImage');
  const productImageFileNameContainer =
    productImageInput.parentElement.querySelector('[for=productImage]');
  const productImageElement =
    productImageInput.parentElement.parentElement.querySelector('img.js-preview-image');

  const productImagePreviewer = new SingleImagePreviewer(productImageInput);
  productImagePreviewer.addShowImageFileNameEvent(productImageFileNameContainer);
  productImagePreviewer.addShowImageEvent(productImageElement);
}

function createCustomDisplayStatusSelect() {
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
  productDisplaySelectLabelList.forEach(label => {
    productDisplaySelectCreator.createLabelPointer(label);
  });

  const displayStatusDataReader =
    new DataReader('http://localhost:3000/display-status/');

  displayStatusDataReader.readData(null, function addProductDisplaySelectData(data) {
    data.forEach(displayStatus => {
      productDisplaySelectCreator.addOptionItem(
        displayStatus.StatusName,
        [{
          key: 'value',
          data: displayStatus.PkDisplayStatus_Id,
        }, ]
      );
    });

    productDisplaySelectCreator.createCustomSelect(
      String(data[1].PkDisplayStatus_Id),
      productDisplaySelectText,
      'choosen',
    );
  });
}

function createCustomCategorySelect() {
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
    new DataReader('http://localhost:3000/category/');

  categoryDataReader.readData({
    'columnList': [
      'CategoryId',
      'CategoryName',
    ],
    'searchValue': '',
    'searchMode': 'searchByValue',
    'searchColumn': 'CategoryId',
    'orderRule': 'ASC',
    'orderColumn': 'CategoryId',
    'resultQuantity': 999999999999,
    'pageNum': 1
  }, function addProductCategorySelectData(result) {
    const data = result.data;
    data.forEach(category => {
      productCategorySelectCreator.addOptionItem(
        category.CategoryName,
        [{
          key: 'value',
          data: category.CategoryId,
        }, ]
      );
    });

    productCategorySelectCreator.createCustomSelect(
      String(data[0].CategoryId),
      productCategorySelectText,
      'choosen',
    );
  });
}

function createCustomTagSelect() {
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

  const tagsDataReader =
    new DataReader('http://localhost:3000/product/tags');

  tagsDataReader.readData(null, function addProductDisplaySelectData(data) {
    data.forEach(tag => {
      productTagSelectCreator.addOptionItem(
        tag.TagName,
        [{
          key: 'value',
          data: tag.PkProductTag_Id,
        }, ]
      );
    });

    productTagSelectCreator.createCustomSelect(
      String(data[1].PkProductTag_Id),
      productTagSelectText,
      'choosen',
    );
  });
}

function createFormValidator() {
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
      /^([A-Za-z0-9]{1})([\w\s'":,.&+|-]{0,199})$/,
      `Product name must be start with alphanumeric and 
      contains only alphanumeric, underscore or some specials 
      characters include , ' " : - ; _ + . |`,
    );
    const productNameReader = new DataReader('http://localhost:3000/product/');
    productNameReader.readData({
        'columnList': [
          'ProductName'
        ],
        'searchValue': '',
        'searchMode': 'searchByValue',
        'searchColumn': 'ProductName',
        'orderRule': 'ASC',
        'orderColumn': 'ProductName',
        'resultQuantity': 999999999999,
        'pageNum': 1
      },
      function addProductNameCheckExist(result) {
        let dataList = [];

        result.data.forEach(valueObject => {
          dataList.push(valueObject.ProductName);
        });

        formValidator.checkDuplicateValidator(
          formObject.productName,
          'product name',
          productNameMessageContainer,
          dataList,
          false,
          false,
          true,
        );
      },
    );
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
      /^([A-Za-z0-9]{1})([\w\s'":,.&+|-]{0,199})$/,
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
      0.01,
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
      1,
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
      1,
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
      1,
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

    formValidator.addFileInputValidator(
      formObject.productDescription,
      'product description',
      productDescriptionMessageContainer,
      ['image/jpeg', 'image/webp', ],
      0,
      2,
    );

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

  (function createSubmitAddProductEvent () {
    const fetchLink = 'http://localhost:3000/product/';
    const dataAdder = new DataAdder(
      fetchLink,
    );
  
    formValidator.createSubmitButtonEvent(
      function () {
        formData.set(
          'productName',
          formObject.productName.value
        );
        formData.set(
          'productPublisher',
          formObject.productPublisher.value
        );
        formData.set(
          'productDimensions',
          formObject.productDimensions.value
        );
        formData.set(
          'productPublishDate',
          formObject.productPublishDate.value
        );
        formData.set(
          'productCategory',
          formObject.productCategory.getAttribute('value')
        );
        formData.set(
          'productTag',
          formObject.productTag.getAttribute('value')
        );
        formData.set(
          'productDisplay',
          formObject.productDisplay.getAttribute('value')
        );
        formData.set(
          'productPrice',
          formObject.productPrice.value
        );  
        formData.set(
          'productSalePercent',
          formObject.productSalePercent.value
        );  
        formData.set(
          'productQuantity',
          formObject.productQuantity.value
        );  
        formData.set(
          'productOrder',
          formObject.productOrder.value
        );  
        formData.set(
          'productPages',
          formObject.productPages.value
        );  
        formData.set(
          'productImage',
          formObject.productImage.files[0]
        );  
        formData.set(
          'productDescription',
          formObject.productDescription.value
        );  
  
        dataAdder.addData(
          formData,
          true,
          function (data) {
            // if (data.result === 'success') {
            //   toastCreator.createToast(
            //     'success',
            //     data.notification,
            //     2,
            //   );
  
            //   formValidator.changeDuplicateValue(
            //     formObject.productName,
            //     formObject.productName.value,
            //     true,
            //   );
            //   formValidator.resetForm(formObject.form);
  
            // } else if (data.result === 'fail') {
            //   toastCreator.createToast(
            //     'danger',
            //     data.notification,
            //     2,
            //   );
            // };
          },
        );
      },
      true,
    );
  })();
}

window.addEventListener('load', function () {
  previewProductImage();

  createCustomDisplayStatusSelect();
  createCustomCategorySelect();
  createCustomTagSelect();

  createFormValidator();
});