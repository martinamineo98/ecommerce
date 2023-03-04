import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from '../data.service';

import { AppComponent } from '../app.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent {

  products: any[] = []
  categories: any[] = []
  brands: any[] = []

  form = new FormGroup({
    cat: new FormControl(''),
    str: new FormControl('')
  })

  constructor(
    private dataService: DataService,
    private appComponent: AppComponent
  ) {}

  ngOnInit() {
    this.dataService.productsObservable.subscribe((products) => this.products = products)
    this.dataService.categoriesObservable.subscribe((categories) => this.categories = categories)
    this.dataService.brandsObservable.subscribe((brands) => this.brands = brands)
  }

  search(e: any) {
    e.preventDefault()

    let cat = this.form.value.cat?.toLocaleLowerCase()
    let str = this.form.value.str?.toLocaleLowerCase()

    this.appComponent.resetProducts()
    this.dataService.setProducts(this.itContains(cat, str))
  }
  
  itContains(cat: any, str: any) {
    let foundProducts: any[] = []

    function pushElement(element: any, statement: boolean) {
      statement ? foundProducts.push(element) : null
    }

    for (let product of this.products) {
      for (let [k, value] of Object.entries(product)) {

        // fix unknown type error for value

        let v: any = value

        // ... first I need to check if k and cat are the same

        // why a switch here ?
        // summary: I don't know how to do it better

        // name in product.json is a string
        // brand in product.json is a number
        // categories in product.json is an array

        // in the case of name, I need to check if the string contains 'str'
        // in the case of brand, I need to transform that number into a string (from data.json) and check if it contains the searched str
        // in the case of categories, I need to transform each number into the array into a string (from data.json) and check if one of these contains the searched str

        if (k === cat) {

          switch (cat) {
            case 'name':
              pushElement(product, product[cat].includes(str))
              break
            
            case 'brand':
              pushElement(product, this.brands[product[cat]].name.includes(str))
              break
  
            case 'categories':
              for (let element of product[cat]) {
                pushElement(product, this.categories[element].name.includes(str))
              }
              break
          }

        }

      }
    }

    return foundProducts
  }

}
