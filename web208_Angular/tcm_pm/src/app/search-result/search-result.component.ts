import { Component, OnInit } from '@angular/core';
import { KeywordsService } from '../services/keywords.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  itemList = [
    {
      name: 'Pig Farm Management',
      type: 'Project',
      id: 1,
    },
    {
      name: 'Tran Cao Minh',
      type: 'Employee',
      id: 1,
    },
    {
      name: 'Requirements analysis',
      type: 'Task',
      id: 1,
    },
  ];

  constructor(
    private keywordsService: KeywordsService
  ) { }

  keywords: string = '';
  subscription: Subscription = new Subscription();
  filterItems: Array<{
    name: string,
    type: string,
    id: number,
  }> = [];

  ngOnInit(): void {
    this.filterItems = this.itemList;
    this.subscription = this.keywordsService.currentKeywords.subscribe(keywords => {
      this.keywords = keywords;
      this.filterProduct();
    });
  }

  filterProduct(): void {
    console.log(this.keywords);

    this.filterItems = this.itemList.filter(i => {
      return i.name.toLowerCase().includes(this.keywords.toLowerCase())
    });
  }
}
