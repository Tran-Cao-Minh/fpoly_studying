function DataInteractor(
  fetchLink = String(),
  fetchMethod = String(),
) {
  this.fetchLink = fetchLink;
  this.fetchMethod = fetchMethod;
}

export function DataReader(
  fetchLink = String(),
) {
  DataInteractor.call(this, fetchLink, 'GET');

  this.readData = function (
    fetchBody = Object(),
    callbackFn = Function(data = Object()),
  ) {
    let fetchMethod = this.fetchMethod;

    let fetchLink = this.fetchLink;
    let getMethodPrameter = '';
    Object.entries(fetchBody).forEach(parameter => {
      let key = parameter[0];
      let value = parameter[1];

      if (typeof (value) !== 'object') {
        getMethodPrameter += `&${key}=${value}`;

      } else {
        value.forEach(item => {
          getMethodPrameter += `&${key}[]=${item}`;
        });
      };
    });
    getMethodPrameter =
      getMethodPrameter.replace(/&/, '?'); // replace first '&' character with '?'
    fetchLink += getMethodPrameter;

    fetch(fetchLink, {
        method: fetchMethod,
      })
      .then(function (res) {
        if (!res.ok) {
          throw new Error('error = ' + res.status);
        };

        return res.json();

      }).then(function (data) {
        callbackFn(data);
      })
      .catch(function (error) {
        console.log('error: ' + error);
      });
  };
}