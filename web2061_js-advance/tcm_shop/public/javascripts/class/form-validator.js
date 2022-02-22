export function FormValidator(
  submitButton = Node(),
  hideMessageContainerClass = String(),
  inputInvalidClass = String(),
  inputValidClass = String(),
) {
  this.submitButton = submitButton;
  this.hideMessageContainerClass = hideMessageContainerClass;
  this.inputInvalidClass = inputInvalidClass;
  this.inputValidClass = inputValidClass;
  this.inputList = [];
  this.checkValidate = false;

  this.changeInputStatus = function (
    input = Node(),
    messageContainer = Node(),
    check = Boolean(),
  ) {
    if (check === true) {
      messageContainer.classList.add(this.hideMessageContainerClass);
      input.classList.remove(this.inputInvalidClass);
      input.classList.add(this.inputValidClass);

    } else if (check === false) {
      messageContainer.classList.remove(this.hideMessageContainerClass);
      input.classList.remove(this.inputValidClass);
      input.classList.add(this.inputInvalidClass);
    };
  };

  this.changeButtonStatus = function () {
    this.checkValidate = true;
    this.inputList.forEach(input => {
      if (input.classList.contains(this.inputValidClass) === false) {
        this.checkValidate = false;
      };
    });

    if (this.checkValidate === true) {
      this.submitButton.removeAttribute('disabled');

    } else {
      this.submitButton.setAttribute('disabled', '');
    };
  };

  this.addTextInputValidator = function (
    input = Node(),
    inputName = String(),
    messageContainer = Node(),
    minLength = Number(),
    maxLength = Number(),
    pattern = RegExp(),
    patternErrorMessage = String(),
  ) {
    this.inputList.push(input);
    const that = this;

    input.addEventListener('change', function () {
      input.value = input.value.trim();
      let inputValue = input.value;
      let check = false;

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

      that.changeInputStatus(
        input,
        messageContainer,
        check,
      );
      that.changeButtonStatus();
    });
  };

  this.addNumberInputValidator = function (
    input = Node(),
    inputName = String(),
    messageContainer = Node(),
    min = Number(),
    max = Number(),
    step = Number(),
  ) {
    this.inputList.push(input);
    const that = this;

    input.addEventListener('input', function () {
      input.value = input.value.trim();
      let inputValue = input.value;
      let check = false;

      if (isNaN(inputValue)) {
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

      that.changeInputStatus(
        input,
        messageContainer,
        check,
      );
      that.changeButtonStatus();
    });
  };

  this.addFileInputValidator = function (
    input = Node(),
    inputName = String(),
    messageContainer = Node(),
    fileTypeList = [String()],
    minMbSize = Number(),
    maxMbSize = Number(),
  ) {
    this.inputList.push(input);
    const that = this;
    const bytesPerMegabyte = 1048576;

    input.addEventListener('change', function (event) {
      let check = false;
      let file = event.target.files[0];
      let fileType = file.type;
      // console.log(file);

      let checkFileType = false;
      fileTypeList.forEach(type => {
        if (fileType === type) {
          checkFileType = true;
        };
      });

      if (checkFileType === false) {
        let errMessage =
          `The ${inputName} file extension must be a value in the list:`;
        fileTypeList.forEach(type => {
          errMessage += ` ${type.split('/').pop().toUpperCase()},`;
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

      that.changeInputStatus(
        input,
        messageContainer,
        check,
      );
      that.changeButtonStatus();
    });
  };

  this.addDateInputValidator = function (
    input = Node(),
    inputName = String(),
    messageContainer = Node(),
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
  ) {
    this.inputList.push(input);
    const that = this;

    let minDateTime = new Date(min.year, (min.month - 1), min.day).getTime();
    let maxDateTime = new Date(max.year, (max.month - 1), max.day).getTime();

    function validateDate() {
      let inputValue = input.value;
      let check = false;

      if (inputValue === '') {
        messageContainer.innerHTML = `The ${inputName} must be a valid date`;

      } else {
        let inputDate = inputValue.split(/\D/);
        let inputYear = Number(inputDate[0]);
        let inputMonth = Number(inputDate[1]) - 1;
        let inputDay = Number(inputDate[2]);

        let inputDateTime = new Date(inputYear, inputMonth, inputDay).getTime();

        if (inputDateTime < minDateTime || (inputYear < 100 && min.year >= 100)) {
          let minDate = `${min.day}/${min.month}/${min.year}`;
          messageContainer.innerHTML = `The ${inputName} must greater than ${minDate}`;

        } else if (inputDateTime > maxDateTime) {
          let maxDate = `${max.day}/${max.month}/${max.year}`;
          messageContainer.innerHTML = `The ${inputName} must lesser than ${maxDate}`;

        } else {
          check = true;
        };
      };

      that.changeInputStatus(
        input,
        messageContainer,
        check,
      );
      that.changeButtonStatus();
    }

    input.addEventListener('blur', function () {
      validateDate();
    });
    input.addEventListener('keypress', function (event) {
      if (event.key === 'Enter') {
        validateDate();
      };
    });
  };

  this.addRetypeInputValidator = function (
    modelInput = Node(),
    modelInputName = String(),
    input = Node(),
    inputName = String(),
    messageContainer = Node(),
  ) {
    this.inputList.push(input);
    const that = this;
    let startCheck = false;

    let check;
    function checkRetype () {
      check = (input.value === modelInput.value);

      if (check === false) {
        messageContainer.innerHTML =
          `The ${inputName} must be like the ${modelInputName}`;
      };
      
      that.changeInputStatus(
        input,
        messageContainer,
        check,
      );
      that.changeButtonStatus();
    }

    modelInput.addEventListener('change', function () {
      if (startCheck === true) {
        checkRetype();
      };
    });

    input.addEventListener('change', function () {
      startCheck = true;
      checkRetype();
    });
  };

  this.checkDuplicateValidator = function (
    input = Node(),
    inputName = String(),
    messageContainer = Node(),
    data = [String()],
    expectedResult = Boolean(),
    ignoreCase = Boolean(),
    validateOverride = Boolean(),
  ) {
    const that = this;

    function checkDuplicate(inputValue = String()) {
      if (ignoreCase === true) {
        inputValue = inputValue.toLowerCase();
        data.forEach((value, index, data) => {
          data[index] = value.toLowerCase();
        });
      };

      let check;
      if (expectedResult === true) {
        check = false;
        data.forEach(value => {
          if (inputValue === value) {
            check = true;
          };
        });

      } else if (expectedResult === false) {
        check = true;
        data.forEach(value => {
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

      that.changeInputStatus(
        input,
        messageContainer,
        check,
      );
      that.changeButtonStatus();
    }

    if (validateOverride === false) {
      this.inputList.push(input);
      input.addEventListener('change', function () {
        checkDuplicate(input.value);
      });

    } else {
      input.addEventListener('change', function () {
        if (input.classList.contains(that.inputValidClass)) {
          checkDuplicate(input.value);
        };
      });
    };
  };

  this.createSubmitButtonEvent = function (
    passedEvent = Function(),
    lockSubmitBtn = Boolean(),
  ) {
    if (lockSubmitBtn === true) {
      this.submitButton.setAttribute('disabled', 'true');
    } else {
      this.checkValidate = true;

      this.inputList.forEach(input => {
        input.classList.add(this.inputValidClass);
      });
    };

    const that = this;
    this.submitButton.addEventListener('click', function (event) {
      event.preventDefault();

      if (that.checkValidate === true) {
        passedEvent();
      };
    });
  };

  this.resetForm = function (form = Node()) {
    form.reset();

    this.inputList.forEach(input => {
      input.classList.remove(this.inputValidClass);
    });

    this.changeButtonStatus();
  };
}