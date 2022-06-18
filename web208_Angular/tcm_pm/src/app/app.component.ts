import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from './interfaces/employee';
import { KeywordsService } from './services/keywords.service';
import { Subscription } from 'rxjs';
import { AREA_LIST } from './constant/fixed-data';
import { EmployeeService } from './services/employee.service';
import { TaskService } from './services/task.service';
import { ProjectService } from './services/project.service';
import { Project } from './interfaces/project';
import { AuthService } from './services/auth.service';

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
      inf: '',
    },
    {
      name: 'Total Count',
      inf: '',
    },
    {
      name: 'Handled Task Quantity',
      inf: '',
    },
    {
      name: 'Members Quantity',
      inf: ''
    },
  ];

  constructor(
    private router: Router,
    private keywordsService: KeywordsService,
    private employeeService: EmployeeService,
    private taskService: TaskService,
    private projectService: ProjectService,
    private _auth: AuthService,
  ) { }
  ngOnInit(): void {
    this.subscription
      = this.keywordsService.currentKeywords.subscribe(keywords => this.keywords = keywords);

    AREA_LIST.forEach(area => {
      this.employeeService.getEmployeeListByAreaId(area.id).subscribe((data: any) => {
        this.membersByArea.push({
          name: area.name,
          members: data,
        });
      })
    });

    this.projectService.getProjectList().subscribe((projectList: any) => {
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

    this.taskService.getTaskList().subscribe((taskList: any) => {
      this.statisticsInf[2].inf = String(taskList.length);
    });
    this.employeeService.getEmployeeList().subscribe((employeeList: any) => {
      this.statisticsInf[3].inf = String(employeeList.length);
    });
  }

  // ngDoCheck(): void {
  // }

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

  exit() {
    this._auth.exit();
    this.router.navigate(['/login']);
  }
}
