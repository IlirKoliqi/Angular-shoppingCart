import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CartService} from 'src/app/shared/cart.service';
import {Product} from 'src/app/shared/product.model';
import {ProductService} from 'src/app/shared/product.service';

@Component({
    selector: 'product-item',
    templateUrl: './product-item.component.html',
    styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
    @Input() product: Product;
    @Output() selectedProduct: EventEmitter<Product> = new EventEmitter<Product>()

    constructor(private cartService: CartService, private productService: ProductService) {
    }

    addToCart(product: Product) {
        product.quantity += 1;
        this.cartService.addToCart({...product});

    }

    addQuantity(productId: number) {
        this.productService.addQuantity(productId)
        this.cartService.addQuantity(productId)
    }

    removeQuantity(productId: number) {
        this.productService.removeQuantity(productId)
        this.cartService.removeQuantity(productId)
    }

    onSelectedProduct(product: Product) {
        this.selectedProduct.emit(product)
    }


}
