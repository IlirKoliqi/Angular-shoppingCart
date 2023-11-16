import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Product} from './product.model';
import {DataService} from "./data.service";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private products: Product[] = [];

    private productsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
    products$: Observable<Product[]> = this.productsSubject.asObservable();

    constructor(private dataService: DataService) {
    }

    setProducts(products: Product[]) {
        this.products = products
        this.productsSubject.next(this.products.slice());
    }

    addProduct(product: Product) {
        product.id = this.dataService.generateRandomId();
        product.quantity = 0
        this.products.unshift(product)
        this.productsSubject.next(this.products.slice());
    }

    addQuantity(productId: number) {
        const productInProducts = this.products.find((p) => p.id === productId);

        if (productInProducts) {
            productInProducts.quantity += 1;
        }
    }

    removeQuantity(productId: number) {
        const productInProducts = this.products.find((p) => p.id === productId);

        if (productInProducts) {
            productInProducts.quantity -= 1;
        }
    }

    getProductsLength() {
        return this.products.length;
    }

}
