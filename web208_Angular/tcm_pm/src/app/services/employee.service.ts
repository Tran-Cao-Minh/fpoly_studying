import { Injectable } from '@angular/core';
import { Employee } from '../employee';
import HttpService from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor() { }

  getEmployeeList() {
    return HttpService.get('employee');
  }

  getEmployee(id: number = 0) {
    return HttpService.get(`employee/${id}`);
  }

  addEmployee(employee: Employee = <Employee>{}) {
    return HttpService.post('employee', employee);
  }

  updateEmployee(employee: Employee = <Employee>{}, id: number) {
    return HttpService.put('employee', id, employee);
  }

  deleteEmployee(id: number = 0) {
    return HttpService.delete('employee', id);
  }
}
