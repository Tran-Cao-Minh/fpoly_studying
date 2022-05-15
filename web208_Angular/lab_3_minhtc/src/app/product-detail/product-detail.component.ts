import { Component, Input, OnInit } from '@angular/core';
import Product from '../product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  @Input() product: Product | null = {
    id: 0,
    name: '',
    code: '',
    price: 0,
    description: '',
    image: '',
    date: '',
    starRate: 0,
  };

  constructor() {}

  ngOnInit(): void {}
}
