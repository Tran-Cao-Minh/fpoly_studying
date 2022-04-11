export class CurrencyFormatter {
  private locales: string;
  private currency: string;

  constructor(
    locales: string,
    currency: string
  ) {
    this.locales = locales;
    this.currency = currency;
  }

  public formatCurrency(number: number): string {
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
  private locales: string;
  private options: toLocaleDateStringOptions;

  constructor(
    locales: string,
    options: toLocaleDateStringOptions
  ) {
    this.locales = locales;
    this.options = options;
  }

  public formatDate(date: string): string {
    const dateObj: Date = new Date(date);
    return dateObj.toLocaleDateString(this.locales, {
      year: this.options.year,
      month: this.options.month,
      day: this.options.day,
    });
  }
}

export class ImageFormatter {
  private classValue: string;

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

  public formatImage(
    base64: string,
    altText: string
  ): string {
    return `<img class="${this.classValue}" ` +
      `src="${base64}" alt="${altText}">`;
  }
};

export class LinkFormatter {
  private linkPrefix: string;
  private icon: string;
  private classValue: string;

  constructor(
    linkPrefix: string,
    classList: Array<string>,
    icon: string
  ) {
    this.linkPrefix = linkPrefix;
    this.icon = icon;

    this.classValue = (() => {
      let classValue: string = '';

      if (classList.length > 0) {
        classList.forEach((item) => {
          classValue += ` ${item}`;
        });
        classValue.slice(0, 1);
      };

      return classValue;
    })();
  }

  public formatLink(
    id: string
  ): string {
    return `<a class="${this.classValue}" href="${this.linkPrefix + id}"> ${this.icon}</a>`;
  }
};

export class ButtonFormatter {
  private icon: string;
  private classValue: string;

  constructor(
    classList: Array<string>,
    icon: string
  ) {
    this.icon = icon;

    this.classValue = (() => {
      let classValue: string = '';

      if (classList.length > 0) {
        classList.forEach((item) => {
          classValue += ` ${item}`;
        });
        classValue.slice(0, 1);
      };

      return classValue;
    })();
  }

  public formatButton(
    dataList = [{
      key: String(),
      value: String()
    }]
  ): string {
    let dataAttribute: string = '';
    dataList.forEach((data: { key: string, value: string }) => {
      dataAttribute += ` data-${data.key}="${data.value}"`;
    });
    return `<button class="${this.classValue}" type="button"${dataAttribute}> ${this.icon}</button>`;
  }
};