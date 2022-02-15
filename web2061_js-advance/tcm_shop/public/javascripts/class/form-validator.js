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

  this.escapeRegExp = function (str = String()) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
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
        console.log(inputValue);
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

    input.addEventListener('change', function () {
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

  this.createSubmitButtonEvent = function (
    passedEvent = Function(),
  ) {
    this.submitButton.setAttribute('disabled', 'true');

    const that = this;
    this.submitButton.addEventListener('click', function (event) {
      event.preventDefault();

      if (that.checkValidate === true) {
        passedEvent();
      };
    });
  };
}