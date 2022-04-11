export class SingleImagePreviewer {
  private input: HTMLInputElement;

  constructor (input: HTMLInputElement) {
    this.input = input;
  }

  public addShowImageEvent (img: HTMLImageElement): void {
    this.input.addEventListener('change', (event: InputEvent) => {
      let imgFile: File = (<HTMLInputElement>event.target).files[0];

      let fileReader: FileReader = new FileReader();
      fileReader.readAsDataURL(imgFile);

      fileReader.addEventListener('load', () => {
        let imgData: string = <string>fileReader.result;
        img.src = imgData;

        this.input.setAttribute('data-base64', imgData);
      });
    });
  };

  public addShowImageFileNameEvent (imgNameContainer: HTMLElement): void {
    this.input.addEventListener('change', (event: InputEvent) => {
      let imgFile: File = (<HTMLInputElement>event.target).files[0];

      let imgFileName: string = imgFile.name;
      imgNameContainer.innerHTML = imgFileName;
    });
  };
}