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
  }

  search(e: any) {
    e.preventDefault()

    let cat = this.form.value.cat?.toLocaleLowerCase()
    let str = this.form.value.str?.toLocaleLowerCase()

    this.appComponent.resetProducts()
    this.dataService.setProducts(this.itContains(cat, str))
  }
  
  itContains(cat: any, str: any) {
    let foundProducts = []

    for (let product of this.products) {
      for (let [k, value] of Object.entries(product)) {
        if (k === cat) {

          // fix to unknown type error again
          let v: any = value

          if (v.toLowerCase().includes(str)) {
            foundProducts.push(product)
          }
        }
      }
    }

    return foundProducts
  }

}
