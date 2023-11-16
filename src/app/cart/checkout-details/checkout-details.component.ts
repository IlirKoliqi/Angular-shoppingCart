import {Component, OnInit} from '@angular/core';
import {CartService} from 'src/app/shared/cart.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'checkout-details',
    templateUrl: './checkout-details.component.html',
    styleUrls: ['./checkout-details.component.css'],
})
export class CheckoutDetailsComponent {
    totalQuantity$ = this.cartService.totalQuantitySubject;
    totalPrice$ = this.cartService.totalPriceSubject;

    constructor(private cartService: CartService) {
    }


}
