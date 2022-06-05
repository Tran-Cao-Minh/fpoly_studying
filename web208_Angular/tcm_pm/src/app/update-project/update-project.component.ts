import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../interfaces/employee';
import { Project } from '../interfaces/project';
import { EmployeeService } from '../services/employee.service';
import { ProjectService } from '../services/project.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css']
})
export class UpdateProjectComponent implements OnInit {
  employeesInf: Array<Employee> = [];
  projectList: Array<Project> = [];

  constructor(
    private employeeService: EmployeeService,
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  updateProjectForm!: FormGroup;
  projectId: number = Number(this.route.snapshot.params['id']);

  ngOnInit(): void {
    this.employeeService.getEmployeeList().subscribe((result: any) => {
      this.employeesInf = result;

      this.projectService.getProject(this.projectId).subscribe((project: Project) => {
        this.updateProjectForm.setValue({
          'name': project.name,
          'startDate': project.startDate,
          'totalCount': project.totalCount,
          'leaderId': String(project.leaderId),
          'membersId': project.membersId?.map(String),
        });
      });
    });

    this.updateProjectForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
      ]),
      startDate: new FormControl(null, [
        Validators.required,
      ]),
      totalCount: new FormControl(null, [
        Validators.required,
        Validators.min(0),
        Validators.max(999999999),
      ]),
      leaderId: new FormControl(),
      membersId: new FormControl(null, [
        Validators.required,
      ]),
    });
  }

  updateProject(data: any) {
    const project: Project = {
      name: data.name,
      startDate: data.startDate,
      totalCount: Number(data.totalCount),
      leaderId: Number(data.leaderId),
      membersId: data.membersId?.map((i: String) => Number(i)),
    }

    this.projectService.updateProject(project, this.projectId).subscribe((result: any) => {
      console.log(result);
      this.router.navigate(['/project-list']);
    });
  }
}
