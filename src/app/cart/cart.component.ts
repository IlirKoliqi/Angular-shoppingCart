import {Component, OnInit} from '@angular/core';
import {CartService} from '../shared/cart.service';
import {Product} from '../shared/product.model';

@Component({
    selector: 'cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent {
    cartProducts$ = this.cartService.cartProducts$; // Observable for cart products

    constructor(private cartService: CartService) {
    }

    trackByCartProductId(index: number, cartProduct: Product) {
        return cartProduct ? cartProduct.id : undefined;
    }
}
