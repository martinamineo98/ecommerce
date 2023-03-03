
/* Modules */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Components for Routing */

import { ProductListComponent } from './product-list/product-list.component';
import { ProductPageComponent } from './product-page/product-page.component';

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'product', component: ProductPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
