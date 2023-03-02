import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent {

  urls = [{
    name: 'home',
    url: '/'
  }]

  categories: any
  brands: any

  constructor(
    private dataService: DataService,
    private appComponent: AppComponent
  ) {}

  ngOnInit() {
    this.importData()
  }

  importData() {
    this.dataService.categoriesObservable.subscribe((categories) => this.categories = categories)
    this.dataService.brandsObservable.subscribe((brands) => this.brands = brands)
  }

  setProducts(a: any) {
    this.appComponent.setProducts(a)
  }

  filterProductsByCategory(id: number) {
    this.appComponent.filterProductsByCategory(id)
  }
  
  filterProductsByBrand(id: number) {
    this.appComponent.filterProductsByBrand(id)
  }

  onClickCategory(id: number) {
    if (id === 0) {
      this.appComponent.resetProducts()
    } else {
      this.filterProductsByCategory(id)
    }
  }

  onClickBrand(id: number) {
    if (id === 0) {
      this.appComponent.resetProducts()
    } else {
      this.filterProductsByBrand(id)
    }
  }

}