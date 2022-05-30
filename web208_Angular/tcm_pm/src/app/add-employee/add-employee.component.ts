import { Employee } from './../employee';
import { Component, OnInit } from '@angular/core';
import { SubAttribute } from '../sub-attribute';
import { EmployeeService } from '../services/employee.service';
import { GENDER_LIST, AREA_LIST } from '../constant/fixed-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  genderList: Array<SubAttribute> = GENDER_LIST;
  areaList: Array<SubAttribute> = AREA_LIST;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  addEmployee(data: any) {
    const employee: Employee = {
      lastName: data.lastName,
      firstName: data.firstName,
      birthDate: data.birthDate,
      genderId: Number(data.genderId),
      areaId: Number(data.areaId),
    }
    this.employeeService.addEmployee(employee).then(result => {
      console.log(result);
      this.router.navigate(['/employee-list']);
    });
  }
}
