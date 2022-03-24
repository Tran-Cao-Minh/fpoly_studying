var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
;
// DECORATORS
function LogCreate(constructor) {
    console.log('Log Create: ', constructor);
}
function EmployeeManagerLogger(logString) {
    return function (constructor) {
        console.log(logString);
        console.log(constructor);
    };
}
function PropertyEmployeeManagerLogger(target, propertyName) {
    console.log('Employee Manger Class: ', target);
    console.log('Selected Property of Employee Manager Class: ', propertyName);
}
function MethodEmployeeManagerLogger(target, methodName, propertyDescriptor) {
    console.log('Employee Manger Class: ', target);
    console.log('Selected Method of Employee Manager Class: ', methodName);
    console.log('Method Descriptor: ', propertyDescriptor);
}
// end DECORATORS
let EmployeeManager = class EmployeeManager {
    constructor(areaList, swapAreaBtnList, addEmployeeForm, employeesTableBody) {
        this.empoloyeesDataURL = 'https://lab-3-ts-default-rtdb.firebaseio.com/employees.json';
        this.areaList = areaList;
        this.swapAreaBtnList = swapAreaBtnList;
        this.swapArea();
        this.addEmployeeForm = addEmployeeForm;
        this.createAddEmployeeEvent();
        this.employeesTableBody = employeesTableBody;
        this.showEmployeeList();
    }
    set newEmpoloyeesDataURL(val) {
        this.empoloyeesDataURL = val;
    }
    swapArea() {
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
                    }
                    else {
                        area.classList.add('d-none');
                    }
                    ;
                });
            });
        });
    }
    createAddEmployeeEvent() {
        const form = this.addEmployeeForm;
        form.addEventListener('submit', (ev) => {
            ev.preventDefault();
            fetch(this.empoloyeesDataURL, {
                method: 'GET'
            })
                .then((response) => {
                if (response.status === 200) {
                    return response.json();
                }
                else {
                    throw new Error(`${response.status}`);
                }
                ;
            })
                .then((data) => {
                let checkExist;
                Object.keys(data).forEach((key) => {
                    const row = data[key];
                    if (row.employeeID === form.employeeID.value) {
                        checkExist = true;
                    }
                    ;
                });
                if (checkExist === true) {
                    alert('Add data failed - duplicate employee ID');
                }
                else {
                    const employee = {
                        'employeeID': form.employeeID.value,
                        'fullName': form.fullName.value,
                        'club': form.club.value,
                        'salary': Number(form.salary.value),
                        'bonus': Number(form.bonus.value),
                        'subsidize': Number(form.subsidize.value),
                        'note': form.note.value,
                    };
                    const formData = JSON.stringify(employee);
                    fetch(this.empoloyeesDataURL, {
                        method: 'POST',
                        body: formData
                    })
                        .then((response) => {
                        if (response.status === 200) {
                            console.log('Add data completed');
                            alert('Add data completed');
                            const tr = document.createElement('tr');
                            tr.innerHTML = `
                      <td>${employee.employeeID}</td>
                      <td>${employee.fullName}</td>
                      <td>${employee.salary}</td>
                      <td>${employee.bonus}</td>
                      <td>${employee.subsidize}</td>
                  `;
                            this.employeesTableBody.appendChild(tr);
                            form.reset();
                        }
                        else {
                            console.log(`Add data failed - Error: ${response.status}`);
                            alert('Add data failed');
                        }
                        ;
                    });
                }
                ;
            })
                .catch(console.log);
        });
    }
    showEmployeeList() {
        fetch(this.empoloyeesDataURL, {
            method: 'GET'
        })
            .then((response) => {
            if (response.status === 200) {
                return response.json();
            }
            else {
                throw new Error(`${response.status}`);
            }
            ;
        })
            .then((data) => {
            Object.keys(data).forEach((key) => {
                const row = data[key];
                const tr = document.createElement('tr');
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
};
__decorate([
    PropertyEmployeeManagerLogger
], EmployeeManager.prototype, "empoloyeesDataURL", void 0);
__decorate([
    PropertyEmployeeManagerLogger
], EmployeeManager.prototype, "areaList", void 0);
__decorate([
    PropertyEmployeeManagerLogger
], EmployeeManager.prototype, "swapAreaBtnList", void 0);
__decorate([
    PropertyEmployeeManagerLogger
], EmployeeManager.prototype, "addEmployeeForm", void 0);
__decorate([
    PropertyEmployeeManagerLogger
], EmployeeManager.prototype, "employeesTableBody", void 0);
__decorate([
    MethodEmployeeManagerLogger // Accesstor Decorator because it apply for SETTER or GETTER
], EmployeeManager.prototype, "newEmpoloyeesDataURL", null);
__decorate([
    MethodEmployeeManagerLogger
], EmployeeManager.prototype, "swapArea", null);
__decorate([
    MethodEmployeeManagerLogger
], EmployeeManager.prototype, "createAddEmployeeEvent", null);
__decorate([
    MethodEmployeeManagerLogger
], EmployeeManager.prototype, "showEmployeeList", null);
EmployeeManager = __decorate([
    LogCreate,
    EmployeeManagerLogger('LOGGING: EmployeeManager')
], EmployeeManager);
const manageEmployee = new EmployeeManager([
    document.querySelector('#updateArea'),
    document.querySelector('#listArea')
], [
    document.querySelector('#updateBtn'),
    document.querySelector('#listBtn')
], document.querySelector('#addEmployeeForm'), document.querySelector('#employeeList'));
