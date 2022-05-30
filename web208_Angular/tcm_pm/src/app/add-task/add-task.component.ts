import { Employee } from './../employee';
import { Component, OnInit } from '@angular/core';
import { Project } from '../project';
import { SubAttribute } from '../sub-attribute';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PRIORITY_LIST, STATUS_LIST } from '../constant/fixed-data';
import { EmployeeService } from '../services/employee.service';
import { ProjectService } from '../services/project.service';
import { TaskService } from './../services/task.service';
import { Router } from '@angular/router';
import { Task } from '../task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  projectsInf: Array<Project> = [];
  employeesInf: Array<Employee> = [];
  priorityList: Array<SubAttribute> = PRIORITY_LIST;
  statusList: Array<SubAttribute> = STATUS_LIST;

  constructor(
    private formBuider: FormBuilder,
    private employeeService: EmployeeService,
    private projectService: ProjectService,
    private taskService: TaskService,
    private router: Router,
  ) { }
  addTaskForm!: FormGroup;

  ngOnInit(): void {
    this.addTaskForm = this.formBuider.group({
      name: [null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
      ]],
      description: [null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(120),
      ]],
      projectId: [],
      employeeId: [],
      priorityId: [this.priorityList[0].id,],
      statusId: [this.statusList[0].id,],
    });

    this.employeeService.getEmployeeList().then(employeeList => {
      this.employeesInf = employeeList;

      this.projectService.getProjectList().then(projectList => {
        this.projectsInf = projectList;

        this.addTaskForm.setValue(
          {
            'name': null,
            'description': null,
            'projectId': String(projectList[0].id),
            'employeeId': String(employeeList[0].id),
            'priorityId': this.priorityList[0].id,
            'statusId': this.statusList[0].id,
          });
      });
    });
  }

  addTask(data: any) {
    const task: Task = {
      name: data.name,
      description: data.description,
      projectId: Number(data.projectId),
      employeeId: Number(data.employeeId),
      priorityId: Number(data.priorityId),
      statusId: Number(data.statusId),
    };

    this.taskService.addTask(task).then(result => {
      console.log(result);
      this.router.navigate(['/task-list']);
    });
  }
}
