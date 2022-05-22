import { Component, OnInit } from '@angular/core';
import { Project } from '../project';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projectList: Array<Project> = [
    {
      id: 1,
      name: 'Pig Farm Management',
      startDate: '2022-03-01',
      totalCount: 3200,
      leaderId: 1,
      membersId: [1, 3, 4],
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
