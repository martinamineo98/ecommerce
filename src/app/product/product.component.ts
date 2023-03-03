import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../data.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent {

  @Input() product: any

  constructor(
    private dataService: DataService,
    public router: Router
  ) {}

  setProduct(product: any) {
    this.dataService.setProduct(product)
  }

}
