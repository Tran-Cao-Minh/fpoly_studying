import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productList: any;
  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.data.getProducts().subscribe(data => { this.productList = data });
  }

}
