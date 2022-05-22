import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employeeList: Array<Employee> = [
    {
      id: 1,
      lastName: 'Tran Cao',
      firstName: 'Minh',
      birthDate: '2002-08-14',
      gender: true,
      area: 'South',
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
