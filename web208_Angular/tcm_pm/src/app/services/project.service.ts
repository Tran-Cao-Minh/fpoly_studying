import { Injectable } from '@angular/core';
import { Project } from '../interfaces/project';
import HttpService from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(
    private _httpService: HttpService
  ) { }

  getProjectList() {
    return this._httpService.get('project');
  }

  getProject(id: number = 0) {
    return this._httpService.get(`project/${id}`);
  }

  addProject(project: Project = <Project>{}) {
    return this._httpService.post('project', project);
  }

  updateProject(project: Project = <Project>{}, id: number) {
    return this._httpService.put('project', id, project);
  }

  deleteProject(id: number = 0) {
    return this._httpService.delete('project', id);
  }
}
