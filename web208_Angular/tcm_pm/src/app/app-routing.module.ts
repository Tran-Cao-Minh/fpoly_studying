import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { AboutComponent } from './about/about.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { UpdateProjectComponent } from './update-project/update-project.component';
import { TaskListComponent } from './task-list/task-list.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { SearchResultComponent } from './search-result/search-result.component';

import { ProtectGuard } from './protect.guard';

const routes: Routes = [
  { path: '', component: ProjectListComponent, canActivate: [ProtectGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'account', component: AccountComponent, canActivate: [ProtectGuard] },
  { path: 'about', component: AboutComponent, canActivate: [ProtectGuard] },
  { path: 'project-list', component: ProjectListComponent, canActivate: [ProtectGuard] },
  { path: 'add-project', component: AddProjectComponent, canActivate: [ProtectGuard] },
  { path: 'update-project/:id', component: UpdateProjectComponent, canActivate: [ProtectGuard] },
  { path: 'task-list', component: TaskListComponent, canActivate: [ProtectGuard] },
  { path: 'add-task', component: AddTaskComponent, canActivate: [ProtectGuard] },
  { path: 'update-task/:id', component: UpdateTaskComponent, canActivate: [ProtectGuard] },
  { path: 'employee-list', component: EmployeeListComponent, canActivate: [ProtectGuard] },
  { path: 'add-employee', component: AddEmployeeComponent, canActivate: [ProtectGuard] },
  { path: 'update-employee/:id', component: UpdateEmployeeComponent, canActivate: [ProtectGuard] },
  { path: 'search-result', component: SearchResultComponent, canActivate: [ProtectGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
