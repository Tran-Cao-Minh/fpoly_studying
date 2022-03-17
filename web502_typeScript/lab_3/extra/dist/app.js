;
var ManageEmployee = /** @class */ (function () {
    function ManageEmployee(areaList, swapAreaBtnList, addEmployeeForm, employeesTableBody) {
        var _this = this;
        this.empoloyeesDataURL = 'https://lab-3-ts-default-rtdb.firebaseio.com/employees.json';
        this.swapArea = function () {
            _this.swapAreaBtnList.forEach(function (btn) {
                btn.addEventListener('click', function () {
                    _this.swapAreaBtnList.forEach(function (btn) {
                        btn.classList.add('btn-light');
                        btn.classList.remove('btn-primary');
                    });
                    btn.classList.add('btn-primary');
                    btn.classList.remove('btn-light');
                    _this.areaList.forEach(function (area) {
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
        this.createAddEmployeeEvent = function () {
            var form = _this.addEmployeeForm;
            form.addEventListener('submit', function (ev) {
                ev.preventDefault();
                var employee = {
                    'employeeID': form.employeeID.value,
                    'fullName': form.fullName.value,
                    'club': form.club.value,
                    'salary': Number(form.salary.value),
                    'bonus': Number(form.bonus.value),
                    'subsidize': Number(form.subsidize.value),
                    'note': form.note.value
                };
                var formData = JSON.stringify(employee);
                fetch(_this.empoloyeesDataURL, {
                    method: 'POST',
                    body: formData
                })
                    .then(function (response) {
                    if (response.status === 200) {
                        console.log('Add data completed');
                        alert('Add data completed');
                        var tr = document.createElement('tr');
                        tr.innerHTML = "\n                <td>".concat(employee.employeeID, "</td>\n                <td>").concat(employee.fullName, "</td>\n                <td>").concat(employee.salary, "</td>\n                <td>").concat(employee.bonus, "</td>\n                <td>").concat(employee.subsidize, "</td>\n            ");
                        _this.employeesTableBody.appendChild(tr);
                        form.reset();
                    }
                    else {
                        console.log("Add data failed - Error: ".concat(response.status));
                        alert('Add data failed');
                    }
                    ;
                });
            });
        };
        this.showEmployeeList = function () {
            fetch(_this.empoloyeesDataURL, {
                method: 'GET'
            })
                .then(function (response) {
                if (response.status === 200) {
                    return response.json();
                }
                else {
                    throw new Error("".concat(response.status));
                }
                ;
            })
                .then(function (data) {
                Object.keys(data).forEach(function (key) {
                    var row = data[key];
                    var tr = document.createElement('tr');
                    tr.innerHTML = "\n              <td>".concat(row.employeeID, "</td>\n              <td>").concat(row.fullName, "</td>\n              <td>").concat(row.salary, "</td>\n              <td>").concat(row.bonus, "</td>\n              <td>").concat(row.subsidize, "</td>\n          ");
                    _this.employeesTableBody.appendChild(tr);
                });
            })["catch"](console.log);
        };
        this.areaList = areaList;
        this.swapAreaBtnList = swapAreaBtnList;
        this.swapArea();
        this.addEmployeeForm = addEmployeeForm;
        this.createAddEmployeeEvent();
        this.employeesTableBody = employeesTableBody;
        this.showEmployeeList();
    }
    return ManageEmployee;
}());
var manageEmployee = new ManageEmployee([
    document.querySelector('#updateArea'),
    document.querySelector('#listArea')
], [
    document.querySelector('#updateBtn'),
    document.querySelector('#listBtn')
], document.querySelector('#addEmployeeForm'), document.querySelector('#employeeList'));
