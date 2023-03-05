import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

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

  availableImages: any

  productDetails = new FormGroup({
    chosenSize: new FormControl(''),
    chosenColor: new FormControl('')
  })

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

  onClick(index: any) {
    this.product.image = this.product.all_images[index]
  }

  addToCart(id: any) {

    const options = Array.from(document.querySelectorAll('.toSelect'))
    
    if ( this.productDetails.value.chosenColor === '' || this.productDetails.value.chosenSize === '' ) {
      options.map((item) => item.classList.add('isRequired'))

      // remove class after 5 seconds

      setTimeout(() => {
        options.map((item) => item.classList.remove('isRequired'))
      }, 5000)

      return
    }

    const obj = {
      id: this.product.id,
      size: this.productDetails.value.chosenSize,
      color: this.productDetails.value.chosenColor,
      quantity: 1
    }

    const identification = `${this.product.name}__${obj.size}__${obj.color}`

    if (!localStorage.getItem(identification)) {
      localStorage.setItem(identification, JSON.stringify(obj))
    }

    this.product.image = this.product.all_images[0]
    this.router.navigate(['/cart'])
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
