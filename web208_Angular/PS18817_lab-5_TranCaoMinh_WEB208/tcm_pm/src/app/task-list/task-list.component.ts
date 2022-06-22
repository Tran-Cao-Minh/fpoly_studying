import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../interfaces/employee';
import { Project } from '../interfaces/project';
import { EmployeeService } from '../services/employee.service';
import { PriorityService } from '../services/priority.service';
import { ProjectService } from '../services/project.service';
import { StatusService } from '../services/status.service';
import { TaskService } from '../services/task.service';
import { Task } from '../interfaces/task';
import { ConfirmDangerActionPopupCreator } from '../utils/popup-creator';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  taskList: Array<Task> = [];
  taskName: string | undefined;
  employeeName: string | undefined;
  projectName: string | undefined;


  constructor(
    private taskService: TaskService,
    private employeeService: EmployeeService,
    private projectService: ProjectService,
    private priorityService: PriorityService,
    private statusService: StatusService,
    private route: ActivatedRoute,
    private _confirmPopup: ConfirmDangerActionPopupCreator,
  ) {
    route.params.subscribe(() => {
      this.taskService.getTaskList().subscribe((taskList: any) => {
        taskList.map(async (t: Task) => {
          this.projectService.getProject(t.id).subscribe((project: Project) => {
            t.projectName = project.name;
          });
          this.employeeService.getEmployee(t.id).subscribe((employee: Employee) => {
            t.employeeName = `${employee.lastName} ${employee.firstName}`;
          });
        });

        this.taskList = taskList;
      });
    });
  }

  getPriorityName(id: number = 0) {
    return this.priorityService.getPriorityName(id);
  }

  getStatusName(id: number = 0) {
    return this.statusService.getStatusName(id);
  }

  ngOnInit(): void {
  }

  deleteTask(id: number = 0) {
    this._confirmPopup.createConfirmDangerActionPopup(`Are you sure to delete task with ID: ${id}`, () => {
      this.taskService.deleteTask(id).subscribe((result: any) => {
        console.log(result);

        this.taskList.forEach((e, i) => {
          if (e.id === id) {
            this.taskList.splice(i, 1);
          }
        });
      });
    })
  }
}
