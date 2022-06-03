import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productList: any;
  constructor(private _data: DataService) { }

  ngOnInit(): void {
    this._data.getProducts().subscribe(data => { this.productList = data });
  }

  deleteProduct(id: number = 0) {
    if (confirm('Do you really want to delete') === true) {
      this._data.deleteProduct(id).subscribe(data => {
        console.log(data);
        alert('Delete successfully');
      })
    }
  }

  @Output() chooseProduct = new EventEmitter();
  updateProduct(product: any) {
    console.log(product);
    this.chooseProduct.emit(product);
  }
}
