import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  constructor(private _data: DataService) { }

  ngOnInit(): void {
  }

  @Input() product: any;

  updateProduct(product: any) {
    this._data.updateProduct(product).subscribe(data => {
      alert('Update product successfully');
      console.log('Update: ', data);
    })
  }

}
