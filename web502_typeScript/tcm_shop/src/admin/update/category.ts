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
import { Category } from '../interfaces/dataItem';

const toastCreator: ToastCreator = new ToastCreator(
  'bottom',
  16,
  'right',
  16
);

const pageUrl: string = location.href;
const fetchLinkPrefix: string = 'https://tcm-shop-default-rtdb.firebaseio.com/categories/';
const id: string = pageUrl.substring(pageUrl.lastIndexOf('/') + 1);

const formObject = {
  form: <HTMLFormElement>document.querySelector('#updateCategoryForm'),
  categoryName: <HTMLInputElement>document.querySelector('#categoryName'),
  categoryOrder: <HTMLInputElement>document.querySelector('#categoryOrder'),
  categoryDisplay: <HTMLElement>document.querySelector('#categoryDisplay'),
  submitButton: <HTMLButtonElement>document.querySelector('#js-update-data-submit'),
};

const createCustomDisplayStatusSelect = (
  categoryDisplay: string
): void => {
  const categoryDisplaySelect = formObject.categoryDisplay;
  const categoryDisplaySelectContainer: HTMLElement =
    categoryDisplaySelect.querySelector('.custom-select-list');
  const categoryDisplaySelectText: HTMLElement =
    categoryDisplaySelect.querySelector('.custom-select-text');
  const categoryDisplaySelectLabelList: NodeListOf<HTMLElement> =
    document.querySelectorAll('[for=categoryDisplay]');
  const categoryDisplaySelectCreator: CustomSelectCreator = new CustomSelectCreator(
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

  const displayStatus: Array<string> = ['Show', 'Hide'];
  displayStatus.forEach((item: string) => {
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
): void => {
  const formValidator: FormValidator = new FormValidator(
    formObject.submitButton,
    'd-none',
    'is-invalid',
    'is-valid',
  );

  (function validateCategoryName(): void {
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

    (function checkCategoryNameDuplicateValidator(): void {
      const dataReader: DataReader = new DataReader('https://tcm-shop-default-rtdb.firebaseio.com/categories');
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

  (function validateCategoryOrder(): void {
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

  (function createSubmitUpdateCategoryEvent(): void {
    const dataUpdater: DataUpdater = new DataUpdater(fetchLinkPrefix);

    const submitUpdateEvent = (): void => {
      const updateSuccessFn = (): void => {
        toastCreator.createToast(
          'success',
          `Update category completed \n Category name: ${formObject.categoryName.value}`,
          2
        );

        const oldCategoryName: string = categoryName;
        categoryName = formObject.categoryName.value;
        categoryOrder = formObject.categoryOrder.value;
        categoryDisplay = formObject.categoryDisplay.getAttribute('value');

        let toastSetTimeout: NodeJS.Timeout;
        const updateProductCategorySuccessFn = (): void => {
          clearTimeout(toastSetTimeout);

          toastSetTimeout = setTimeout(() => {
            toastCreator.createToast(
              'success',
              `Update overide products completed - New category name: ${categoryName}`,
              2
            );
          }, 100);
        };
        const updateProductCategoryFailedFn = (): void => {
          clearTimeout(toastSetTimeout);

          toastSetTimeout = setTimeout(() => {
            toastCreator.createToast(
              'danger',
              'Update overide products category failed',
              2
            );
          }, 100);
        };

        (function updateOverideProductsCategory(categoryName: string): void {
          const productsFetchLink: string 
            = 'https://tcm-shop-default-rtdb.firebaseio.com/products';
          const categoryNameColumnKey: string 
            = 'ProductCategory';
          const productsInformationReader: DataReader = new DataReader(productsFetchLink);

          const productCategoryFetchLinkPrefix: string 
            = 'https://tcm-shop-default-rtdb.firebaseio.com/products/';
          const productCategoryDataUpdater: DataUpdater 
            = new DataUpdater(productCategoryFetchLinkPrefix);

          const updateProductCategory = (
            firebaseKey: string,
            categoryName: string
          ): void => {
            const productCategorySuffixes: string = firebaseKey + '/' + categoryNameColumnKey;
            const newCategoryName: string = `"${categoryName}"`;

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

      const updateFailedFn = (): void => {
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

window.addEventListener('load', () => {
  const categoryInformationReader = new DataReader(fetchLinkPrefix + id);
  categoryInformationReader.readData((category: Category) => {
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