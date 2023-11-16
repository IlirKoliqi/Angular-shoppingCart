import {Component, OnInit} from '@angular/core';
import {Product} from '../shared/product.model';
import {DataService} from '../shared/data.service';
import {ProductService} from '../shared/product.service';
import {Observable} from "rxjs";

@Component({
    selector: 'products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
    products$: Observable<Product[]> = this.productService.products$;
    selectedProduct: Product | null;

    constructor(private productService: ProductService, private dataService: DataService) {
    }

    ngOnInit() {
        if (this.productService.getProductsLength() === 0) {
            this.loadData();
        }
    }

    loadData() {
        this.dataService.fetchProducts().subscribe(
            (modifiedProducts) => {
                this.productService.setProducts(modifiedProducts);
                this.dataService.isFetching.next(false);
            },
            (error) => {
                console.error('Product fetching error', error);
            }
        );
    }

    onSelectedProduct(product: Product) {
        this.selectedProduct = product;
    }

    onCloseProductDetails() {
        this.selectedProduct = null;
    }

    trackByProductId(index: number, product: Product) {
        return product ? product.id : undefined;
    }
}
