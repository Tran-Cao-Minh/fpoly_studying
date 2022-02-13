export function TableCreator(
  tableContainer = Node(),
  addTableButtonEvent = Function() || null,
  tableColumnList = [{
    name: String(),
    key: String(),
    width: String(),
    formatFunction: Function() || undefined,
    formatPrameterKeyList: Array(String()) || undefined,
  }],
  widthUnit = String(),
) {
  this.tableContainer = tableContainer;
  this.addTableButtonEvent = addTableButtonEvent;
  this.tableColumnList = tableColumnList;
  this.widthUnit = widthUnit;

  this.convertData = function (data) {
    this.tableContainer.innerHTML = '';

    let tableRow = document.createElement('tr');
    this.tableColumnList.forEach(column => {
      let th = document.createElement('th');
      th.style.width = column.width + this.widthUnit;
      th.innerHTML = column.name;

      tableRow.appendChild(th);
    });
    let tableHeader = document.createElement('thead');
    tableHeader.appendChild(tableRow);

    let tableBody = document.createElement('tbody');
    if (data.length === 0) {
      let tableRow = document.createElement('tr');
      let td = document.createElement('td');
      let fullWidth = 0;
      tableColumnList.forEach(column => {
        fullWidth += column.width;
      });
      td.style.width = fullWidth + this.widthUnit;
      td.style.textAlign = 'center';
      td.innerHTML = 'NO DATA MATCHES THE FILTER CONDITION ~';

      tableRow.appendChild(td);
      tableBody.appendChild(tableRow);

    } else {
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

      data.forEach(row => {
        let tableRow = document.createElement('tr');

        tableColumnList.forEach(column => {
          let td = document.createElement('td');
          td.style.width = column.width + this.widthUnit;
          td.innerHTML = row[column.key];

          tableRow.appendChild(td);
        });

        tableBody.appendChild(tableRow);
      });

      if (this.addTableButtonEvent !== null) {
        this.addTableButtonEvent();
      }
    };

    this.tableContainer.appendChild(tableHeader);
    this.tableContainer.appendChild(tableBody);
  }
};