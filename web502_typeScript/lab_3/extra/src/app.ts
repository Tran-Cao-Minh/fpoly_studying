interface Employee {
  employeeID: string,
  fullName: string,
  club: string,
  salary: number,
  bonus: number,
  subsidize: number,
  note: string
};

class ManageEmployee {
  private empoloyeesDataURL: string = 'https://lab-3-ts-default-rtdb.firebaseio.com/employees.json';
  private areaList: HTMLElement[];
  private swapAreaBtnList: HTMLButtonElement[];
  private addEmployeeForm: HTMLFormElement;
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

  private swapArea = () => {
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

  private createAddEmployeeEvent = () => {
    const form = this.addEmployeeForm;
    form.addEventListener('submit', (ev: SubmitEvent) => {
      ev.preventDefault();

      const employee: Employee = {
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

          } else {
            console.log(`Add data failed - Error: ${response.status}`);
            alert('Add data failed');
          };
        });
    });
  }

  private showEmployeeList = () => {
    fetch(this.empoloyeesDataURL, {
      method: 'GET'
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();

        } else {
          throw new Error(`${response.status}`);
        };
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
  }
}

const manageEmployee = new ManageEmployee(
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