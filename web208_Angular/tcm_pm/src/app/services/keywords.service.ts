import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SearchItem } from '../search-item';
import HttpService from './rest.service';

@Injectable()
export class KeywordsService {
  private keywordsSource = new BehaviorSubject('');
  currentKeywords = this.keywordsSource.asObservable();

  constructor() { }

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

    const promiseResultList: Array<Promise<Array<SearchItem>>> = endpointList.map(async (endpoint) => {
      const data = await HttpService.get(endpoint.value);
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
          return result;

        case 'employee':
          data.forEach((i: any) => {
            result.push({
              name: `${i.lastName} ${i.firstName}`,
              id: i.id,
              type: endpoint.type,
            });
          });
          return result;

        default:
          return [{
            name: '',
            id: 0,
            type: '',
          }];
      };
    });

    const result: Array<SearchItem> = [];
    promiseResultList.forEach(async promiseResult => {
      result.push(...(await promiseResult));
    });

    return result;
  }
}