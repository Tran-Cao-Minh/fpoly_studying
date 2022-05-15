import { Component, OnInit } from '@angular/core';
import Product from '../product';
import { ProductsService } from '../products.service';
@Component({
  selector: 'app-product-list-admin',
  templateUrl: './product-list-admin.component.html',
  styleUrls: ['./product-list-admin.component.css']
})
export class ProductListAdminComponent implements OnInit {
  constructor(
    private productsService: ProductsService
  ) { }
  products: Array<Product> = [];

  ngOnInit(): void {
    this.products = this.productsService.getProducts();
  }

  deleteProduct(id: number = 0) {
    this.productsService.deleteProduct(id);
    return false;
  }
}
