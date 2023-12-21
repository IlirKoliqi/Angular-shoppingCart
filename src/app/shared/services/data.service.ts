import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { BehaviorSubject, delay, map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    private api: string = 'https://my-json-server.typicode.com/jubs16/Products/Products';
    isFetching = new BehaviorSubject<boolean>(true)

    constructor(private http: HttpClient) {
    }

    fetchProducts() {
        return this.http.get<Product[]>('assets/products.json').pipe(
            delay(1000),
            map((products) => products.map((product) => ({...product, id: this.generateRandomId(), quantity: 0})))
        )
    }

    generateRandomId() {
        return Math.floor(Math.random() * 1000000) + 1;
    }
}
