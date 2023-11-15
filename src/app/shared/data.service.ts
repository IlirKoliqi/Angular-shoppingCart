import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product.model';
import {delay, map, Subject} from 'rxjs';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private api:string = 'https://my-json-server.typicode.com/jubs16/Products/Products';
  isFetching = new Subject<boolean>()
  constructor(private http: HttpClient, private productService: ProductService) {}

    fetchProducts() {
        if (this.productService.getProductsLength() === 0) {
            this.isFetching.next(true);

            this.http
                .get<Product[]>('/assets/products.json')
                .pipe(
                    delay(1000),
                    map((products) => products.map((product) => ({ ...product, id: this.generateRandomId(), quantity: 0 })))
                )
                .subscribe(
                    (modifiedProducts) => {
                        this.productService.setProducts(modifiedProducts);
                        this.isFetching.next(false);
                    },
                    (error) => {
                        console.error('Product fetching error', error);
                        this.isFetching.next(false);
                    }
                );
        }
    }

  generateRandomId() {
    return Math.floor(Math.random() * 1000000) + 1;
  }
}
