import { LogCreateWithName, MethodLogger } from '../decorators';

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

@LogCreateWithName('Data Reader')
export class DataReader extends DataInteractor {
  constructor(
    fetchLink: string
  ) {
    super(`${fetchLink}.json`, 'GET');
  }

  @MethodLogger
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

@LogCreateWithName('Data Deleter')
export class DataDeleter extends DataInteractor {
  constructor(
    fetchLink: string
  ) {
    super(fetchLink, 'DELETE');
  }

  @MethodLogger
  public deleteData(
    id: string,
    callbackFn: (data: any) => any,
  ): void {
    const fetchLink: string = `${this.fetchLink}/${id}.json`;
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

@LogCreateWithName('Data Adder')
export class DataAdder extends DataInteractor {
  constructor(fetchLink: string) {
    super(fetchLink, 'POST');
  }

  @MethodLogger
  public addData(
    formData: string,
    successFn: Function,
    failedFn: Function
  ): void {
    fetch(`${this.fetchLink}.json`, {
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

@LogCreateWithName('Data Updater')
export class DataUpdater extends DataInteractor {
  constructor(fetchLink: string) {
    super(fetchLink, 'PUT');
  }

  @MethodLogger
  public updateData(
    id: string,
    formData: Object | string | number,
    successFn: Function,
    failedFn: Function
  ): void {
    fetch(`${this.fetchLink + id}.json`, {
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