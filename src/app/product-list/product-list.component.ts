import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent {

  p: number = 1
  products: any[] = []

  constructor(
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.dataService.productsObservable.subscribe((products) => this.products = products)
  }

}
