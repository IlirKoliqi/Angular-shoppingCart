import { Component, OnInit } from '@angular/core';
import { CartService } from '../shared/cart.service';
import { Product } from '../shared/product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartProducts:Product[] = [];
  private cartProductsSubscription: Subscription;

  constructor(private cartService: CartService){}

  ngOnInit() {
    this.cartProductsSubscription = this.cartService.cartProducts$.subscribe(products =>{
      this.cartProducts = products
    })
  }

  ngOnDestroy() {
    if (this.cartProductsSubscription) {
      this.cartProductsSubscription.unsubscribe();
    }
  }
}
