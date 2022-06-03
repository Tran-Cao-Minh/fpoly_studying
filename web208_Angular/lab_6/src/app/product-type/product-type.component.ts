import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.css']
})
export class ProductTypeComponent implements OnInit {
  typeList: any;
  constructor(
    private _http: HttpClient
  ) { }

  ngOnInit(): void {
    this._http.get('http://localhost:3000/productType').subscribe(data => {
      this.typeList = data;
      console.log('Product type: ', data);
    })
  }

}
