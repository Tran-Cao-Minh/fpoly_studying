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
  form: <HTMLFormElement>document.querySelector('#updateCategoryForm'),
  categoryName: <HTMLInputElement>document.querySelector('#categoryName'),
  categoryOrder: <HTMLInputElement>document.querySelector('#categoryOrder'),
  categoryDisplay: <HTMLElement>document.querySelector('#categoryDisplay'),
  submitButton: <HTMLButtonElement>document.querySelector('#js-update-data-submit'),
};

const createCustomDisplayStatusSelect = (
  categoryDisplay: string
) => {
  const categoryDisplaySelect = formObject.categoryDisplay;
  const categoryDisplaySelectContainer: HTMLElement =
    categoryDisplaySelect.querySelector('.custom-select-list');
  const categoryDisplaySelectText: HTMLElement =
    categoryDisplaySelect.querySelector('.custom-select-text');
  const categoryDisplaySelectLabelList: NodeListOf<HTMLElement> =
    document.querySelectorAll('[for=categoryDisplay]');
  const categoryDisplaySelectCreator = new CustomSelectCreator(
    categoryDisplaySelect,
    'active',
    categoryDisplaySelectContainer,
    [
      'value',
    ],
  );
  categoryDisplaySelectLabelList.forEach((label: HTMLElement) => {
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
};

const createFormValidator = (
  categoryName: string,
  categoryOrder: string,
  categoryDisplay: string,
  categoryProductQuantity: number
) => {
  const formValidator = new FormValidator(
    formObject.submitButton,
    'd-none',
    'is-invalid',
    'is-valid',
  );

  (function validateCategoryName() {
    const categoryNameMessageContainer: HTMLElement =
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
      dataReader.readData((fullData: { [key: string]: any }) => {
        const dataList = (() => {
          const dataList: Array<string> = [];

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
    const categoryOrderMessageContainer: HTMLElement =
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

  (function createSubmitUpdateCategoryEvent() {
    const dataUpdater = new DataUpdater(fetchLinkPrefix);

    const submitUpdateEvent = () => {
      const updateSuccessFn = () => {
        toastCreator.createToast(
          'success',
          `Update category completed \n Category name: ${formObject.categoryName.value}`,
          2
        );

        const oldCategoryName = categoryName;
        categoryName = formObject.categoryName.value;
        categoryOrder = formObject.categoryOrder.value;
        categoryDisplay = formObject.categoryDisplay.getAttribute('value');

        let toastSetTimeout: NodeJS.Timeout;
        const updateProductCategorySuccessFn = () => {
          clearTimeout(toastSetTimeout);

          toastSetTimeout = setTimeout(() => {
            toastCreator.createToast(
              'success',
              `Update overide products completed - New category name: ${categoryName}`,
              2
            );
          }, 100);
        };
        const updateProductCategoryFailedFn = () => {
          clearTimeout(toastSetTimeout);

          toastSetTimeout = setTimeout(() => {
            toastCreator.createToast(
              'danger',
              'Update overide products category failed',
              2
            );
          }, 100);
        };

        (function updateOverideProductsCategory(categoryName: string) {
          const productsFetchLink = 'https://tcm-shop-default-rtdb.firebaseio.com/products';
          const categoryNameColumnKey = 'ProductCategory';
          const productsInformationReader = new DataReader(productsFetchLink);

          const productCategoryFetchLinkPrefix = 'https://tcm-shop-default-rtdb.firebaseio.com/products/';
          const productCategoryDataUpdater = new DataUpdater(productCategoryFetchLinkPrefix);

          const updateProductCategory = (
            firebaseKey: string,
            categoryName: string
          ) => {
            const productCategorySuffixes = firebaseKey + '/' + categoryNameColumnKey;
            const newCategoryName = `"${categoryName}"`;

            productCategoryDataUpdater.updateData(
              productCategorySuffixes,
              newCategoryName,
              updateProductCategorySuccessFn,
              updateProductCategoryFailedFn
            );
          };

          productsInformationReader.readData((fullData: { [key: string]: any }) => {
            Object.keys(fullData).map((firebaseKey) => {
              if (fullData[firebaseKey][categoryNameColumnKey] === oldCategoryName) {
                updateProductCategory(firebaseKey, categoryName);
              };
            });
          });
        })(categoryName);
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
  })();
};

interface category {
  CategoryName: string,
  CategoryOrder: number,
  CategoryDisplay: string,
  CategoryProductQuantity: number
};
window.addEventListener('load', () => {
  const categoryInformationReader = new DataReader(fetchLinkPrefix + id);
  categoryInformationReader.readData((category: category) => {
    formObject.categoryName.value = category.CategoryName;
    formObject.categoryOrder.value = String(category.CategoryOrder);
    createCustomDisplayStatusSelect(category.CategoryDisplay);

    createFormValidator(
      category.CategoryName,
      String(category.CategoryOrder),
      category.CategoryDisplay,
      category.CategoryProductQuantity
    );
  });
});