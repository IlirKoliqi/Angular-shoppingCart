import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../shared/product.model';
import {DataService} from '../shared/data.service';
import {delay, map, Subscription} from 'rxjs';
import {ProductService} from '../shared/product.service';

@Component({
    selector: 'products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
    products: Product[] = [];
    selectedProduct: Product | null;
    private productsSubscription: Subscription;

    constructor(private productService: ProductService, private dataService: DataService) {
    }

    ngOnInit() {
        if (this.productService.getProductsLength() === 0) this.loadData();

        this.productsSubscription = this.productService.products$.subscribe(products => {
            this.products = products;
        });

    }

    loadData() {
        this.dataService.fetchProducts().subscribe(
            (modifiedProducts) => {
                this.productService.setProducts(modifiedProducts);
                this.dataService.isFetching.next(false)
            },
            (error) => {
                console.error('Product fetching error', error);

            }
        );
    }

    onSelectedProduct(product: Product) {
        this.selectedProduct = product
    }

    onCloseProductDetails() {
        this.selectedProduct = null
    }

    trackByProductId(index: number, product: Product) {
        return product ? product.id : undefined;
    }


    ngOnDestroy() {
        if (this.productsSubscription) {
            this.productsSubscription.unsubscribe();
        }
    }
}
