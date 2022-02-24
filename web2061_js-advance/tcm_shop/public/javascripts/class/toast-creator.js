export function ToastCreator(
  verticalAlign = 'top' || 'bottom',
  verticalOffset = Number(), // px
  horizontalAlign = 'left' || 'right',
  horizontalOffset = Number(), // px
) { 
  this.verticalAlign = verticalAlign;
  this.verticalOffset = verticalOffset;
  this.horizontalAlign = horizontalAlign;
  this.horizontalOffset = horizontalOffset;

  this.createToast = function (
    type = 'success' || 'danger' || 'warning' || 'info',
    message = String(),
    displayTime = Number(), // seconds
  ) {
    let documentBody = document.body;
    let colorClass = 'toast-' + type;

    let icon;
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

    let toast = document.createElement('div');
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

    let currentToastList = document.querySelectorAll('.js-toastify');
    let toastVerticalOffset = this.verticalOffset;
    if (currentToastList.length > 0) {
      currentToastList.forEach(currentToast => {
        toastVerticalOffset += (this.verticalOffset + currentToast.offsetHeight);
      });
    };

    toast.setAttribute('style', `
      ${this.horizontalAlign}: ${this.horizontalOffset}px;
      ${this.verticalAlign}: ${toastVerticalOffset}px;
    `);
    documentBody.appendChild(toast);

    let toastVerticalAlign = this.verticalAlign;
    let verticalOffset = this.verticalOffset;

    function removeToast() {
      toast.style[horizontalAlign] = '-' + toast.offsetWidth + 'px';
      toast.style.opacity = 0.2;

      setTimeout(function () {
        let nextToast = toast.nextElementSibling;
        while (nextToast) {
          // console.log(nextToast.style[toastVerticalAlign]);

          let nextToastVerticalOffset = Number(nextToast.style[toastVerticalAlign].slice(0, -2));
          nextToast.style[toastVerticalAlign] =
            (nextToastVerticalOffset - toast.offsetHeight - verticalOffset) + 'px';

          nextToast = nextToast.nextElementSibling;
        };
        documentBody.removeChild(toast);
      }, 200);
    }

    let removeToastTimeout = setTimeout(function () {
      removeToast();
    }, (displayTime * 1000));

    toast.querySelector('.toast-close').addEventListener('click', function () {
      clearTimeout(removeToastTimeout);
      removeToast();
    });
  };
}