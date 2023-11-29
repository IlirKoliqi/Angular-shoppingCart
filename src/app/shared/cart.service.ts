import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable } from 'rxjs';
import {Product} from './product.model';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    totalQuantitySubject = new BehaviorSubject<number>(0);
    totalPriceSubject = new BehaviorSubject<number>(0);
    cartLengthSubject = new BehaviorSubject<number>(0);

    private cartProducts: Product[] = [];

    private cartProductsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
    cartProducts$: Observable<Product[]> = this.cartProductsSubject.asObservable();

    addToCart(product: Product) {
        this.cartProducts.push(product)
        this.cartProductsSubject.next(this.cartProducts.slice())
        this.updateTotalQuantity();
        this.updateTotalCartPrice();
        this.updateCartLength();
    }

    addQuantity(productId: number) {
        const cartProduct = this.cartProducts.find((cp) => cp.id === productId);
        if (cartProduct) {
            cartProduct.quantity += 1;
            this.updateTotalQuantity();
            this.updateTotalCartPrice();
        }
    }

    removeQuantity(productId: number) {
        const cartProduct = this.cartProducts.find((cp) => cp.id === productId);
        if (cartProduct) {
            cartProduct.quantity -= 1;

            if (cartProduct.quantity <= 0) {
                this.removeProductsIfQuantityZero();
                this.updateCartLength();
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
    updateCartLength() {
        const cartLength = this.cartProducts.length;
        this.cartLengthSubject.next(cartLength);
    }

}

