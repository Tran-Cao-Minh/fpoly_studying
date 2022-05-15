import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Product from '../product';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  constructor(
    private productsService: ProductsService,
    private router: Router,
  ) { }
  product: Product = <Product>{};
  addProduct() {
    this.productsService.addProduct(this.product);
    this.router.navigate(['/admin/product']);
  }

  ngOnInit(): void {
  }

}
