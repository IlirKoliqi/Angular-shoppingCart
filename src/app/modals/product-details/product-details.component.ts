import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/shared/cart.service';
import { Product } from 'src/app/shared/product.model';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  @Input() product: Product | null;
  @Output() closeProductDetails: EventEmitter<void> = new EventEmitter<void>()
  selectedProductSubscription: Subscription;
  constructor( private cartService: CartService, private productService: ProductService){}

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    product.quantity = (product.quantity || 0) + 1
    console.log(product.quantity)
  }


  addQuantity(productId: number){
    this.productService.addQuantity(productId)
    this.cartService.addQuantityToProduct(productId)
  }

  removeQuantity(productId: number){
    this.productService.removeQuantity(productId)
    this.cartService.removeQuantityFromProduct(productId)
  }

  onBackdropClick(event: Event) {
    if (event.target === event.currentTarget) {
      this.closeProductDetails.emit()
    }
  }
}
