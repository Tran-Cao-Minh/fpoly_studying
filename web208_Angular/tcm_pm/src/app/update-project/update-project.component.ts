import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../employee';
import { Project } from '../project';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css']
})
export class UpdateProjectComponent implements OnInit {
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

  constructor(
    private route: ActivatedRoute
  ) { }

  projectId: number = Number(this.route.snapshot.params['id']);
  project = <Project>{};

  ngOnInit(): void {
    if (this.projectId < 0) return;
    const result = this.projectList.find(p => p.id === this.projectId);

    if (result === null) {
      this.project = {} as Project;
    } else {
      this.project = result as Project;
    }
  }
}
