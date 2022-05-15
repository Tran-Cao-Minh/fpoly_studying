import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class KeywordsService {
  private keywordsSource = new BehaviorSubject('');
  currentKeywords = this.keywordsSource.asObservable();

  constructor() { }

  changeKeywords(keywords: string) {
    this.keywordsSource.next(keywords);
  }

}