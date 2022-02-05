function DataInteractor(
  fetchLink = String(),
  fetchMethod = String(),
  fetchHeaders = {
    'Content-Type': 'application/json; charset=UTF-8',
  },
) {
  this.fetchLink = fetchLink;
  this.fetchMethod = fetchMethod;
  this.fetchHeaders = fetchHeaders;
}

export function DataReader(
  fetchLink = String(),
) {
  DataInteractor.call(this, fetchLink, 'POST');

  this.readData = function (
    fetchBody = Object(),
    callback = Function(data = Object()),
    msReadTime = Number(),
  ) {
    let fetchLink = this.fetchLink;
    let fetchMethod = this.fetchMethod;
    let fetchHeaders = this.fetchHeaders;

    /**
     * Because when I use Node JS to write API with res.json
     * it write late and return previous result of API call
     * So I need to use it to prepare API and get true result after
     * msReadTime
     */
    fetch(fetchLink, {
        method: fetchMethod,
        body: JSON.stringify(fetchBody),
        headers: fetchHeaders,
      });

    setTimeout(function () {
      fetch(fetchLink, {
        method: fetchMethod,
        body: JSON.stringify(fetchBody),
        headers: fetchHeaders,
      })
      .then(function (res) {
        if (!res.ok) {
          throw new Error('error = ' + res.status);
        };

        return res.json();

      }).then(function (data) {
        callback(data);
      })
      .catch(function (error) {
        console.log('error: ' + error);
      });
    }, msReadTime);
  }
}