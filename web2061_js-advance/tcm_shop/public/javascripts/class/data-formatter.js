export function CurrencyFormatter(
  locales = String(),
  currency = String(),
) {
  this.locales = locales;
  this.currency = currency;

  this.formatCurrency = function (number = Number()) {
    return number.toLocaleString(this.locales, {
      style: 'currency',
      currency: this.currency,
    });
  };
};

export function DateFormatter(
  locales = String(),
  options = {
    year: String(),
    month: String(),
    day: String(),
  },
) {
  this.locales = locales;
  this.options = options;

  this.formatDate = function (
    date = Date(),
  ) {
    return date.toLocaleDateString(this.locales, {
      year: this.options.year,
      month: this.options.month,
      day: this.options.day,
    });
  };
}

export function ImageFormatter(
  linkPrefix = String(),
  classList = Array(),
) {
  this.linkPrefix = linkPrefix;

  this.getClassValue = function () {
    this.classValue = '';
    if (classList.length > 0) {
      classList.forEach(item => {
        classValue += ` ${item}`;
      });
      classValue.slice(0, 1);
    };
  };
  this.getClassValue();

  this.formatImage = function (
    fileName = String(),
    altText = String(),
  ) {
    return `<img class="${this.classValue}" ` +
      `src="${this.linkPrefix + fileName}.jpg" alt="${altText}">`;
  };
};

export function LinkFormatter(
  linkPrefix = String(),
  classList = Array(String()),
  icon = String(),
) {
  this.linkPrefix = linkPrefix;
  this.icon = icon;

  this.getClassValue = function () {
    this.classValue = '';
    if (classList.length > 0) {
      classList.forEach(item => {
        this.classValue += ` ${item}`;
      });
      classList.slice(0, 1);
    };
  };
  this.getClassValue();

  this.formatLink = function (
    id = String(),
  ) {
    return `<a class="${this.classValue}" ` +
      `href="${this.linkPrefix + id}"> ` +
      `${this.icon}` +
      `</a>`
  };
};

export function ButtonFormatter(
  classList = Array(),
  icon = String(),
) {
  this.icon = icon;

  this.getClassValue = function () {
    this.classValue = '';
    if (classList.length > 0) {
      classList.forEach(item => {
        this.classValue += ` ${item}`;
      });
      classList.slice(0, 1);
    };
  };
  this.getClassValue();

  this.formatButton = function (
    dataList = [{
      key: String(),
      value: String(),
    }],
  ) {
    let dataAttribute = '';
    dataList.forEach(data => {
      dataAttribute += ` data-${data.key}="${data.value}"`
    });
    return `<button class="${this.classValue}" ` +
      `type="button"${dataAttribute}> ` +
      `${this.icon}` +
      `</button>`
  };
};