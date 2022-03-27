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
const fetchLinkPrefix = 'https://tcm-shop-default-rtdb.firebaseio.com/categories/';
const id = pageUrl.substring(pageUrl.lastIndexOf('/') + 1);

const formObject = {
  form: document.querySelector('#updateCategoryForm'),
  categoryName: document.querySelector('#categoryName'),
  categoryOrder: document.querySelector('#categoryOrder'),
  categoryDisplay: document.querySelector('#categoryDisplay'),
  submitButton: document.querySelector('#js-update-data-submit'),
};

const createCustomDisplayStatusSelect = (
  categoryDisplay = String()
) => {
  const categoryDisplaySelect = formObject.categoryDisplay;
  const categoryDisplaySelectContainer =
    categoryDisplaySelect.querySelector('.custom-select-list');
  const categoryDisplaySelectText =
    categoryDisplaySelect.querySelector('.custom-select-text');
  const categoryDisplaySelectLabelList =
    document.querySelectorAll('[for=categoryDisplay]');
  const categoryDisplaySelectCreator = new CustomSelectCreator(
    categoryDisplaySelect,
    'active',
    categoryDisplaySelectContainer,
    [
      'value',
    ],
  );
  categoryDisplaySelectLabelList.forEach(label => {
    categoryDisplaySelectCreator.createLabelPointer(label);
  });

  const displayStatus = ['Show', 'Hide'];
  displayStatus.forEach((item) => {
    categoryDisplaySelectCreator.addOptionItem(
      item,
      [{
        key: 'value',
        data: item,
      }]
    );
  });

  categoryDisplaySelectCreator.createCustomSelect(
    categoryDisplay,
    categoryDisplaySelectText,
    'choosen',
  );
}

const createFormValidator = (
  categoryName = String(),
  categoryOrder = String(),
  categoryDisplay = String(),
  categoryProductQuantity = Number()
) => {
  const formValidator = new FormValidator(
    formObject.submitButton,
    'd-none',
    'is-invalid',
    'is-valid',
  );

  (function validateCategoryName() {
    const categoryNameMessageContainer =
      formObject.categoryName.parentElement.parentElement.querySelector('.invalid-feedback');

    formValidator.addTextInputValidator(
      formObject.categoryName,
      'category name',
      categoryNameMessageContainer,
      4,
      200,
      /^([A-Za-z0-9]{1})([\w\s'":,.&+|-]{0,199})$/,
      `Category name must be start with alphanumeric and 
    contains only alphanumeric, underscore or some specials 
    characters include , ' " : - ; _ + . |`,
    );

    (function checkCategoryNameDuplicateValidator() {
      const dataReader = new DataReader('https://tcm-shop-default-rtdb.firebaseio.com/categories');
      dataReader.readData((fullData) => {
        const dataList = (() => {
          const dataList = [];
  
          Object.keys(fullData).map((key) => {
            dataList.push(fullData[key]['CategoryName']);
          });
  
          const categoryNameIndex = dataList.indexOf(categoryName);
          dataList.splice(categoryNameIndex, 1);

          return dataList;
        })();

        formValidator.checkDuplicateValidator(
          formObject.categoryName,
          'category name',
          categoryNameMessageContainer,
          dataList,
          false,
          false,
          true,
        );
      });
    })();
  })();

  (function validateCategoryOrder() {
    const categoryOrderMessageContainer =
      formObject.categoryOrder.parentElement.parentElement.querySelector('.invalid-feedback');
    formValidator.addNumberInputValidator(
      formObject.categoryOrder,
      'category order',
      categoryOrderMessageContainer,
      1,
      99,
      1,
    );
  })();

  const dataUpdater = new DataUpdater(
    'https://tcm-shop-default-rtdb.firebaseio.com/categories/'
  );

  const submitUpdateEvent = () => {
    const updateSuccessFn = () => {
      toastCreator.createToast(
        'success',
        `Update category completed \n Category name: ${formObject.categoryName.value}`,
        2
      );

      categoryName = formObject.categoryName.value;
      categoryOrder = formObject.categoryOrder.value;
      categoryDisplay = formObject.categoryDisplay.getAttribute('value');

      // TODO: Update overide product
    };

    const updateFailedFn = () => {
      toastCreator.createToast(
        'danger',
        'Update category failed',
        2
      );
    };

    if (
      formObject.categoryName.value === categoryName &&
      formObject.categoryOrder.value === categoryOrder &&
      formObject.categoryDisplay.getAttribute('value') === categoryDisplay
    ) {
      toastCreator.createToast(
        'warning',
        'Please change at least one field before updating',
        2
      );

    } else {
      const formData = JSON.stringify({
        'CategoryName': formObject.categoryName.value,
        'CategoryOrder': Number(formObject.categoryOrder.value),
        'CategoryDisplay': formObject.categoryDisplay.getAttribute('value'),
        'CategoryProductQuantity': categoryProductQuantity
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
    submitUpdateEvent,
    false
  );
}

window.addEventListener('load', function () {
  const categoryInformationReader = new DataReader(fetchLinkPrefix + id);
  categoryInformationReader.readData((category) => {
    formObject.categoryName.value = category.CategoryName;
    formObject.categoryOrder.value = category.CategoryOrder;
    createCustomDisplayStatusSelect(category.CategoryDisplay);

    createFormValidator(
      category.CategoryName,
      String(category.CategoryOrder),
      category.CategoryDisplay,
      category.CategoryProductQuantity
    );
  });
});