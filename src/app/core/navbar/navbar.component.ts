import { Component, OnDestroy, OnInit, } from '@angular/core';
import { CartService } from '../../shared/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit,OnDestroy {
  totalQuantity: number = 0;
  showNewProductForm: boolean = false;
  private totalQuantitySubscription: Subscription;

  constructor(private cartService: CartService){}

  onOpenNewProductFormModal(){
    this.showNewProductForm = true;
  }
  onCloseNewProductForm() {
    this.showNewProductForm = false;
  }

  ngOnInit() {
    this.totalQuantitySubscription = this.cartService.totalQuantitySubject.subscribe(quantity => {
      this.totalQuantity = quantity;
    });
  }
  ngOnDestroy() {
    if (this.totalQuantitySubscription) {
      this.totalQuantitySubscription.unsubscribe();
    }
  }

}

