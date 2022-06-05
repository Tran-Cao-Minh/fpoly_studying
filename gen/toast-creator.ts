export class ToastCreator {
  private verticalOffset!: number;
  private horizontalOffset!: number;
  constructor(
    verticalOffset = Number(), // px
    horizontalOffset = Number() // px
  ) {
    this.verticalOffset = verticalOffset;
    this.horizontalOffset = horizontalOffset;
  }

  createToast(
    type = "success" || "danger" || "warning" || "info",
    message = String(),
    displayTime = Number() // seconds
  ) {
    const documentBody = document.body;
    const colorClass = `toast-${type}`;

    let icon;
    switch (type) {
      case "success":
        icon = '<i class="fa-solid fa-check"></i>';
        break;
      case "danger":
        icon = '<i class="fa-solid fa-xmark"></i>';
        break;
      case "warning":
        icon = '<i class="fa-solid fa-exclamation"></i>';
        break;
      case "info":
        icon = '<i class="fa-solid fa-question"></i>';
        break;
    }

    const toast = document.createElement("div");
    toast.setAttribute("class", `toast ${colorClass} js-toastify`);
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

    const currentToastList = document.querySelectorAll(".js-toastify");
    let toastVerticalOffset = this.verticalOffset;
    if (currentToastList.length > 0) {
      currentToastList.forEach((currentToast) => {
        toastVerticalOffset += this.verticalOffset + (currentToast as HTMLElement).offsetHeight;
      });
    }

    toast.setAttribute(
      'style',
      `
      ${'right'}: ${this.horizontalOffset}px;
      ${'bottom'}: ${toastVerticalOffset}px;
    `
    );
    documentBody.appendChild(toast);


    toast?.querySelector(".toast-close")?.addEventListener("click", () => {
      clearTimeout(removeToastTimeout);
      removeToast();
    });

    const removeToast = () => {
      toast.style['right'] = `-${toast.offsetWidth}px`;
      toast.style.opacity = '0.2';

      setTimeout(() => {
        let nextToast = toast.nextElementSibling;
        while (nextToast) {
          // console.log(nextToast.style[toastVerticalAlign]);

          const nextToastVerticalOffset = Number(
            (nextToast as HTMLElement).style['right'].slice(0, -2)
          );
          (nextToast as HTMLElement).style['bottom'] = `${nextToastVerticalOffset - toast.offsetHeight - this.verticalOffset
            }px`;

          nextToast = nextToast.nextElementSibling;
        }
        documentBody.removeChild(toast);
      }, 200);
    };

    const removeToastTimeout = setTimeout(() => {
      removeToast();
    }, displayTime * 1000);
  }
}
