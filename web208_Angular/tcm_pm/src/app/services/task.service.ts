import { Injectable } from '@angular/core';
import { Task } from '../task';
import HttpService from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor() { }

  getTaskList() {
    return HttpService.get('task');
  }

  getTask(id: number = 0) {
    return HttpService.get(`task/${id}`);
  }

  addTask(task: Task = <Task>{}) {
    return HttpService.post('task', task);
  }

  updateTask(task: Task = <Task>{}, id: number) {
    return HttpService.put('task', id, task);
  }

  deleteTask(id: number = 0) {
    return HttpService.delete('task', id);
  }
}
