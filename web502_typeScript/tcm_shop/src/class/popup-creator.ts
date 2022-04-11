import { LogCreateWithName, PropertyLogger, MethodLogger } from '../decorators';

class PopupCreator {
  protected createPopup(nodeList: Array<HTMLElement>): void {
    const popup: HTMLDivElement = document.createElement('div');
    popup.classList.add('popup');
    popup.style.top = '-100vh';
    popup.style.opacity = '0';

    const popupWrapper: HTMLDivElement = document.createElement('div');
    popupWrapper.classList.add('popup-wrapper');
    const popupContent: HTMLDivElement = document.createElement('div');
    popupContent.classList.add('popup-content');
    nodeList.forEach((node: HTMLElement) => {
      popupContent.appendChild(node);
    });

    popupWrapper.appendChild(popupContent);
    popup.appendChild(popupWrapper);

    document.body.appendChild(popup);

    setTimeout(() => {
      popup.style.top = '0';
      popup.style.opacity = '1';
    }, 1);

    popup.addEventListener('click', (event) => {
      if (
        (<HTMLElement>event.target).classList.contains('popup') ||
        (<HTMLElement>event.target).classList.contains('popup-wrapper')
      ) {
        this.removePopup(popup);
      };
    });
  };

  protected removePopup = (popup: HTMLElement): void => {
    popup.style.top = '-100vh';
    popup.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(popup);
    }, 675);
  };
}

@LogCreateWithName('Confirm Danger Action Popup Creator')
export class ConfirmDangerActionPopupCreator extends PopupCreator {
  @PropertyLogger
  private dangerActionContent: string;
  @PropertyLogger
  private popupBody: HTMLDivElement;
  @PropertyLogger
  private icon: string;
  @PropertyLogger
  private popupActions: HTMLDivElement;
  @PropertyLogger
  private dangerActionBtn: HTMLButtonElement;
  @PropertyLogger
  private cancelBtn: HTMLButtonElement;

  constructor(
    dangerActionContent: string
  ) {
    super();
    this.dangerActionContent = dangerActionContent;
  }

  @MethodLogger
  public initialConfirmDangerActionPopup(): void {
    this.popupBody = document.createElement('div');
    this.popupBody.classList.add('popup-body');
    this.icon = `
      <div class="popup-icon-wrapper--danger">
        <i class="fa-solid fa-exclamation popup-icon"></i>
      </div>
    `;

    this.popupBody.innerHTML += this.icon;

    this.popupActions = document.createElement('div');
    this.popupActions.classList.add('popup-actions');

    const removeLastPopup = (): void => {
      const popupList: NodeListOf<HTMLElement> = document.querySelectorAll('.popup');
      const lastPopup: HTMLElement = popupList[popupList.length - 1];
      this.removePopup(lastPopup);
    }

    this.dangerActionBtn = document.createElement('button');
    this.dangerActionBtn
      .setAttribute('class', 'btn-danger col-5 mt-4 text-uppercase');
    this.dangerActionBtn.innerHTML = this.dangerActionContent;
    this.dangerActionBtn.addEventListener('click', removeLastPopup);

    this.cancelBtn = document.createElement('button');
    this.cancelBtn
      .setAttribute('class', 'btn-cancel col-5 mt-4 text-uppercase');
    this.cancelBtn.innerHTML = 'Cancel';
    this.cancelBtn.addEventListener('click', removeLastPopup);

    this.popupActions.appendChild(this.dangerActionBtn);
    this.popupActions.appendChild(this.cancelBtn);
  }

  @MethodLogger
  public createConfirmDangerActionPopup (
    notification: string,
    dangerAction: () => any
  ): void {
    this.initialConfirmDangerActionPopup();

    this.popupBody.innerHTML += `
      <div class="text text-center mt-2 mb-2 w-full">
        ${notification}
      </div>
    `;

    this.dangerActionBtn.addEventListener('click', dangerAction);

    this.createPopup([
      this.popupBody,
      this.popupActions
    ]);
  };
}