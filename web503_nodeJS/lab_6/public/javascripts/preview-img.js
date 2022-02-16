const inputImgList = document.querySelectorAll('.js-img-input');

inputImgList.forEach(input => {
  input.addEventListener('change', function (e) {
    let inputImgFormGroup = this.parentElement;

    let imgFile = e.target.files[0];

    let fileReader = new FileReader();
    fileReader.readAsDataURL(imgFile);

    fileReader.onload = function () {
      let previewImgElement = inputImgFormGroup.querySelector('.js-preview-img');
      previewImgElement.classList.remove('d-none');

      let imgUrl = fileReader.result;
      previewImgElement.querySelector('img').src = imgUrl;

      if (imgFile['size'] > 2097152) {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');

      } else {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
      };
    };
  });
});