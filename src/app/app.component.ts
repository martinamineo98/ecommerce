import { Component } from '@angular/core';
import productsData from '../assets/json/products.json';
import data from '../assets/json/data.json';
import { DataService } from './data.service';

interface Product {
  id: number,
  name: string,
  price: number,
  brand: number,
  categories: any[],
  colors: any[],
  sizes: any[],
  quantity: number,
  image: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  title: string = 'ecommerce'
  products: Product[] = productsData
  categories = data.categories
  brands = data.brands

  constructor(
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.setProducts(this.products)
    this.setCategories(this.categories)
    this.setBrands(this.brands)
  }

  setProducts(a: any) {
    this.dataService.setProducts(a)
  }

  setCategories(a: any) {
    this.dataService.setCategories(a)
  }

  setBrands(a: any) {
    this.dataService.setBrands(a)
  }

  filterProductsByCategory(id: number) {
    this.setProducts(this.products.filter((product) => {
      return product.categories.includes(id)
    }))
  }

  filterProductsByBrand(id: number) {
    this.setProducts(this.products.filter((product) => {
      return product.brand === id
    }))
  }

  resetProducts() {
    this.setProducts(this.products)
  }

}