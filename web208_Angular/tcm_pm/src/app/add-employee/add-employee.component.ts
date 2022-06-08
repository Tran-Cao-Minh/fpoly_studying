import { Employee } from '../interfaces/employee';
import { Component, OnInit } from '@angular/core';
import { SubAttribute } from '../interfaces/sub-attribute';
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
  imgSrcBase64: string = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  handleInputAvatarChange(e: any) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e: any) {
    let reader = e.target;
    this.imgSrcBase64 = reader.result;
    console.log(this.imgSrcBase64);
  }

  addEmployee(data: any) {
    const employee: Employee = {
      lastName: data.lastName,
      firstName: data.firstName,
      birthDate: data.birthDate,
      genderId: Number(data.genderId),
      areaId: Number(data.areaId),
      avatar: this.imgSrcBase64,
    }
    this.employeeService.addEmployee(employee).subscribe((result: any) => {
      console.log(result);
      this.router.navigate(['/employee-list']);
    });
  }
}
