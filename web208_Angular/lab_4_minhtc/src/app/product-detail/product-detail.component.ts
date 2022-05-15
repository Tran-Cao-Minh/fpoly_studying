import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';
import Product from '../product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) { }

  productId: number = Number(this.route.snapshot.params['id']);
  product = <Product>{};

  ngOnInit(): void {
    if (this.productId < 0) return;
    const result = this.productsService.getProduct(this.productId);

    if (result === null) {
      this.product = {} as Product;
    } else {
      this.product = result as Product;
    }
  }

}
