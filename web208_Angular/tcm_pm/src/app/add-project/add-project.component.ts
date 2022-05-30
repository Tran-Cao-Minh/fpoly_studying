import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { ProjectService } from '../services/project.service';
import { Project } from '../project';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  employeesInf: Array<Employee> = [];

  constructor(
    private employeeService: EmployeeService,
    private projectService: ProjectService,
    private router: Router,
  ) { }

  addProjectForm!: FormGroup;

  ngOnInit(): void {
    this.employeeService.getEmployeeList().then(result => {
      this.employeesInf = result;
      this.addProjectForm.setValue({
        'name': null,
        'startDate': null,
        'totalCount': null,
        'leaderId': String(this.employeesInf[0]?.id),
        'membersId': null,
      });
    });

    this.addProjectForm = new FormGroup({
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

  addProject(data: any) {
    const project: Project = {
      name: data.name,
      startDate: data.startDate,
      totalCount: Number(data.totalCount),
      leaderId: Number(data.leaderId),
      membersId: data.membersId?.map((i: String) => Number(i)),
    }

    this.projectService.addProject(project).then(result => {
      console.log(result);
      this.router.navigate(['/project-list']);
    });
  }
}
