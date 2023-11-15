import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products:Product[] = [];

  private productsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  products$: Observable<Product[]> = this.productsSubject.asObservable();
  constructor() {}

  setProducts(products:Product[]){
    this.products = products
    this.productsSubject.next(this.products.slice());
  }

  addProduct(product:Product){
    product.id = this.generateRandomId();
    product.quantity = 0
    this.products.unshift(product)
    this.productsSubject.next(this.products.slice());
  }

  addQuantity(productId: number) {
    const productInProducts = this.products.find((p) => p.id === productId);

    if (productInProducts) {
      productInProducts.quantity += 1;
      this.productsSubject.next(this.products.slice());
    }
  }

  removeQuantity(productId: number) {
    const productInProducts = this.products.find((p) => p.id === productId);

    if (productInProducts) {
      productInProducts.quantity -= 1;
      this.productsSubject.next(this.products.slice());
    }
  }

  getProductsLength() {
    return this.products.length;
  }

  generateRandomId() {
    return Math.floor(Math.random() * 1000000) + 1;
  }
}
