import {
  CustomSelectCreator
} from '../../class/custom-select-creator';
import {
  DataReader,
  DataAdder
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
  16,
);

const fetchLink: string = 'https://tcm-shop-default-rtdb.firebaseio.com/categories';

const formObject = {
  form: <HTMLFormElement>document.querySelector('#addCategoryForm'),
  categoryName: <HTMLInputElement>document.querySelector('#categoryName'),
  categoryOrder: <HTMLInputElement>document.querySelector('#categoryOrder'),
  categoryDisplay: <HTMLElement>document.querySelector('#categoryDisplay'),
  submitButton: <HTMLButtonElement>document.querySelector('#js-add-data-submit'),
};

const createCustomDisplayStatusSelect = (): void => {
  const categoryDisplaySelect: HTMLElement = document.querySelector('#categoryDisplay');
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
    displayStatus[0],
    categoryDisplaySelectText,
    'choosen',
  );
};

const createFormValidator = (): void => {
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

    (function checkCategoryNameDuplicateValidator (): void {
      const dataReader: DataReader = new DataReader(fetchLink);
      dataReader.readData((fullData: { [key: string]: any }) => {
        const dataList: Array<string> = (() => {
          const dataList: Array<string> = [];

          Object.keys(fullData).map((key) => {
            dataList.push(fullData[key]['CategoryName']);
          });

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

  (function createSubmitAddCategoryEvent(): void {
    const dataAdder: DataAdder = new DataAdder(fetchLink);

    const submitAddEvent = () => {
      const formData: string = JSON.stringify({
        'CategoryName': formObject.categoryName.value,
        'CategoryOrder': Number(formObject.categoryOrder.value),
        'CategoryDisplay': formObject.categoryDisplay.getAttribute('value'),
        'CategoryProductQuantity': 0
      });

      const addSuccessFn = (): void => {
        toastCreator.createToast(
          'success',
          `Add category completed \n Category name: ${formObject.categoryName.value}`,
          2
        );

        formValidator.changeDuplicateValue(
          formObject.categoryName,
          formObject.categoryName.value,
          true
        );
        formValidator.resetForm(formObject.form);
      };

      const addFailedFn = (): void => {
        toastCreator.createToast(
          'danger',
          'Add category failed',
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
};

window.addEventListener('load', () => {
  createCustomDisplayStatusSelect();
  createFormValidator();
});