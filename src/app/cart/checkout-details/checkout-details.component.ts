import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/cart.service';

@Component({
  selector: 'checkout-details',
  templateUrl: './checkout-details.component.html',
  styleUrls: ['./checkout-details.component.css'],
})
export class CheckoutDetailsComponent implements OnInit  {
  totalQuantity = 0;
  totalPrice = 0;
  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.totalQuantitySubject.subscribe(value => {
      this.totalQuantity = value;
    });

    this.cartService.totalPriceSubject.subscribe(value => {
      this.totalPrice = value;
    });

    this.cartService.updateTotalQuantity();
    this.cartService.updateTotalCartPrice();
  }

}
