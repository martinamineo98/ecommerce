
/* Modules */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Components for Routing */

import { ProductListComponent } from './product-list/product-list.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { CartComponent } from './cart/cart.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'product', component: ProductPageComponent },
  { path: 'cart', component: CartComponent },
  { path: 'user', component: UserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
