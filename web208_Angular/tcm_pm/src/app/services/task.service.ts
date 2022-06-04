import { Injectable } from '@angular/core';
import { Task } from '../task';
import HttpService from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(
    private _httpService: HttpService
  ) { }

  getTaskList() {
    return this._httpService.get('task');
  }

  getTask(id: number = 0) {
    return this._httpService.get(`task/${id}`);
  }

  addTask(task: Task = <Task>{}) {
    return this._httpService.post('task', task);
  }

  updateTask(task: Task = <Task>{}, id: number) {
    return this._httpService.put('task', id, task);
  }

  deleteTask(id: number = 0) {
    return this._httpService.delete('task', id);
  }
}
