import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})

export class ProductPageComponent {

  product: any

  constructor(
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.dataService.productObservable.subscribe((product) => this.product = product)
  }

}
