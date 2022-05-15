import { Component } from '@angular/core';
import Product from './product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  functionName: string = '';
  currentProduct: null | Product = null;
  recordFunction(functionName: string = '') {
    this.functionName = functionName;
    if (this.functionName !== 'detail') {
      this.currentProduct = null;
    }
  }

  assignProduct(product: Product) {
    this.currentProduct = product;
    this.functionName = 'detail';
  }
}
