import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../shared/product.model';
import { DataService } from '../shared/data.service';
import { Subscription } from 'rxjs';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy {
  products:Product[] = [];
  selectedProduct:Product | null;
  private productsSubscription: Subscription;
  constructor(private productService: ProductService,private dataService: DataService){}

  ngOnInit() {
    this.fakeDataFetching();
  }
  fakeDataFetching() {
    setTimeout(() => {
      this.productsSubscription = this.productService.products$.subscribe(products => {
        this.products = products;
      });
      this.dataService.fetchProducts();
    }, 500);


  }

  onSelectedProduct(product:Product){
    this.selectedProduct = product
  }

  onCloseProductDetails(){
    this.selectedProduct = null
  }

  ngOnDestroy() {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }
}
