import { Component, OnInit } from '@angular/core';
import Product from '../product';
import { KeywordsService } from '../keywords.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productList: Array<Product> = [
    {
      id: 1,
      name: 'Apple iPhone 11',
      code: 'TCM-001',
      price: 338.00,
      description: 'Dual sim, pristine, white, unlocked, 64gb',
      image: 'https://assets.thebigphonestore.co.uk/storage/20022/responsive-images/GBt1ACZy1vfliaEdt6bQQaWnecMRxwEm6LMP2evm___thumb_webp_140_191.webp',
      date: 'March 19, 2016',
      starRate: 3.2
    },
    {
      id: 2,
      name: 'Samsung Galaxy Note 8',
      code: 'TCM-002',
      price: 204.99,
      description: 'Single sim, pristine, midnight black, unlocked, 64gb',
      image: 'https://assets.thebigphonestore.co.uk/storage/1877/responsive-images/Galaxy-Note-8___thumb_webp_140_145.webp',
      date: 'March 18, 2016',
      starRate: 3.5
    },
    {
      id: 3,
      name: 'Oppo Reno 5G',
      code: 'TCM-003',
      price: 179.00,
      description: 'Single sim, pristine, ocean green, unlocked, 256gb',
      image: 'https://assets.thebigphonestore.co.uk/storage/25980/responsive-images/l0fQMeMIQmmlJR3uwruEdnWmi4tWnzyi3UceHddO___thumb_webp_140_184.webp',
      date: 'May 21, 2016',
      starRate: 3.5
    },
    {
      id: 4,
      name: 'Apple Watch Series 6 GPS',
      code: 'TCM-004',
      price: 290.00,
      description: '44mm, pristine, blue aluminium/ navy',
      image: 'https://assets.thebigphonestore.co.uk/storage/28197/responsive-images/ehtpJJMci0j8RFMoIwm0VvIHmuzEXsubnRWpWTw4___thumb_webp_140_159.webp',
      date: 'May 15, 2016',
      starRate: 3.3
    },
    {
      id: 5,
      name: 'Samsung Gear S2 Bluetooth SM-R720',
      code: 'TCM-005',
      price: 99.99,
      description: '42mm, pristine, dark gray',
      image: 'https://assets.thebigphonestore.co.uk/storage/12953/responsive-images/Zkg5VSR0zbLtWmZD45ZxLpAVbzaSohGLEzWn1E0l___thumb_webp_140_191.webp',
      date: 'October 15, 2015',
      starRate: 3.2
    },
    {
      id: 6,
      name: 'Apple iPad Air 3 10.5" Wi-Fi (2019)',
      code: 'TCM-006',
      price: 320.00,
      description: 'Very good, silver, 64gb',
      image: 'https://assets.thebigphonestore.co.uk/storage/26701/responsive-images/c5yVtB0iFq0yt8HWsh6y4mlW0WWxY5ILBOozn8k0___thumb_webp_140_155.webp',
      date: 'August 14, 2014',
      starRate: 3.8
    },
  ];
  constructor(private keywordsService: KeywordsService) { }

  keywords: string = '';
  subscription: Subscription = new Subscription();

  filterProductList: Array<Product> = [];
  ngOnInit(): void {
    this.filterProductList = this.productList;
    this.subscription = this.keywordsService.currentKeywords.subscribe(keywords => {
      this.keywords = keywords;
      this.filterProduct();
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe;
  }

  filterProduct(): void {
    console.log(this.keywords);

    this.filterProductList = this.productList.filter(p => {
      return p.name.toLowerCase().includes(this.keywords.toLowerCase())
    });
  }

  isShowImage: boolean = true;
  toggleImageStatus(): void {
    this.isShowImage = !this.isShowImage;
  }
}
