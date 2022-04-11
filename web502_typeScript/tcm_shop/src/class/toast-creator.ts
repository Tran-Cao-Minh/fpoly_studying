import { LogCreateWithName, PropertyLogger, MethodLogger } from '../decorators';

@LogCreateWithName('Toast Creator')
export class ToastCreator { 
  @PropertyLogger
  private verticalAlign: 'top' | 'bottom';
  @PropertyLogger
  private verticalOffset: number; // px
  @PropertyLogger
  private horizontalAlign: 'left' | 'right';
  @PropertyLogger
  private horizontalOffset: number; // px

  constructor (
    verticalAlign: 'top' | 'bottom',
    verticalOffset: number, // px
    horizontalAlign: 'left' | 'right',
    horizontalOffset: number, // px
  ) {
    this.verticalAlign = verticalAlign;
    this.verticalOffset = verticalOffset;
    this.horizontalAlign = horizontalAlign;
    this.horizontalOffset = horizontalOffset;
  }

  @MethodLogger
  public createToast (
    type: 'success' | 'danger' | 'warning' | 'info',
    message: string,
    displayTime: number // seconds
  ): void {
    const documentBody: HTMLElement = document.body;
    const colorClass: string = `toast-${type}`;

    let icon: string;
    switch (type) {
      case 'success':
        icon = '<i class="fa-solid fa-check"></i>';
        break;
      case 'danger':
        icon = '<i class="fa-solid fa-xmark"></i>';
        break;
      case 'warning':
        icon = '<i class="fa-solid fa-exclamation"></i>';
        break;
      case 'info':
        icon = '<i class="fa-solid fa-question"></i>';
        break;
    };

    const toast: HTMLDivElement = document.createElement('div');
    toast.setAttribute('class', `toast ${colorClass} js-toastify`);
    toast.innerHTML = `
      <div class="toast-icon">
        ${icon}
      </div>
      <div class="toast-message">
        ${message}
      </div>
      <div class="toast-close">
        <i class="fa-solid fa-xmark"></i>
      </div>
    `;

    const currentToastList: NodeListOf<HTMLElement> = document.querySelectorAll('.js-toastify');
    let toastVerticalOffset: number = this.verticalOffset;
    if (currentToastList.length > 0) {
      currentToastList.forEach((currentToast: HTMLElement) => {
        toastVerticalOffset += (this.verticalOffset + currentToast.offsetHeight);
      });
    };

    toast.setAttribute('style', `
      ${this.horizontalAlign}: ${this.horizontalOffset}px;
      ${this.verticalAlign}: ${toastVerticalOffset}px;
    `);
    documentBody.appendChild(toast);

    const removeToast = (): void => {
      (<{ [key: string]: any }>toast.style)[this.horizontalAlign] = `-${toast.offsetWidth}px`;
      (<{ [key: string]: any }>toast.style).opacity = '0.2';

      setTimeout(() => {
        let nextToast: Element = toast.nextElementSibling;
        while (nextToast) {
          // console.log(nextToast.style[toastVerticalAlign]);

          const nextToastVerticalOffset: number = Number((<{ [key: string]: any }>nextToast).style[this.verticalAlign].slice(0, -2));
          (<{ [key: string]: any }>nextToast).style[this.verticalAlign] =
            `${nextToastVerticalOffset - toast.offsetHeight - this.verticalOffset}px`;

          nextToast = nextToast.nextElementSibling;
        };
        documentBody.removeChild(toast);
      }, 200);
    };

    const removeToastTimeout: NodeJS.Timeout = setTimeout(() => {
      removeToast();
    }, (displayTime * 1000));

    toast.querySelector('.toast-close').addEventListener('click', () => {
      clearTimeout(removeToastTimeout);
      removeToast();
    });
  }
}