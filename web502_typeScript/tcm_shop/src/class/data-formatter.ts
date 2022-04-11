import { LogCreateWithName, MethodLogger, PropertyLogger } from '../decorators';

@LogCreateWithName('Currency Formatter')
export class CurrencyFormatter {
  @PropertyLogger
  private locales: string;
  @PropertyLogger
  private currency: string;

  constructor(
    locales: string,
    currency: string
  ) {
    this.locales = locales;
    this.currency = currency;
  }

  @MethodLogger
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
@LogCreateWithName('Date Formatter')
export class DateFormatter {
  @PropertyLogger
  private locales: string;
  @PropertyLogger
  private options: toLocaleDateStringOptions;

  constructor(
    locales: string,
    options: toLocaleDateStringOptions
  ) {
    this.locales = locales;
    this.options = options;
  }

  @MethodLogger
  public formatDate(date: string): string {
    const dateObj: Date = new Date(date);
    return dateObj.toLocaleDateString(this.locales, {
      year: this.options.year,
      month: this.options.month,
      day: this.options.day,
    });
  }
}

@LogCreateWithName('Image Formatter')
export class ImageFormatter {
  @PropertyLogger
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

  @MethodLogger
  public formatImage(
    base64: string,
    altText: string
  ): string {
    return `<img class="${this.classValue}" ` +
      `src="${base64}" alt="${altText}">`;
  }
};

@LogCreateWithName('Link Formatter')
export class LinkFormatter {
  @PropertyLogger
  private linkPrefix: string;
  @PropertyLogger
  private icon: string;
  @PropertyLogger
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

  @MethodLogger
  public formatLink(
    id: string
  ): string {
    return `<a class="${this.classValue}" href="${this.linkPrefix + id}"> ${this.icon}</a>`;
  }
};

@LogCreateWithName('Button Formatter')
export class ButtonFormatter {
  @PropertyLogger
  private icon: string;
  @PropertyLogger
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