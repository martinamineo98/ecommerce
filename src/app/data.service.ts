import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartComponent } from './cart/cart.component';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  private product = new BehaviorSubject<any>('')
          productObservable = this.product.asObservable()

  private products = new BehaviorSubject<any>('')
          productsObservable = this.products.asObservable()

  private categories = new BehaviorSubject<any>('')
          categoriesObservable = this.categories.asObservable()

  private brands = new BehaviorSubject<any>('')
          brandsObservable = this.brands.asObservable()

  private colors = new BehaviorSubject<any>('')
          colorsObservable = this.colors.asObservable()

  private sizes = new BehaviorSubject<any>('')
          sizesObservable = this.sizes.asObservable()

  setProduct(a: any) {
    this.product.next(a)
  }

  setProducts(a: any) {
    this.products.next(a)
  }

  setCategories(a: any) {
    this.categories.next(a)
  }

  setBrands(a: any) {
    this.brands.next(a)
  }

  setColors(a: any) {
    this.colors.next(a)
  }

  setSizes(a: any) {
    this.sizes.next(a)
  }

}
