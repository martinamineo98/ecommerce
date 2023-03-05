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

    for (let [k, v] of Object.entries(localStorage)) {

      let obj = JSON.parse(v)
          obj.product = this.getCorrectProduct(obj.id)
          obj.identification = k
      delete obj.id

      products.push(obj)
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

  changeQuantity(identification: any, quantity: any) {
    let obj = JSON.parse(localStorage.getItem(identification) || '{}')
        obj.quantity = quantity
    localStorage.setItem(identification, JSON.stringify(obj))
    this.retrieveProducts()
  }

  removeProduct(identification: any) {
    localStorage.removeItem(identification)
    this.retrieveProducts()
  }

}
