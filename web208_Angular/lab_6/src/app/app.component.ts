import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  product: any;

  assignProduct(product: any) {
    this.product = product;
    console.log(this.product);
  }
}
