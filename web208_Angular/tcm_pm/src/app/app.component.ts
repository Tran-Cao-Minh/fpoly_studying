import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from './employee';
import { KeywordsService } from './keywords.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  keywords: string = '';
  subscription!: Subscription;

  constructor(
    private router: Router,
    private keywordsService: KeywordsService,
  ) { }
  ngOnInit(): void {
    this.subscription
      = this.keywordsService.currentKeywords.subscribe(keywords => this.keywords = keywords);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe;
  }

  showSearchResult() {
    this.keywordsService.changeKeywords(this.keywords);

    if (this.router.routerState.snapshot.url !== '/search-result') {
      this.router.navigate(['/search-result']);
    }
  }

  fnName: string = '';
  recordFn(fnName: string = '') {
    this.fnName = fnName;
  }

  membersByArea: Array<{ name: string, members: Array<Employee> }> = [
    {
      name: 'East',
      members: [
        {
          id: 1,
          lastName: 'Tran Cao',
          firstName: 'Minh',
        },
      ],
    },
    {
      name: 'West',
      members: [
        {
          id: 2,
          lastName: 'Le Vinh',
          firstName: 'Ky',
        },
      ],
    },
    {
      name: 'South',
      members: [
        {
          id: 3,
          lastName: 'Nguyen Quang',
          firstName: 'Vu',
        },
      ],
    },
    {
      name: 'North',
      members: [
        {
          id: 4,
          lastName: 'Le Van',
          firstName: 'Duong',
        },
        {
          id: 5,
          lastName: 'Nguyen Thanh',
          firstName: 'Phong',
        },
      ]
    }
  ];

  statisticsInf: Array<{ name: string, inf: string }> = [
    {
      name: 'Project Quantity',
      inf: '21',
    },
    {
      name: 'Total Count',
      inf: '$ 2480K',
    },
    {
      name: 'Handled Task Quantity',
      inf: '14',
    },
    {
      name: 'Members Quantity',
      inf: '5'
    },
  ];
}
