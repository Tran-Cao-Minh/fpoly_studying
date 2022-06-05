import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { AccountComponent } from './account/account.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { TaskListComponent } from './task-list/task-list.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { UpdateProjectComponent } from './update-project/update-project.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KeywordsService } from './services/keywords.service';
import { HttpClientModule } from '@angular/common/http';
import HttpService from './services/rest.service';
import { ConfirmDangerActionPopupCreator } from './utils/popup-creator';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AboutComponent,
    AccountComponent,
    ProjectListComponent,
    TaskListComponent,
    SearchResultComponent,
    AddProjectComponent,
    UpdateProjectComponent,
    AddTaskComponent,
    UpdateTaskComponent,
    DashboardComponent,
    EmployeeListComponent,
    AddEmployeeComponent,
    UpdateEmployeeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    KeywordsService,
    HttpService,
    ConfirmDangerActionPopupCreator,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
