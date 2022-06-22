import { Component, OnInit } from '@angular/core';
import { Project } from '../interfaces/project';
import { ProjectService } from '../services/project.service';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDangerActionPopupCreator } from '../utils/popup-creator';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projectList: Array<Project> = [];

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private _confirmPopup: ConfirmDangerActionPopupCreator,
  ) {
    route.params.subscribe(() => {
      this.projectService.getProjectList().subscribe((result: any) => {
        this.projectList = result;
      });
    });
  }

  ngOnInit(): void {
  }

  deleteProject(id: number = 0) {
    this._confirmPopup.createConfirmDangerActionPopup(`Are you sure to delete project with ID: ${id}`, () => {
      this.projectService.deleteProject(id).subscribe(result => {
        console.log(result);

        this.projectList.forEach((e, i) => {
          if (e.id === id) {
            this.projectList.splice(i, 1);
          }
        });
      });
    })
  }
}
