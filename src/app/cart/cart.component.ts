import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent {

  allProducts: any
  products: any

  constructor(
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.dataService.productsObservable.subscribe((products) => this.allProducts = products)
    this.retrieveProducts()
    console.log(this.products)
  }

  retrieveProducts() {
    let local = { ... localStorage }
    let products = []

    for (let [k, v] of Object.entries(local)) {
      products.push({
        quantity: parseFloat(v),
        info: this.getCorrectProduct(parseFloat(k))
      })
    }

    this.products = products
  }

  getCorrectProduct(id: number) {
    return this.allProducts.find((product: any) => {
      return product.id === id
    })
  }

  setProduct(product: any) {
    this.dataService.setProduct(product)
  }

  changeQuantity(id: any, quantity: any) {
    localStorage.setItem(id, quantity)
    this.retrieveProducts()
  }
  
  removeProduct(id: any) {
    localStorage.removeItem(id)
    this.retrieveProducts()
  }

}
