import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent {

  allProducts: any
  products: any

  constructor(
    private dataService: DataService,
    public router: Router
  ) {}

  ngOnInit() {
    this.dataService.productsObservable.subscribe((products) => this.allProducts = products)
    this.retrieveProducts()
  }

  retrieveProducts() {
    let products = []

    for (let [k, v] of Object.entries({ ... localStorage })) {
      let [quantity, size, color] = v.split(',')
      
      products.push({
        quantity: Number(quantity),
        size: size,
        color: color,
        info: this.getCorrectProduct(Number(k))
      })
    }

    this.products = products
  }

  getCorrectProduct(id: any) {
    return this.allProducts.find((product: any) => {
      return product.id === parseFloat(id)
    })
  }

  setProduct(product: any) {
    this.dataService.setProduct(product)
  }

  changeQuantity(id: any, quantity: any) {
    let arr: any = localStorage.getItem(id)?.split(',')
    localStorage.setItem(id, `${quantity},${arr[1]},${arr[2]}`)
    this.retrieveProducts()
  }
  
  removeProduct(id: any) {
    localStorage.removeItem(id)
    this.retrieveProducts()
  }

}
