import { Employee } from './../employee';
import { Component, OnInit } from '@angular/core';
import { Project } from '../project';
import { SubAttribute } from '../sub-attribute';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PRIORITY_LIST, STATUS_LIST } from '../constant/fixed-data';
import { EmployeeService } from '../services/employee.service';
import { ProjectService } from '../services/project.service';
import { TaskService } from './../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../task';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {
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
    private route: ActivatedRoute,
  ) { }

  updateTaskForm!: FormGroup;
  taskId: number = Number(this.route.snapshot.params['id']);

  ngOnInit(): void {
    this.updateTaskForm = this.formBuider.group({
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

    this.employeeService.getEmployeeList().subscribe((employeeList: any) => {
      this.employeesInf = employeeList;

      this.projectService.getProjectList().subscribe((projectList: any) => {
        this.projectsInf = projectList;
      });
    });

    this.taskService.getTask(this.taskId).subscribe((task: Task) => {
      this.updateTaskForm.setValue(
        {
          'name': task.name,
          'description': task.description,
          'projectId': String(task.projectId),
          'employeeId': String(task.employeeId),
          'priorityId': String(task.priorityId),
          'statusId': String(task.statusId),
        }
      );
    });
  }

  updateTask(data: any) {
    const task: Task = {
      name: data.name,
      description: data.description,
      projectId: Number(data.projectId),
      employeeId: Number(data.employeeId),
      priorityId: Number(data.priorityId),
      statusId: Number(data.statusId),
    };

    this.taskService.updateTask(task, this.taskId).subscribe((result: any) => {
      console.log(result);
      this.router.navigate(['/task-list']);
    });
  }
}
