class DataInteractor {
  fetchLink: string;
  fetchMethod: string;
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
    super(`${fetchLink}.json`, 'GET');
  }

  readData(
    callbackFn = Function(),
  ) {
    fetch(this.fetchLink, {
        method: this.fetchMethod,
      })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Error = ' + res.status);
        };

        return res.json();

      }).then((data) => {
        callbackFn(data);
      })
    // .catch((error) => {
    //   console.log('error: ' + error);
    // });
  }
}

export class DataDeleter extends DataInteractor {
  constructor(
    fetchLink: string
  ) {
    super(fetchLink, 'DELETE');
  }

  deleteData(
    id: string,
    callbackFn = Function(),
  ) {
    const fetchLink = `${this.fetchLink}/${id}.json`;
    // console.log(fetchLink);

    fetch(fetchLink, {
        method: this.fetchMethod,
      })
      .then((res) => {
        if (!res.ok) {
          throw new Error('error = ' + res.status);
        };

        return res.json();

      }).then((data) => {
        callbackFn(data);
      })
    // .catch((error) => {
    //   console.log('error: ' + error);
    // });
  }
}

export class DataAdder extends DataInteractor {
  constructor(fetchLink: string) {
    super(fetchLink, 'POST');
  }

  addData (
    formData = Object(),
    successFn = Function(),
    failedFn = Function()
  ) {
    fetch(`${this.fetchLink}.json`, {
      method: this.fetchMethod,
      body: formData
    })
      .then((res) => {
        if (!res.ok) {
          failedFn();
          throw new Error('error = ' + res.status);
        };

        return res.json();

      }).then(() => {
        successFn();
      });
    // .catch((error) => {
    //   console.log('error: ' + error);
    // });
  }
}

export class DataUpdater extends DataInteractor {
  constructor(fetchLink: string) {
    super(fetchLink, 'PUT');
  }

  updateData (
    id: string,
    formData: string,
    successFn = Function(),
    failedFn = Function()
  ) {
    fetch(`${this.fetchLink + id}.json`, {
      method: this.fetchMethod,
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          failedFn();
          throw new Error('error = ' + res.status);
        };

        return res.json();

      }).then(() => {
        successFn();
      });
    // .catch((error) => {
    //   console.log('error: ' + error);
    // });
  }
}