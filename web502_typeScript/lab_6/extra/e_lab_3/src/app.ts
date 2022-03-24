interface Employee {
  employeeID: string,
  fullName: string,
  club: string,
  salary: number,
  bonus: number,
  subsidize: number,
  note: string
};

// DECORATORS
function LogCreate(constructor: Function) { // class decorator
  console.log('Log Create: ', constructor);
}

function EmployeeManagerLogger(logString: string) { // decorator factory: return decorator and add prameter
  return function(constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

function PropertyEmployeeManagerLogger(target: any, propertyName: string | Symbol) {
  console.log('Employee Manger Class: ', target);
  console.log('Selected Property of Employee Manager Class: ', propertyName);
}

function MethodEmployeeManagerLogger(target: any, methodName: string | Symbol, propertyDescriptor: PropertyDescriptor) {
  console.log('Employee Manger Class: ', target);
  console.log('Selected Method of Employee Manager Class: ', methodName);
  console.log('Method Descriptor: ', propertyDescriptor);
}
// end DECORATORS
 
@LogCreate
@EmployeeManagerLogger('LOGGING: EmployeeManager')
class EmployeeManager {
  @PropertyEmployeeManagerLogger
  private empoloyeesDataURL: string = 'https://lab-3-ts-default-rtdb.firebaseio.com/employees.json';
  @PropertyEmployeeManagerLogger
  private areaList: HTMLElement[];
  @PropertyEmployeeManagerLogger
  private swapAreaBtnList: HTMLButtonElement[];
  @PropertyEmployeeManagerLogger
  private addEmployeeForm: HTMLFormElement;
  @PropertyEmployeeManagerLogger
  private employeesTableBody: HTMLTableSectionElement;

  constructor(
    areaList: HTMLElement[],
    swapAreaBtnList: HTMLButtonElement[],
    addEmployeeForm: HTMLFormElement,
    employeesTableBody: HTMLTableSectionElement
  ) {
    this.areaList = areaList;
    this.swapAreaBtnList = swapAreaBtnList;
    this.swapArea();

    this.addEmployeeForm = addEmployeeForm;
    this.createAddEmployeeEvent();

    this.employeesTableBody = employeesTableBody;
    this.showEmployeeList();
  }

  @MethodEmployeeManagerLogger // Accesstor Decorator because it apply for SETTER or GETTER
  set newEmpoloyeesDataURL(val: string) {
    this.empoloyeesDataURL = val;
  }

  @MethodEmployeeManagerLogger
  private swapArea () {
    this.swapAreaBtnList.forEach(btn => {
      btn.addEventListener('click', () => {
        this.swapAreaBtnList.forEach(btn => {
          btn.classList.add('btn-light');
          btn.classList.remove('btn-primary');
        });

        btn.classList.add('btn-primary');
        btn.classList.remove('btn-light');

        this.areaList.forEach(area => {
          if (area.dataset.name === btn.dataset.name) {
            area.classList.remove('d-none');
          } else {
            area.classList.add('d-none');
          };
        });
      });
    });
  }

  @MethodEmployeeManagerLogger
  private createAddEmployeeEvent () {
    const form: HTMLFormElement = this.addEmployeeForm;
    form.addEventListener('submit', (ev: SubmitEvent) => {
      ev.preventDefault();

      fetch(this.empoloyeesDataURL, {
        method: 'GET'
      })
        .then((response: Response) => {
          if (response.status === 200) {
            return response.json();
  
          } else {
            throw new Error(`${response.status}`);
          };
        })
        .then((data: Object) => {
          let checkExist: boolean;

          Object.keys(data).forEach((key: string | number) => {
            const row: Employee = data[key];

            if (row.employeeID === form.employeeID.value) {
              checkExist = true;
            };
          });

          if (checkExist === true) {
            alert('Add data failed - duplicate employee ID');
            
          } else {

            const employee: Employee = {
              'employeeID': form.employeeID.value,
              'fullName': form.fullName.value,
              'club': form.club.value,
              'salary': Number(form.salary.value),
              'bonus': Number(form.bonus.value),
              'subsidize': Number(form.subsidize.value),
              'note': form.note.value,
            };
            const formData: string = JSON.stringify(employee);
      
            fetch(this.empoloyeesDataURL, {
              method: 'POST',
              body: formData
            })
              .then((response: Response) => {
                if (response.status === 200) {
                  console.log('Add data completed');
                  alert('Add data completed');
      
                  const tr: HTMLTableRowElement 
                    = document.createElement('tr');

                  tr.innerHTML = `
                      <td>${employee.employeeID}</td>
                      <td>${employee.fullName}</td>
                      <td>${employee.salary}</td>
                      <td>${employee.bonus}</td>
                      <td>${employee.subsidize}</td>
                  `;
        
                  this.employeesTableBody.appendChild(tr);
                  form.reset();
      
                } else {
                  console.log(`Add data failed - Error: ${response.status}`);
                  alert('Add data failed');
                };
              });
          };
        })
        .catch(console.log);
    });
  }

  @MethodEmployeeManagerLogger
  private showEmployeeList () {
    fetch(this.empoloyeesDataURL, {
      method: 'GET'
    })
      .then((response: Response) => {
        if (response.status === 200) {
          return response.json();

        } else {
          throw new Error(`${response.status}`);
        };
      })
      .then((data: Object) => {
        Object.keys(data).forEach((key: string | number) => {
          const row: Employee = data[key];

          const tr: HTMLTableRowElement = document.createElement('tr');
          tr.innerHTML = `
              <td>${row.employeeID}</td>
              <td>${row.fullName}</td>
              <td>${row.salary}</td>
              <td>${row.bonus}</td>
              <td>${row.subsidize}</td>
          `;

          this.employeesTableBody.appendChild(tr);
        });
      })
      .catch(console.log);
  }
}

const manageEmployee = new EmployeeManager(
  [
    document.querySelector('#updateArea'),
    document.querySelector('#listArea')
  ],
  [
    document.querySelector('#updateBtn'),
    document.querySelector('#listBtn')
  ],
  document.querySelector('#addEmployeeForm'),
  document.querySelector('#employeeList')
);