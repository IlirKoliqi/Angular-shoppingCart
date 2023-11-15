import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/shared/cart.service';
import { Product } from 'src/app/shared/product.model';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent  {
  @Input() cartProduct:Product;

  constructor(private cartService: CartService, private productService: ProductService){}


  addQuantity(id:number){
    this.cartService.addQuantityToProduct(id)
    this.productService.addQuantity(id)
  }

  removeQuantity(id:number){
    this.cartService.removeQuantityFromProduct(id)
    this.productService.removeQuantity(id)
  }


}
