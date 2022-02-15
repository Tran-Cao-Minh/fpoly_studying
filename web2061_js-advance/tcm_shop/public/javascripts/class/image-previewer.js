export function SingleImagePreviewer(
  input = Node(),
) {
  this.input = input;

  this.addShowImageEvent = function (img = Node()) {
    this.input.addEventListener('change', function (event) {
      let imgFile = event.target.files[0];

      let fileReader = new FileReader();
      fileReader.readAsDataURL(imgFile);

      fileReader.addEventListener('load', function () {
        let imgData = fileReader.result;
        img.src = imgData;
      });
    });
  };

  this.addShowImageFileNameEvent = function (imgNameContainer = Node()) {
    this.input.addEventListener('change', function (event) {
      let imgFile = event.target.files[0];

      let imgFileName = imgFile.name;
      imgNameContainer.innerHTML = imgFileName;
    });
  };
}