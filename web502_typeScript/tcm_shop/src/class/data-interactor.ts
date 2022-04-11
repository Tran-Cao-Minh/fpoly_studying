class DataInteractor {
  protected fetchLink: string;
  protected fetchMethod: string;

  constructor(
    fetchLink: string,
    fetchMethod: string
  ) {
    this.fetchLink = fetchLink;
    this.fetchMethod = fetchMethod;
  }
}

export class DataReader extends DataInteractor {
  constructor(
    fetchLink: string
  ) {
    super(`${fetchLink}on`, 'GET');
  }

  public readData(
    callbackFn: (data: any) => any ,
  ): void {
    fetch(this.fetchLink, {
      method: this.fetchMethod,
    })
      .then((res: Response) => {
        if (!res.ok) {
          throw new Error('Error = ' + res.status);
        };

        return res.json();

      }).then((data: any) => {
        callbackFn(data);
      })
      .catch((error: Error) => {
        console.log('error: ' + error);
      });
  }
}

export class DataDeleter extends DataInteractor {
  constructor(
    fetchLink: string
  ) {
    super(fetchLink, 'DELETE');
  }

  public deleteData(
    id: string,
    callbackFn: (data: any) => any,
  ): void {
    const fetchLink: string = `${this.fetchLink}/${id}on`;
    // console.log(fetchLink);

    fetch(fetchLink, {
      method: this.fetchMethod,
    })
      .then((res: Response) => {
        if (!res.ok) {
          throw new Error('error = ' + res.status);
        };

        return res.json();

      }).then((data: any) => {
        callbackFn(data);
      })
      .catch((error: Error) => {
        console.log('error: ' + error);
      });
  }
}

export class DataAdder extends DataInteractor {
  constructor(fetchLink: string) {
    super(fetchLink, 'POST');
  }

  public addData(
    formData: string,
    successFn: Function,
    failedFn: Function
  ): void {
    fetch(`${this.fetchLink}on`, {
      method: this.fetchMethod,
      body: formData
    })
      .then((res: Response) => {
        if (!res.ok) {
          failedFn();
          throw new Error('error = ' + res.status);
        };

        return res.json();

      }).then(() => {
        successFn();
      })
      .catch((error: Error) => {
        console.log('error: ' + error);
      });
  }
}

export class DataUpdater extends DataInteractor {
  constructor(fetchLink: string) {
    super(fetchLink, 'PUT');
  }

  public updateData(
    id: string,
    formData: Object | string | number,
    successFn: Function,
    failedFn: Function
  ): void {
    fetch(`${this.fetchLink + id}on`, {
      method: this.fetchMethod,
      body: JSON.stringify(formData),
    })
      .then((res: Response) => {
        if (!res.ok) {
          failedFn();
          throw new Error('error = ' + res.status);
        };

        return res.json();

      }).then(() => {
        successFn();
      })
      .catch((error: Error) => {
        console.log('error: ' + error);
      });
  }
}