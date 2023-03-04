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

/*   reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
    this.router.onSameUrlNavigation = 'reload'
    this.router.navigate(['/cart'])
  } */

  retrieveProducts() {
    let local = { ... localStorage }
    let products = []

    for (let [k, v] of Object.entries(local)) {
      products.push({ quantity: v, info: this.getCorrectProduct(parseFloat(k)) })
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
