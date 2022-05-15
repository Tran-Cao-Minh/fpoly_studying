import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import Product from '../product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  constructor(private productsService: ProductsService) { }

  products: Array<Product> = [];
  ngOnInit(): void {
    this.products = this.productsService.getProducts();
  }
}
