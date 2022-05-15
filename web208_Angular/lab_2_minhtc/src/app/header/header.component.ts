import { Component, OnInit } from '@angular/core';
import { KeywordsService } from '../keywords.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  keywords: string = '';
  subscription!: Subscription;

  constructor(private keywordsService: KeywordsService) { }

  ngOnInit(): void {
    this.subscription
      = this.keywordsService.currentKeywords.subscribe(keywords => this.keywords = keywords);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe;
  }

  setNewKeywords() {
    this.keywordsService.changeKeywords(this.keywords);
  }

}
