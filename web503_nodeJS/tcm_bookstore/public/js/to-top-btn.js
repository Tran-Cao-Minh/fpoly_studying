/* 
  ### Need to-top-btn.css + FontAwsome to work fine
*/
window.addEventListener('load', function () {
  const toTopIcon = this.document.createElement('i');
  toTopIcon.setAttribute('class', 'fas fa-angle-left');
  const toTopBtn = document.createElement('button');
  toTopBtn.setAttribute('id', 'to-top');
  toTopBtn.classList.add('d-none');
  toTopBtn.appendChild(toTopIcon);

  document.querySelector('body').appendChild(toTopBtn);

  window.addEventListener('scroll', function () {
    if (this.scrollY >= this.innerHeight) {
      document.querySelector('#to-top').classList.remove('d-none');
    } else {
      document.querySelector('#to-top').classList.add('d-none');
    }
  });

  document.querySelector('#to-top').addEventListener('click', function () {
    const scrollToTop = function () {
      const verticalCoordinate = document.documentElement.scrollTop;
      if (verticalCoordinate > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, verticalCoordinate - verticalCoordinate / 8);
      }
    };
    scrollToTop();
  });
})