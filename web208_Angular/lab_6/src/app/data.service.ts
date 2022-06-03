import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private _http: HttpClient
  ) { }

  getProducts() {
    return this._http.get('http://localhost:3000/product');
  }

  addProduct(product: any) {
    return this._http.post('http://localhost:3000/product', product);
  }

  updateProduct(product: any) {
    return this._http.put(`http://localhost:3000/product/${product.id}`, product);
  }

  deleteProduct(id: number) {
    return this._http.delete(`http://localhost:3000/product/${id}`);
  }
}
