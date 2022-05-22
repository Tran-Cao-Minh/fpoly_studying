import { Component, OnInit } from '@angular/core';
import { SubAttribute } from '../sub-attribute';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  genderList: Array<SubAttribute> = [
    {
      id: 0,
      name: 'Male',
    },
    {
      id: 1,
      name: 'Female',
    },
  ];

  areaList: Array<SubAttribute> = [
    {
      id: 0,
      name: 'East',
    },
    {
      id: 1,
      name: 'West',
    },
    {
      id: 2,
      name: 'South',
    },
    {
      id: 3,
      name: 'North',
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
