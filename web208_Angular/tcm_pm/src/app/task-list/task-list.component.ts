import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../employee';
import { Project } from '../project';
import { EmployeeService } from '../services/employee.service';
import { PriorityService } from '../services/priority.service';
import { ProjectService } from '../services/project.service';
import { StatusService } from '../services/status.service';
import { TaskService } from '../services/task.service';
import { Task } from '../task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  taskList: Array<Task> = [];

  constructor(
    private taskService: TaskService,
    private employeeService: EmployeeService,
    private projectService: ProjectService,
    private priorityService: PriorityService,
    private statusService: StatusService,
    private route: ActivatedRoute,
  ) {
    route.params.subscribe(() => {
      this.taskService.getTaskList().then(taskList => {
        taskList.map(async (t: Task) => {
          t.employeeName = await this.employeeService.getEmployee(t.id).then((employee: Employee) => {
            return `${employee.lastName} ${employee.firstName}`;
          });
          t.projectName = await this.projectService.getProject(t.id).then((project: Project) => {
            return project.name;
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
    this.taskService.deleteTask(id).then(result => {
      console.log(result);

      this.taskList.forEach((e, i) => {
        if (e.id === id) {
          this.taskList.splice(i, 1);
        }
      });
    });
  }
}
