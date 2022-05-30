import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from './employee';
import { KeywordsService } from './services/keywords.service';
import { Subscription } from 'rxjs';
import { AREA_LIST } from './constant/fixed-data';
import { EmployeeService } from './services/employee.service';
import { TaskService } from './services/task.service';
import { ProjectService } from './services/project.service';
import { Project } from './project';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  keywords: string = '';
  subscription!: Subscription;
  membersByArea: Array<{ name: string, members: Array<Employee> }> = [];
  statisticsInf: Array<{ name: string, inf: string }> = [
    {
      name: 'Project Quantity',
      inf: '21',
    },
    {
      name: 'Total Count',
      inf: '$ 2480K',
    },
    {
      name: 'Handled Task Quantity',
      inf: '14',
    },
    {
      name: 'Members Quantity',
      inf: '5'
    },
  ];

  constructor(
    private router: Router,
    private keywordsService: KeywordsService,
    private employeeService: EmployeeService,
    private taskService: TaskService,
    private projectService: ProjectService,
  ) { }
  ngOnInit(): void {
    this.subscription
      = this.keywordsService.currentKeywords.subscribe(keywords => this.keywords = keywords);

    AREA_LIST.forEach(async area => {
      this.membersByArea.push({
        name: area.name,
        members: await this.employeeService.getEmployeeListByAreaId(area.id),
      });
    });

    this.projectService.getProjectList().then(projectList => {
      this.statisticsInf[0].inf = String(projectList.length);

      let totalCount = 0;
      projectList.forEach((p: Project) => {
        totalCount += Number(p.totalCount);
      });

      this.statisticsInf[1].inf = totalCount.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });
    });

    this.taskService.getTaskList().then(taskList => {
      this.statisticsInf[2].inf = String(taskList.length);
    });
    this.employeeService.getEmployeeList().then(employeeList => {
      this.statisticsInf[3].inf = String(employeeList.length);
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe;
  }

  showSearchResult() {
    this.keywordsService.changeKeywords(this.keywords);

    if (this.router.routerState.snapshot.url !== '/search-result') {
      this.router.navigate(['/search-result']);
    }
  }

  // fnName: string = '';
  // recordFn(fnName: string = '') {
  //   this.fnName = fnName;
  // }
}
