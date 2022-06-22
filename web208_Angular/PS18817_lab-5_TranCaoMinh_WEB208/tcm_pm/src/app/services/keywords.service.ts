import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { SearchItem } from '../interfaces/search-item';
import HttpService from './rest.service';

@Injectable()
export class KeywordsService {
  private keywordsSource = new BehaviorSubject('');
  currentKeywords = this.keywordsSource.asObservable();

  constructor(
    private _http: HttpService
  ) { }

  changeKeywords(keywords: string) {
    console.log(keywords);
    this.keywordsSource.next(keywords);
  }

  async getItemsByKeywords(keywords: string) {
    const endpointList = [
      {
        value: `project?name_like=${keywords}`,
        type: 'project',
      },
      {
        value: `task?name_like=${keywords}`,
        type: 'task',
      },
      {
        value: `employee?firstName_like=${keywords}`,
        type: 'employee',
      },
    ];

    const finalResult: any = [];

    endpointList.map(async (endpoint) => {
      return this._http.get(endpoint.value).subscribe((data: any) => {
        const result: Array<SearchItem> = [];

        switch (endpoint.type) {
          case 'project':
          case 'task':
            data.forEach((i: any) => {
              result.push({
                name: i.name,
                id: i.id,
                type: endpoint.type,
              });
            });
            finalResult.push(...result);
            break;

          case 'employee':
            data.forEach((i: any) => {
              result.push({
                name: `${i.lastName} ${i.firstName}`,
                id: i.id,
                type: endpoint.type,
              });
            });
            finalResult.push(...result);
            break;

          default:
            finalResult.push({
              name: '',
              id: 0,
              type: '',
            });
        };
      });
    });

    return finalResult;
  }
}