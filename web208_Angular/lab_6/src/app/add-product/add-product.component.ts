import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(
    private _data: DataService,
  ) { }

  ngOnInit(): void {
  }

  addProduct(product: any) {
    const productName = product.name;
    const productPrice = product.price;
    console.log(productName, productPrice);

    this._data.addProduct(product).subscribe(data => {
      console.log(data);
      alert('Add product success');
    });
  }

}
