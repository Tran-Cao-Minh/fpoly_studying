import { LogCreateWithName, PropertyLogger, MethodLogger } from '../decorators';
interface TableColumnItem {
  readonly name: string, 
  readonly key: string,
  readonly width: number,
  readonly formatFunction?: Function,
  readonly formatPrameterKeyList?: Array<string>,
};

@LogCreateWithName('Table Creator')
export class TableCreator {
  @PropertyLogger
  private tableContainer: HTMLTableElement;
  @PropertyLogger
  private addTableButtonEvent: Function | null;
  @PropertyLogger
  private tableColumnList: Array<TableColumnItem>;
  @PropertyLogger
  private widthUnit: 'rem' | 'px';

  constructor (
    tableContainer: HTMLTableElement,
    addTableButtonEvent: Function | null,
    tableColumnList: Array<TableColumnItem>,
    widthUnit: 'rem' | 'px'
  ) {
    this.tableContainer = tableContainer;
    this.addTableButtonEvent = addTableButtonEvent;
    this.tableColumnList = tableColumnList;
    this.widthUnit = widthUnit;
  }

  @MethodLogger
  public convertData (data: Array<{ [key: string]: any }>): void {
    this.tableContainer.innerHTML = '';

    const tableHeader = (() => {
      const tableRow: HTMLTableRowElement = document.createElement('tr');
      this.tableColumnList.forEach((column: TableColumnItem) => {
        const th: HTMLTableCellElement = document.createElement('th');
        th.style.width = column.width + this.widthUnit;
        th.innerHTML = column.name;
  
        tableRow.appendChild(th);
      });
      const tableHeader: HTMLTableSectionElement = document.createElement('thead');
      tableHeader.appendChild(tableRow);

      return tableHeader;
    })();

    const tableBody = (() => {
      const tableBody: HTMLTableSectionElement = document.createElement('tbody');

      const rowQuantity: number = data.length;
      if (rowQuantity === 0) {
        const tableRow: HTMLTableRowElement = document.createElement('tr');
  
        const td: HTMLTableCellElement = document.createElement('td');
        let fullWidth: number = 0;
        this.tableColumnList.forEach((column: TableColumnItem) => {
          fullWidth += column.width;
        });
        td.style.width = fullWidth + this.widthUnit;
        td.style.textAlign = 'center';
        td.innerHTML = 'NO DATA MATCHES THE FILTER CONDITION ~';
  
        tableRow.appendChild(td);
        tableBody.appendChild(tableRow);
  
      } else if (rowQuantity > 0) {
        (() => { // changeDataWithFormat
          data.forEach((row: { [key: string]: any }) => {
            this.tableColumnList.forEach((column: TableColumnItem) => {
              if (
                column.formatFunction !== undefined &&
                column.formatPrameterKeyList.length === 1
              ) {
                const columnFormatKey: string = column.formatPrameterKeyList[0];
                const columnWithFormat: string =
                  column.formatFunction(row[columnFormatKey]);
    
                row[column.key] = columnWithFormat;
    
              } else if (
                column.formatFunction !== undefined &&
                column.formatPrameterKeyList.length > 1
              ) {
                const parameterList: Array<string> = [];
                column.formatPrameterKeyList.forEach((formatPrameterKey: string) => {
                  parameterList.push(row[formatPrameterKey]);
                });
    
                row[column.key] = column.formatFunction(parameterList);
              };
            });
          });
        })();
  
        (() => { // addTableBodyData
          data.forEach((row: { [key: string]: any }) => {
            const tableRow: HTMLTableRowElement = document.createElement('tr');
    
            this.tableColumnList.forEach((column: TableColumnItem) => {
              const td = document.createElement('td');
              td.style.width = column.width + this.widthUnit;
              td.innerHTML = row[column.key];
    
              tableRow.appendChild(td);
            });
    
            tableBody.appendChild(tableRow);
          });
        })();
      };

      return tableBody;
    })();

    this.tableContainer.appendChild(tableHeader);
    this.tableContainer.appendChild(tableBody);

    if (this.addTableButtonEvent !== null) {
      this.addTableButtonEvent();
    };

    // console.log(data);
  }
};