import { Injectable } from '@angular/core';
import { STATUS_LIST } from '../constant/fixed-data';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor() { }

  getStatusName(id: number = 0) {
    const statusList = STATUS_LIST;
    let statusName: String | undefined;

    statusList.forEach(s => {
      if (s.id === id) {
        statusName = s.name;
      }
    });

    return statusName;
  }
}
