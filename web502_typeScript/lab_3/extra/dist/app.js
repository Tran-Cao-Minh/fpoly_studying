;
class ManageEmployee {
    constructor(areaList, swapAreaBtnList, addEmployeeForm, employeesTableBody) {
        this.empoloyeesDataURL = 'https://lab-3-ts-default-rtdb.firebaseio.com/employees.json';
        this.swapArea = () => {
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
        };
        this.createAddEmployeeEvent = () => {
            const form = this.addEmployeeForm;
            form.addEventListener('submit', (ev) => {
                ev.preventDefault();
                fetch(this.empoloyeesDataURL, {
                    method: 'GET'
                })
                    .then(response => {
                    if (response.status === 200) {
                        return response.json();
                    }
                    else {
                        throw new Error(`${response.status}`);
                    }
                    ;
                })
                    .then(data => {
                    let checkExist;
                    Object.keys(data).forEach(key => {
                        const row = data[key];
                        if (row.fullName === form.fullName.value) {
                            checkExist = true;
                        }
                        ;
                    });
                    if (checkExist === true) {
                        alert('Add data failed - duplicate employee full name');
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
                            .then(response => {
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
        };
        this.showEmployeeList = () => {
            fetch(this.empoloyeesDataURL, {
                method: 'GET'
            })
                .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
                else {
                    throw new Error(`${response.status}`);
                }
                ;
            })
                .then(data => {
                Object.keys(data).forEach(key => {
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
        };
        this.areaList = areaList;
        this.swapAreaBtnList = swapAreaBtnList;
        this.swapArea();
        this.addEmployeeForm = addEmployeeForm;
        this.createAddEmployeeEvent();
        this.employeesTableBody = employeesTableBody;
        this.showEmployeeList();
    }
}
const manageEmployee = new ManageEmployee([
    document.querySelector('#updateArea'),
    document.querySelector('#listArea')
], [
    document.querySelector('#updateBtn'),
    document.querySelector('#listBtn')
], document.querySelector('#addEmployeeForm'), document.querySelector('#employeeList'));
