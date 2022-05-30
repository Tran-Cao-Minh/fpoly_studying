import { Component, OnInit } from '@angular/core';
import { KeywordsService } from '../services/keywords.service';
import { Subscription } from 'rxjs';
import { SearchItem } from '../search-item';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  constructor(
    private keywordsService: KeywordsService
  ) { }

  keywords: string = '';
  subscription: Subscription = new Subscription();
  filterItems: Array<SearchItem> = [];

  ngOnInit(): void {
    this.keywordsService.getItemsByKeywords('').then(result => {
      this.filterItems = result;
    });

    this.subscription = this.keywordsService.currentKeywords.subscribe(keywords => {
      this.keywords = keywords;
      this.filterProduct();
    });
  }

  filterProduct(): void {
    this.keywordsService.getItemsByKeywords(this.keywords).then(result => {
      this.filterItems = result;
    });
  }
}
