import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../services/employee.service';
import { AreaService } from '../services/area.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employeeList: Array<Employee> = [];

  constructor(
    private employeeService: EmployeeService,
    private areaService: AreaService,
    private route: ActivatedRoute,
  ) {
    route.params.subscribe(() => {
      this.employeeService.getEmployeeList().then(result => {
        this.employeeList = result;
      });
    });
  }

  getAreaName(id: number = 0) {
    return this.areaService.getAreaName(id);
  }

  ngOnInit(): void { }

  deleteEmployee(id: number = 0) {
    this.employeeService.deleteEmployee(id).then(result => {
      console.log(result);

      this.employeeList.forEach((e, i) => {
        if (e.id === id) {
          this.employeeList.splice(i, 1);
        }
      });
    });
  }
}
