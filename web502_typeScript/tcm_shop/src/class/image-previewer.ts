export class SingleImagePreviewer {
  input: HTMLInputElement;

  constructor (input: HTMLInputElement) {
    this.input = input;
  }

  addShowImageEvent (img: HTMLImageElement) {
    this.input.addEventListener('change', (event: InputEvent) => {
      let imgFile = (<HTMLInputElement>event.target).files[0];

      let fileReader = new FileReader();
      fileReader.readAsDataURL(imgFile);

      fileReader.addEventListener('load', () => {
        let imgData: string = <string>fileReader.result;
        img.src = imgData;

        this.input.setAttribute('data-base64', imgData);
      });
    });
  };

  addShowImageFileNameEvent (imgNameContainer: HTMLElement) {
    this.input.addEventListener('change', (event: InputEvent) => {
      let imgFile = (<HTMLInputElement>event.target).files[0];

      let imgFileName = imgFile.name;
      imgNameContainer.innerHTML = imgFileName;
    });
  };
}