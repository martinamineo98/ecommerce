import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  private products = new BehaviorSubject<any>('')
          productsObservable = this.products.asObservable()

  private categories = new BehaviorSubject<any>('')
          categoriesObservable = this.categories.asObservable()

  private brands = new BehaviorSubject<any>('')
          brandsObservable = this.brands.asObservable()

  setProducts(a: any) {
    this.products.next(a)
  }

  setCategories(a: any) {
    this.categories.next(a)
  }

  setBrands(a: any) {
    this.brands.next(a)
  }

}
