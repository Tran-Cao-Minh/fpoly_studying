import { Component, OnInit } from '@angular/core';
import { Task } from '../task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  taskList: Array<Task> = [
    {
      id: 1,
      name: 'Requirements analysis',
      projectId: 1,
      employeeId: 1,
      description: 'Analyze customer requirements for the team to implement',
      priority: 1,
      status: 0,
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
