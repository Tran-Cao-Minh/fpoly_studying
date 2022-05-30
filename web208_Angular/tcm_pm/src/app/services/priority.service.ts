import { Injectable } from '@angular/core';
import { PRIORITY_LIST } from '../constant/fixed-data';

@Injectable({
  providedIn: 'root'
})
export class PriorityService {

  constructor() { }

  getPriorityName(id: number = 0) {
    const priorityList = PRIORITY_LIST;
    let priorityName: String | undefined;

    priorityList.forEach(p => {
      if (p.id === id) {
        priorityName = p.name;
      }
    });

    return priorityName;
  }
}
