class DataInteractor {
  constructor(
    fetchLink = String(),
    fetchMethod = String()
  ) {
    this.fetchLink = fetchLink;
    this.fetchMethod = fetchMethod;
  }
}

export class DataReader extends DataInteractor {
  constructor(
    fetchLink = String()
  ) {
    super(`${fetchLink}.json`, 'GET');
  }

  readData(
    callbackFn = Function(data = Object()),
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
    fetchLink = String()
  ) {
    super(fetchLink, 'DELETE');
  }

  deleteData(
    id = String(),
    callbackFn = Function(data = Object()),
  ) {
    const fetchLink = `${this.fetchLink}/${id}.json`;
    // console.log(fetchLink);

    fetch(fetchLink, {
        method: this.fetchMethod,
      })
      .then(function (res) {
        if (!res.ok) {
          throw new Error('error = ' + res.status);
        };

        return res.json();

      }).then(function (data) {
        callbackFn(data);
      })
    // .catch(function (error) {
    //   console.log('error: ' + error);
    // });
  }
}

function DataInteractorFunction(
  fetchLink = String(),
  fetchMethod = String(),
) {
  this.fetchLink = fetchLink;
  this.fetchMethod = fetchMethod;
}

export function DataAdder(
  fetchLink = String(),
) {
  DataInteractorFunction.call(this, fetchLink, 'POST');

  this.addData = function (
    formData = Object(),
    multipartFormData = Boolean(),
    callbackFn = Function(data = Object()),
  ) {
    let fetchMethod = this.fetchMethod;
    let fetchLink = this.fetchLink;

    let postObject;
    if (multipartFormData === false) {
      const searchParams = new URLSearchParams();
      for (const pair of formData) {
        searchParams.append(pair[0], pair[1]);
      };

      postObject = searchParams;

    } else if (multipartFormData === true) {
      postObject = formData;
    };

    fetch(fetchLink, {
        method: fetchMethod,
        body: postObject,
      })
      .then(function (res) {
        if (!res.ok) {
          throw new Error('error = ' + res.status);
        };

        return res.json();

      }).then(function (data) {
        callbackFn(data);
      })
    // .catch(function (error) {
    //   console.log('error: ' + error);
    // });
  };
}

export function DataUpdater(
  fetchLink = String(),
) {
  DataInteractorFunction.call(this, fetchLink, 'PUT');

  this.updateData = function (
    id = String(),
    formData = Object(),
    multipartFormData = Boolean(),
    callbackFn = Function(data = Object()),
  ) {
    let fetchMethod = this.fetchMethod;
    let fetchLink = this.fetchLink + id;

    let putObject;
    if (multipartFormData === false) {
      const searchParams = new URLSearchParams();
      for (const pair of formData) {
        searchParams.append(pair[0], pair[1]);
      };

      putObject = searchParams;

    } else if (multipartFormData === true) {
      putObject = formData;
    };

    fetch(fetchLink, {
        method: fetchMethod,
        body: putObject,
      })
      .then(function (res) {
        if (!res.ok) {
          throw new Error('error = ' + res.status);
        };

        return res.json();

      }).then(function (data) {
        callbackFn(data);
      })
    // .catch(function (error) {
    //   console.log('error: ' + error);
    // });
  };
}