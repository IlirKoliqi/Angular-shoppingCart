import { Component, EventEmitter, Output } from '@angular/core';
import { Product } from '../../shared/product.model';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent  {
  @Output() closeNewProductForm: EventEmitter<void> = new EventEmitter<void>();
  constructor(private productService: ProductService){}


  create(product: Product){
    this.productService.addProduct(product)
    this.onCloseNewProdModal();
  }

  onCloseNewProdModal(){
    this.closeNewProductForm.emit()
  }

  onBackdropClick(event: Event) {
    if (event.target === event.currentTarget) {
      this.onCloseNewProdModal();
    }
  }

}
