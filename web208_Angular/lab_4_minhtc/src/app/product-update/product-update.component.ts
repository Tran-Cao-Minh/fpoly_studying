import { Component, OnInit } from '@angular/core';
import Product from '../product';
import { ProductsService } from '../products.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {
  constructor(
    private productsService: ProductsService,
    private router: Router,
    private activeRoute: ActivatedRoute,
  ) { }
  productId: number = Number(this.activeRoute.snapshot.params['id']);
  product: Product = <Product>{};

  ngOnInit(): void {
    const result = this.productsService.getProduct(this.productId);
    this.product = result as Product;
  }
  updateProduct() {
    this.productsService.updateProduct(this.product);
    this.router.navigate(['/admin/product']);
  }
}
