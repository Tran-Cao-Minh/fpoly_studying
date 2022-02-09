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
    callback = Function(data = Object()),
    msReadTime = Number(),
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

    /**
     * Because when I use Node JS to write API with res.json
     * it write late and return previous result of API call
     * So I need to use it to prepare API and get true result after
     * msReadTime
     */
    fetch(fetchLink, {
      method: fetchMethod,
    });

    setTimeout(function () {
      fetch(fetchLink, {
          method: fetchMethod,
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
  };
}