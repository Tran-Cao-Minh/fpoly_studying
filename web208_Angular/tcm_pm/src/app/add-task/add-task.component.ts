import { Employee } from './../employee';
import { Component, OnInit } from '@angular/core';
import { Project } from '../project';
import { SubAttribute } from '../sub-attribute';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  projectsInf: Array<Project> = [
    {
      id: 1,
      name: 'Pig Farm Management',
    },
    {
      id: 2,
      name: 'Lemon Garden Management',
    },
  ];

  performersInf: Array<Employee> = [
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
  ];

  priorityList: Array<SubAttribute> = [
    {
      id: 0,
      name: 'Low',
    },
    {
      id: 1,
      name: 'Medium',
    },
    {
      id: 2,
      name: 'High',
    },
    {
      id: 3,
      name: 'Very High',
    },
  ];

  statusList: Array<SubAttribute> = [
    {
      id: 0,
      name: 'Assigned',
    },
    {
      id: 1,
      name: 'In Progress',
    },
    {
      id: 2,
      name: 'Code Review',
    },
    {
      id: 3,
      name: 'Local Test',
    },
    {
      id: 4,
      name: 'UAT',
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
