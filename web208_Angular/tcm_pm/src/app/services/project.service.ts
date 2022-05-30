import { Injectable } from '@angular/core';
import { Project } from '../project';
import HttpService from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor() { }

  getProjectList() {
    return HttpService.get('project');
  }

  getProject(id: number = 0) {
    return HttpService.get(`project/${id}`);
  }

  addProject(project: Project = <Project>{}) {
    return HttpService.post('project', project);
  }

  updateProject(project: Project = <Project>{}, id: number) {
    return HttpService.put('project', id, project);
  }

  deleteProject(id: number = 0) {
    return HttpService.delete('project', id);
  }
}
