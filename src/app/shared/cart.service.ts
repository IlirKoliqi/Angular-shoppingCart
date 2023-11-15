import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  totalQuantitySubject:Subject<number> = new Subject<number>();
  totalPriceSubject:Subject<number> = new Subject<number>();

  private  cartProducts:Product[] = [];

  private cartProductsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  cartProducts$: Observable<Product[]> = this.cartProductsSubject.asObservable();

  addToCart(product:Product){
    // const productAdded:Product = { ...product, quantity: 1 };
    this.cartProducts.push(product)
    this.cartProductsSubject.next(this.cartProducts.slice())
    this.updateTotalQuantity();
    this.updateTotalCartPrice();
  }

  addQuantityToProduct(productId: number) {
    const cartProduct = this.cartProducts.find((cp) => cp.id === productId);
    if (cartProduct) {
      cartProduct.quantity += 1;
      this.updateTotalQuantity();
      this.updateTotalCartPrice();
    }
  }

  removeQuantityFromProduct(productId: number) {
    const cartProduct = this.cartProducts.find((cp) => cp.id === productId);
    if (cartProduct) {
      cartProduct.quantity -= 1;

      if(cartProduct.quantity <= 0){
        this.removeProductsIfQuantityZero();
      }
      this.updateTotalQuantity();
      this.updateTotalCartPrice();
    }
  }

  updateTotalQuantity() {
    const total = this.cartProducts.reduce(
        (sum, product) => {
          return sum + product.quantity;
        },
        0
    );
    this.totalQuantitySubject.next(total);
  }

  updateTotalCartPrice() {
    const total = this.cartProducts.reduce((sum, product) => {
      return sum + product.price * product.quantity;
    }, 0);

    this.totalPriceSubject.next(total);
  }

  removeProductsIfQuantityZero() {
    this.cartProducts = this.cartProducts.filter((product) => product.quantity > 0);
    this.cartProductsSubject.next(this.cartProducts.slice());
  }

}

