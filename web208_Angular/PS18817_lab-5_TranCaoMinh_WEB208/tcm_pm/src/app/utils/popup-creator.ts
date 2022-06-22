import { Injectable } from "@angular/core";

@Injectable()
class PopupCreator {
  createPopup(nodeList: HTMLElement[]) {
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.style.top = '-100vh';
    popup.style.opacity = '0';

    const popupWrapper = document.createElement('div');
    popupWrapper.classList.add('popup-wrapper');
    const popupContent = document.createElement('div');
    popupContent.classList.add('popup-content');
    nodeList.forEach((node) => {
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
        (event.target as HTMLElement).classList.contains('popup') ||
        (event.target as HTMLElement).classList.contains('popup-wrapper')
      ) {
        this.removePopup(popup);
      }
    });
  }

  removePopup(popup: HTMLElement) {
    popup.style.top = '-100vh';
    popup.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(popup);
    }, 675);
  };
}

@Injectable()
export class ConfirmDangerActionPopupCreator extends PopupCreator {
  constructor() {
    super();
  }

  private popupBody!: HTMLElement;
  private icon!: string;
  private popupActions!: HTMLElement;
  private dangerActionBtn!: HTMLButtonElement;
  private cancelBtn!: HTMLButtonElement;

  initialConfirmDangerActionPopup() {
    this.popupBody = document.createElement('div');
    this.popupBody.classList.add('popup-body');
    this.icon = `
      <div class='popup-icon-wrapper--danger w-full'>
        <i class='fa-solid fa-exclamation popup-icon'></i>
      </div>
    `;

    this.popupBody.innerHTML += this.icon;

    this.popupActions = document.createElement('div');
    this.popupActions.classList.add('popup-actions');

    const removeLastPopup = () => {
      const popupList = document.querySelectorAll('.popup');
      const lastPopup: HTMLElement = popupList[popupList.length - 1] as HTMLElement;
      this.removePopup(lastPopup);
    };

    this.dangerActionBtn = document.createElement('button');
    this.dangerActionBtn.setAttribute(
      'class',
      'btn btn-danger col-5 mt-4 text-uppercase'
    );
    this.dangerActionBtn.innerHTML = 'Delete';
    this.dangerActionBtn.addEventListener('click', removeLastPopup);

    this.cancelBtn = document.createElement('button');
    this.cancelBtn.setAttribute(
      'class',
      'btn btn-secondary col-5 mt-4 text-uppercase'
    );
    this.cancelBtn.innerHTML = 'Cancel';
    this.cancelBtn.addEventListener('click', removeLastPopup);

    this.popupActions.appendChild(this.dangerActionBtn);
    this.popupActions.appendChild(this.cancelBtn);
  }

  createConfirmDangerActionPopup(
    notification: string,
    dangerAction: () => void
  ) {
    this.initialConfirmDangerActionPopup();

    this.popupBody.innerHTML += `
      <div class='fs-4 text-center mt-2 mb-2 w-full'>
        ${notification}
      </div>
    `;

    this.dangerActionBtn.addEventListener('click', dangerAction);

    this.createPopup([this.popupBody, this.popupActions]);
  }
}
