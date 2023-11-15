import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { map } from 'rxjs';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private api:string = 'https://my-json-server.typicode.com/jubs16/Products/Products';
  constructor(private http: HttpClient, private productService: ProductService) {}

  fetchProducts() {
    if (this.productService.getProductsLength() === 0) {
      this.http
          .get<Product[]>('/assets/products.json')
          .pipe(
              map((products) => products.map((product) => ({ ...product, id: this.generateRandomId(), quantity: 0 })))
          )
          .subscribe(
              (modifiedProducts) => {
                this.productService.setProducts(modifiedProducts);
              },
              (error) => {
                console.error('Product fetching error', error);
              }
          );
    }
  }

  generateRandomId() {
    return Math.floor(Math.random() * 1000000) + 1;
  }
}
