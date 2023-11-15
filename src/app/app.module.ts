import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { ProductItemComponent } from './products/product-item/product-item.component';
import { CartItemComponent } from './cart/cart-item/cart-item.component';
import { CheckoutDetailsComponent } from './cart/checkout-details/checkout-details.component';
import { NewProductComponent } from './modals/new-product/new-product.component';
import { ProductDetailsComponent } from './modals/product-details/product-details.component';
import { LoaderComponent } from './core/loader/loader.component';
import {AppRoutingModule} from "./app-routing.module";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductsComponent,
    CartComponent,
    ProductItemComponent,
    CartItemComponent,
    CheckoutDetailsComponent,
    NewProductComponent,
    ProductDetailsComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
