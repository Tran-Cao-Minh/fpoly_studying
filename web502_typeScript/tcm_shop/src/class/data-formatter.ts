export class CurrencyFormatter {
  locales: string;
  currency: string;

  constructor(
    locales: string,
    currency: string
  ) {
    this.locales = locales;
    this.currency = currency;
  }

  formatCurrency(number: number) {
    return number.toLocaleString(this.locales, {
      style: 'currency',
      currency: this.currency
    });
  }
};

interface toLocaleDateStringOptions {
  year: "numeric" | "2-digit";
  month: "numeric" | "2-digit" | "long" | "short" | "narrow";
  day: "numeric" | "2-digit"; 
};
export class DateFormatter {
  locales: string;
  options: toLocaleDateStringOptions;

  constructor(
    locales: string,
    options: toLocaleDateStringOptions
  ) {
    this.locales = locales;
    this.options = options;
  }

  formatDate(date: string) {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString(this.locales, {
      year: this.options.year,
      month: this.options.month,
      day: this.options.day,
    });
  }
}

export class ImageFormatter {
  classValue: string;

  constructor(
    classList: Array<string>
  ) {
    this.classValue = (() => {
      let classValue = '';

      if (classList.length > 0) {
        classList.forEach((item) => {
          classValue += ` ${item}`;
        });
        classValue.slice(0, 1);
      };

      return classValue;
    })();
  }

  formatImage(
    base64: string,
    altText: string
  ) {
    return `<img class="${this.classValue}" ` +
      `src="${base64}" alt="${altText}">`;
  }
};

export class LinkFormatter {
  linkPrefix: string;
  icon: string;
  classValue: string;

  constructor(
    linkPrefix: string,
    classList: Array<string>,
    icon: string
  ) {
    this.linkPrefix = linkPrefix;
    this.icon = icon;

    this.classValue = (() => {
      let classValue = '';

      if (classList.length > 0) {
        classList.forEach((item) => {
          classValue += ` ${item}`;
        });
        classValue.slice(0, 1);
      };

      return classValue;
    })();
  }

  formatLink(
    id: string
  ) {
    return `<a class="${this.classValue}" href="${this.linkPrefix + id}"> ${this.icon}</a>`;
  }
};

export class ButtonFormatter {
  icon: string;
  classValue: string;

  constructor(
    classList: Array<string>,
    icon: string
  ) {
    this.icon = icon;

    this.classValue = (() => {
      let classValue = '';

      if (classList.length > 0) {
        classList.forEach((item) => {
          classValue += ` ${item}`;
        });
        classValue.slice(0, 1);
      };

      return classValue;
    })();
  }

  formatButton(
    dataList = [{
      key: String(),
      value: String()
    }]
  ) {
    let dataAttribute = '';
    dataList.forEach(data => {
      dataAttribute += ` data-${data.key}="${data.value}"`;
    });
    return `<button class="${this.classValue}" type="button"${dataAttribute}> ${this.icon}</button>`;
  }
};