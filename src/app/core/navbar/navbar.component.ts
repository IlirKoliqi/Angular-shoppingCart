import {Component, OnDestroy, OnInit,} from '@angular/core';
import {CartService} from '../../shared/cart.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
    cartLength$ = this.cartService.cartLengthSubject
    showNewProductForm: boolean = false;

    constructor(private cartService: CartService) {
    }

    onOpenNewProductFormModal() {
        this.showNewProductForm = true;
    }

    onCloseNewProductForm() {
        this.showNewProductForm = false;
    }

}

