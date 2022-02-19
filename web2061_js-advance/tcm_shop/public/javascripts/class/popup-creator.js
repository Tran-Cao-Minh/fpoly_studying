function PopupCreator() {
  this.createPopup = function (nodeList = [Node()]) {
    let popup = document.createElement('div');
    popup.classList.add('popup');
    popup.style.top = '-100vh';
    popup.style.opacity = 0;

    let popupWrapper = document.createElement('div');
    popupWrapper.classList.add('popup-wrapper');
    let popupContent = document.createElement('div');
    popupContent.classList.add('popup-content');
    nodeList.forEach(node => {
      popupContent.appendChild(node);
    });

    popupWrapper.appendChild(popupContent);
    popup.appendChild(popupWrapper);

    document.body.appendChild(popup);

    setTimeout(function () {
      popup.style.top = '0';
      popup.style.opacity = 1;
    }, 1);

    let that = this;
    popup.addEventListener('click', function (event) {
      if (
        event.target.classList.contains('popup') ||
        event.target.classList.contains('popup-wrapper')
      ) {
        that.removePopup(popup);
      };
    });
  };

  this.removePopup = function (popup = Node()) {
    popup.style.top = '-100vh';
    popup.style.opacity = 0;
    setTimeout(function () {
      document.body.removeChild(popup);
    }, 675);
  };
}

export function ConfirmDangerActionPopupCreator(
  dangerActionContent = String(),
) {
  PopupCreator.call(this);
  this.dangerActionContent = dangerActionContent;

  this.initialConfirmDangerActionPopup = function () {
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
    
    let that = this;
    function removeLastPopup () {
      let popupList = document.querySelectorAll('.popup');
      let lastPopup = popupList[popupList.length - 1];
      that.removePopup(lastPopup);
    }

    this.dangerActionBtn = document.createElement('button');
    this.dangerActionBtn
      .setAttribute('class', 'btn-danger col-5 mt-4 text-uppercase');
    this.dangerActionBtn.innerHTML = this.dangerActionContent;
    this.dangerActionBtn.addEventListener('click', function () {
      removeLastPopup();
    });

    this.cancelBtn = document.createElement('button');
    this.cancelBtn
      .setAttribute('class', 'btn-cancel col-5 mt-4 text-uppercase');
    this.cancelBtn.innerHTML = 'Cancel';
    this.cancelBtn.addEventListener('click', function () {
      removeLastPopup();
    });

    this.popupActions.appendChild(this.dangerActionBtn);
    this.popupActions.appendChild(this.cancelBtn);
  }

  this.createConfirmDangerActionPopup = function (
    notification = String(),
    dangerAction = Function(),
  ) {
    this.initialConfirmDangerActionPopup();

    this.popupBody.innerHTML += `
      <div class="text text-center mt-2 mb-2 w-full">
        ${notification}
      </div>
    `;

    this.dangerActionBtn.addEventListener('click', function () {
      dangerAction();
    });

    this.createPopup([
      this.popupBody,
      this.popupActions,
    ]);
  };
}