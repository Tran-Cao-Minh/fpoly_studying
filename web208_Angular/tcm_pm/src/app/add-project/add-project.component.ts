import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  employeesInf: Array<Employee> = [
    {
      id: 1,
      lastName: 'Tran Cao',
      firstName: 'Minh',
    },
    {
      id: 2,
      lastName: 'Le Vinh',
      firstName: 'Ky',
    },
    {
      id: 3,
      lastName: 'Nguyen Quang',
      firstName: 'Vu',
    },
    {
      id: 4,
      lastName: 'Le Van',
      firstName: 'Duong',
    },
    {
      id: 5,
      lastName: 'Nguyen Thanh',
      firstName: 'Phong',
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }


}
