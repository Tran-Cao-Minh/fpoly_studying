import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { GENDER_LIST, AREA_LIST } from '../constant/fixed-data';
import { SubAttribute } from '../interfaces/sub-attribute';
import { Employee } from '../interfaces/employee';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {
  genderList: Array<SubAttribute> = GENDER_LIST;
  areaList: Array<SubAttribute> = AREA_LIST;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  employeeId: number = Number(this.route.snapshot.params['id']);
  employee: Employee | undefined;

  ngOnInit(): void {
    this.employeeService.getEmployee(this.employeeId).subscribe(result => {
      this.employee = result as Employee;
    });
  }

  updateEmployee(data: any) {
    const employee: Employee = {
      lastName: data.lastName,
      firstName: data.firstName,
      birthDate: data.birthDate,
      genderId: Number(data.genderId),
      areaId: Number(data.areaId),
    }
    this.employeeService.updateEmployee(employee, this.employeeId).subscribe(result => {
      console.log(result);
      this.router.navigate(['/employee-list']);
    });
  }
}
