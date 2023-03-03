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

  colors: any
  sizes: any

  availableColors: any
  availableSizes: any

  constructor(
    private dataService: DataService,
    public router: Router
  ) {}

  ngOnInit() {
    this.dataService.colorsObservable.subscribe((colors) => this.colors = colors)
    this.dataService.sizesObservable.subscribe((sizes) => this.sizes = sizes)
    this.availableColors = this.getProductColors()
    this.availableSizes = this.getProductSizes()
  }

  addToCart(product: any) {
    
  }

  setProduct(product: any) {
    this.dataService.setProduct(product)
  }

  getProductColors() {
    let availableColors = []

    for (let color of this.colors) {
      if (this.product.colors.includes(color.id)) {
        availableColors.push(color)
      }
    }
    
    return availableColors
  }

  getProductSizes() {
    let availableSizes = []

    for (let size of this.sizes) {
      if (this.product.sizes.includes(size.id)) {
        availableSizes.push(size)
      }
    }
    
    return availableSizes
  }

}
