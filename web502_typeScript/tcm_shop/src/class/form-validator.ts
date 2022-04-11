import { LogCreateWithName, PropertyLogger, MethodLogger } from '../decorators';

@LogCreateWithName('Form Validator')
export class FormValidator {
  @PropertyLogger
  private submitButton: HTMLButtonElement;
  @PropertyLogger
  private hideMessageContainerClass: string;
  @PropertyLogger
  private inputInvalidClass: string;
  @PropertyLogger
  private inputValidClass: string;
  @PropertyLogger
  private inputList: Array<HTMLInputElement | HTMLTextAreaElement>;
  @PropertyLogger
  private checkValidate: boolean;

  constructor(
    submitButton: HTMLButtonElement,
    hideMessageContainerClass: string,
    inputInvalidClass: string,
    inputValidClass: string,
  ) {
    this.submitButton = submitButton;
    this.hideMessageContainerClass = hideMessageContainerClass;
    this.inputInvalidClass = inputInvalidClass;
    this.inputValidClass = inputValidClass;
    this.inputList = [];
    this.checkValidate = false;
  }

  @MethodLogger
  private changeInputStatus(
    input: HTMLInputElement | HTMLTextAreaElement,
    messageContainer: HTMLSpanElement,
    check: boolean
  ): void {
    if (check === true) {
      messageContainer.classList.add(this.hideMessageContainerClass);
      input.classList.remove(this.inputInvalidClass);
      input.classList.add(this.inputValidClass);

    } else if (check === false) {
      messageContainer.classList.remove(this.hideMessageContainerClass);
      input.classList.remove(this.inputValidClass);
      input.classList.add(this.inputInvalidClass);
    };
  }

  @MethodLogger
  private changeButtonStatus(): void {
    this.checkValidate = true;
    this.inputList.forEach((input: HTMLInputElement) => {
      if (input.classList.contains(this.inputValidClass) === false) {
        this.checkValidate = false;
      };
    });

    if (this.checkValidate === true) {
      this.submitButton.removeAttribute('disabled');

    } else {
      this.submitButton.setAttribute('disabled', '');
    };
  }

  @MethodLogger
  public addTextInputValidator(
    input: HTMLInputElement | HTMLTextAreaElement,
    inputName: string,
    messageContainer: HTMLElement,
    minLength: number,
    maxLength: number,
    pattern: RegExp,
    patternErrorMessage: string
  ): void {
    this.inputList.push(input);

    input.addEventListener('change', () => {
      input.value = input.value.trim();
      const inputValue: string = input.value;
      let check: boolean = false;

      if (inputValue.length < minLength) {
        messageContainer.innerHTML =
          `The ${inputName} must have more than ${minLength} `;
        if (minLength === 1) {
          messageContainer.innerHTML += 'character';
        } else {
          messageContainer.innerHTML += 'characters';
        };

      } else if (inputValue.length > maxLength) {
        messageContainer.innerHTML =
          `The ${inputName} must have less than ${maxLength} `;
        if (maxLength === 1) {
          messageContainer.innerHTML += 'character';
        } else {
          messageContainer.innerHTML += 'characters';
        };

      } else if (pattern.test(inputValue) === false) {
        messageContainer.innerHTML = patternErrorMessage;

      } else {
        check = true;
      };

      this.changeInputStatus(
        input,
        messageContainer,
        check,
      );
      this.changeButtonStatus();
    });
  }

