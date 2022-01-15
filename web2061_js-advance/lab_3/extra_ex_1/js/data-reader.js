let dataReader = {
  fetchLink: '',
  tableHeaderColumnList: '',
  tableColumnKeyList: '',
  readData: function (tableContainer) {
    if (
      this.fetchLink === '' ||
      this.tableHeaderColumnList === '' ||
      this.tableColumnKeyList === ''
    ) {
      console.log('You need to fill fetchLink, tableHeaderColumnList, tableColumnKeyList');
    
    } else {
      let tableHeaderColumnList = this.tableHeaderColumnList;
      let tableColumnKeyList = this.tableColumnKeyList;
      fetch(this.fetchLink)
        .then(function (res) {
          if (!res.ok) {
            throw new Error('error = ' + res.status);
          };

          return res.json();
        })
        .then(function (data) {
          let tableHeaderRow = tableContainer.querySelector('thead').querySelector('tr');
          tableHeaderColumnList.forEach(column => {
            let th = document.createElement('th');
            th.setAttribute('scope', 'col');
            th.innerHTML = column;
            tableHeaderRow.appendChild(th);
          });

          let tableBody = tableContainer.querySelector('tbody');
          data.forEach(row => {
            let tr = document.createElement('tr');

            tableColumnKeyList.forEach(key => {
              let td = document.createElement('td');
              td.innerHTML = row[key];

              tr.appendChild(td);
            });

            tableBody.appendChild(tr);
          });
        })
        .catch(function (error) {
          console.log('error: ' + error);
        })
    }
  }
}