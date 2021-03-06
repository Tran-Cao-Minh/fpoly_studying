import { Injectable } from '@angular/core';
import { Employee } from '../interfaces/employee';
import HttpService from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(
    private _httpService: HttpService
  ) { }

  // getEmployeeList() {
  //   return HttpService.get('employee');
  // }

  // getEmployeeListByAreaId(id: number = 0) {
  //   return HttpService.get(`employee?areaId=${id}`);
  // }

  // getEmployee(id: number = 0) {
  //   return HttpService.get(`employee/${id}`);
  // }

  // addEmployee(employee: Employee = <Employee>{}) {
  //   return HttpService.post('employee', employee);
  // }

  // updateEmployee(employee: Employee = <Employee>{}, id: number) {
  //   return HttpService.put('employee', id, employee);
  // }

  // deleteEmployee(id: number = 0) {
  //   return HttpService.delete('employee', id);
  // }

  getEmployeeList() {
    return this._httpService.get('employee');
  }

  getEmployeeListByAreaId(id: number = 0) {
    return this._httpService.get(`employee?areaId=${id}`);
  }

  getEmployee(id: number = 0) {
    return this._httpService.get(`employee/${id}`);
  }

  addEmployee(employee: Employee = <Employee>{}) {
    return this._httpService.post('employee', employee);
  }

  updateEmployee(employee: Employee = <Employee>{}, id: number) {
    return this._httpService.put('employee', id, employee);
  }

  deleteEmployee(id: number = 0) {
    return this._httpService.delete('employee', id);
  }
}