  @MethodLogger
  public addNumberInputValidator(
    input: HTMLInputElement,
    inputName: string,
    messageContainer: HTMLElement,
    min: number,
    max: number,
    step: number
  ): void {
    this.inputList.push(input);

    input.addEventListener('input', () => {
      const inputValue: number = Number(input.value);
      let check: boolean = false;

      if (isNaN(inputValue) || input.value === '') {
        messageContainer.innerHTML = `The ${inputName} must be a number`;

      } else if (inputValue < min) {
        messageContainer.innerHTML =
          `The ${inputName} must greater than ${min}`;

      } else if (inputValue > max) {
        messageContainer.innerHTML =
          `The ${inputName} must lesser than ${max}`;

      } else if ((inputValue / step) % 1 !== 0) {
        messageContainer.innerHTML =
          `The ${inputName} step must be ${step}`;

      } else {
        check = true;
      };

      this.changeInputStatus(
        input,
        messageContainer,
        check,
      );
      this.changeButtonStatus();
    });
  }

  @MethodLogger
  public addFileInputValidator(
    input: HTMLInputElement,
    inputName: string,
    messageContainer: HTMLElement,
    fileMIMETypeList: Array<string>,
    minMbSize: number,
    maxMbSize: number
  ): void {
    this.inputList.push(input);
    const bytesPerMegabyte: number = 1048576;

    input.addEventListener('change', (event: InputEvent) => {
      let check: boolean = false;
      const file: File = (<HTMLInputElement>event.target).files[0];
      const fileType: string = file.type;
      // console.log(file);

      let checkFileType: boolean = false;
      fileMIMETypeList.forEach((MIMEType: string) => {
        if (fileType === MIMEType) {
          checkFileType = true;
        };
      });

      if (checkFileType === false) {
        let errMessage: string =
          `The ${inputName} file extension must be a value in the list:`;
        fileMIMETypeList.forEach(MIMEType => {
          errMessage += ` ${MIMEType.split('/').pop().toUpperCase()},`;
        });

        messageContainer.innerHTML = errMessage.slice(0, -2);

      } else if (file.size < (minMbSize * bytesPerMegabyte)) {
        messageContainer.innerHTML =
          `The ${inputName} file size must greater than ${minMbSize} MB`;

      } else if (file.size > (maxMbSize * bytesPerMegabyte)) {
        messageContainer.innerHTML =
          `The ${inputName} file size must lesser than ${maxMbSize} MB`;

      } else {
        check = true;
      };

      this.changeInputStatus(
        input,
        messageContainer,
        check
      );
      this.changeButtonStatus();
    });
  }

