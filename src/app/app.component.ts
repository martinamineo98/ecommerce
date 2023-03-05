import { Component } from '@angular/core';
import { DataService } from './data.service';

/* Import .json files */

import productsData from '../assets/json/products.json';
import data from '../assets/json/data.json';

interface Product {
  id: number,
  name: string,
  description: string,
  price: number,
  brand: number,
  categories: any[],
  colors: any[],
  sizes: any[],
  quantity: number,
  image: string,
  all_images: any[]
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
  colors = data.colors
  sizes = data.sizes

  constructor(
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.setProducts(this.products)
    this.setCategories(this.categories)
    this.setBrands(this.brands)
    this.setColors(this.colors)
    this.setSizes(this.sizes)
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

  setColors(a: any) {
    this.dataService.setColors(a)
  }

  setSizes(a: any) {
    this.dataService.setSizes(a)
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