import { Injectable } from '@angular/core';
import { AREA_LIST } from '../constant/fixed-data';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  constructor() { }

  getAreaName(id: number = 0) {
    const areaList = AREA_LIST;
    let areaName: String | undefined;

    areaList.forEach(a => {
      if (a.id === id) {
        areaName = a.name;
      }
    });

    return areaName;
  }
}