  @MethodLogger
  public addDateInputValidator(
    input: HTMLInputElement,
    inputName: string,
    messageContainer: HTMLElement,
    min = {
      day: Number(),
      month: Number(),
      year: Number(), // >= 100 - recommend
    },
    max = {
      day: Number(),
      month: Number(),
      year: Number(),
    },
  ): void {
    this.inputList.push(input);

    const minDateTime: number = new Date(min.year, (min.month - 1), min.day).getTime();
    const maxDateTime: number = new Date(max.year, (max.month - 1), max.day).getTime();

    const validateDate = () => {
      const inputValue: string = input.value;
      let check: boolean = false;

      if (inputValue === '') {
        messageContainer.innerHTML = `The ${inputName} must be a valid date`;

      } else {
        const inputDate: Array<string> = inputValue.split(/\D/);
        const inputYear: number = Number(inputDate[0]);
        const inputMonth: number = Number(inputDate[1]) - 1;
        const inputDay: number = Number(inputDate[2]);

        const inputDateTime: number = new Date(inputYear, inputMonth, inputDay).getTime();

        if (inputDateTime < minDateTime || (inputYear < 100 && min.year >= 100)) {
          const minDate: string = `${min.day}/${min.month}/${min.year}`;
          messageContainer.innerHTML = `The ${inputName} must greater than ${minDate}`;

        } else if (inputDateTime > maxDateTime) {
          const maxDate: string = `${max.day}/${max.month}/${max.year}`;
          messageContainer.innerHTML = `The ${inputName} must lesser than ${maxDate}`;

        } else {
          check = true;
        };
      };

      this.changeInputStatus(
        input,
        messageContainer,
        check
      );
      this.changeButtonStatus();
    }

    input.addEventListener('blur', validateDate);
    input.addEventListener('keypress', (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        validateDate();
      };
    });
  }

  @MethodLogger
  public addRetypeInputValidator(
    modelInput: HTMLInputElement,
    modelInputName: string,
    input: HTMLInputElement,
    inputName: string,
    messageContainer: HTMLElement
  ): void {
    this.inputList.push(input);
    let startCheck: boolean = false;

    let check: boolean;

    const checkRetype = () => {
      check = (input.value === modelInput.value);

      if (check === false) {
        messageContainer.innerHTML =
          `The ${inputName} must be like the ${modelInputName}`;
      };

      this.changeInputStatus(
        input,
        messageContainer,
        check,
      );
      this.changeButtonStatus();
    };

    modelInput.addEventListener('change', () => {
      if (startCheck === true) {
        checkRetype();
      };
    });

    input.addEventListener('change', () => {
      startCheck = true;
      checkRetype();
    });
  }

  @MethodLogger
  public checkDuplicateValidator(
    input: HTMLInputElement,
    inputName: string,
    messageContainer: HTMLElement,
    dataList: Array<string>,
    expectedResult = Boolean(),
    ignoreCase = Boolean(),
    validateOverride = Boolean()
  ): void {
    input.setAttribute(
      'data-duplicate',
      JSON.stringify(dataList)
    );

    const checkDuplicate = (inputValue: string) => {
      const data: any = JSON.parse(input.dataset.duplicate);

      if (ignoreCase === true) {
        inputValue = inputValue.toLowerCase();
        data.forEach((value: string, index: number, data: Array<string>) => {
          data[index] = value.toLowerCase();
        });
      };

      let check: boolean;
      if (expectedResult === true) {
        check = false;
        data.forEach((value: string) => {
          if (inputValue === value) {
            check = true;
          };
        });

      } else if (expectedResult === false) {
        check = true;
        data.forEach((value: string) => {
          if (inputValue === value) {
            check = false;
          };
        });
      };

      if (check === false && expectedResult === false) {
        messageContainer.innerHTML = `The ${inputName} is exist`;

      } else if (check === false && expectedResult === true) {
        messageContainer.innerHTML = `The ${inputName} is not exist`;
      };

      this.changeInputStatus(
        input,
        messageContainer,
        check
      );
      this.changeButtonStatus();
    }

    if (validateOverride === false) {
      this.inputList.push(input);
      input.addEventListener('change', () => {
        checkDuplicate(input.value);
      });

    } else {
      input.addEventListener('change', () => {
        if (input.classList.contains(this.inputValidClass)) {
          checkDuplicate(input.value);
        };
      });
    };
  }
  @MethodLogger
  public changeDuplicateValue(
    input: HTMLInputElement,
    value: string,
    exist: boolean
  ): void {
    const dataList: any = JSON.parse(input.dataset.duplicate);

    if (exist === true) {
      dataList.push(value);

    } else {
      dataList.splice(dataList.indexOf(value), 1);
    };

    input.setAttribute(
      'data-duplicate',
      JSON.stringify(dataList)
    );
  }

  @MethodLogger
  public createSubmitButtonEvent(
    passedEvent: Function,
    lockSubmitBtn: boolean
  ): void {
    if (lockSubmitBtn === true) {
      this.submitButton.setAttribute('disabled', 'true');
    } else {
      this.checkValidate = true;

      this.inputList.forEach((input: HTMLInputElement) => {
        input.classList.add(this.inputValidClass);
      });
    };

    this.submitButton.addEventListener('click', (event: SubmitEvent) => {
      event.preventDefault();

      if (this.checkValidate === true) {
        passedEvent();
      };
    });
  }

  @MethodLogger
  public resetForm(form: HTMLFormElement): void {
    form.reset();

    this.inputList.forEach((input: HTMLInputElement) => {
      input.classList.remove(this.inputValidClass);
    });

    this.changeButtonStatus();
  }
}