export function TableCreator(
  tableContainer = Node(),
  addTableButtonEvent = Function() || null,
  tableColumnList = [
    {
      name: String(),
      key: String(),
      width: String(),
      formatFunction: Function() || undefined,
      formatPrameterKeyList: Array(String()) || undefined,
    }
  ]
) {
  this.tableContainer = tableContainer;
  this.addTableButtonEvent = addTableButtonEvent;
  this.tableColumnList = tableColumnList;

  this.convertData = function (data) {
    data.forEach((row, index, data) => {
      this.tableColumnList.forEach(column => {
        if (
          column.formatFunction !== undefined &&
          column.formatPrameterKeyList.length === 1
        ) {
          data[index][column.key] =
            column.formatFunction(row[column.formatPrameterKeyList[0]]);

        } else if (
          column.formatFunction !== undefined &&
          column.formatPrameterKeyList.length > 1
        ) {
          let parameterList = [];
          column.formatPrameterKeyList.forEach(formatPrameterKey => {
            parameterList.push(row[formatPrameterKey]);
          });
          data[index][column.key] = column.formatFunction(parameterList);
        };
      });
    });

    let tableRow = document.createElement('tr');
    this.tableColumnList.forEach(column => {
      let th = document.createElement('th');
      th.style.width = column.width;
      th.innerHTML = column.name;

      tableRow.appendChild(th);
    });
    let tableHeader = document.createElement('thead');
    tableHeader.appendChild(tableRow);

    let tableBody = document.createElement('tbody');
    data.forEach(row => {
      let tableRow = document.createElement('tr');

      tableColumnList.forEach(column => {
        let td = document.createElement('td');
        td.style.width = column.width;
        td.innerHTML = row[column.key];

        tableRow.appendChild(td);
      });

      tableBody.appendChild(tableRow);
    });

    this.tableContainer.innerHTML = '';
    this.tableContainer.appendChild(tableHeader);
    this.tableContainer.appendChild(tableBody);

    if (this.addTableButtonEvent !== null) {
      this.addTableButtonEvent();
    }
  };
};