import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { CartService } from './cart.service';
import { Subscription } from 'rxjs';
import { CartItem } from '../../../Models/cart';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CardModule, ButtonModule, InputNumberModule, FormsModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  subscription!: Subscription;
  subsidizedItemsCart!: CartItem[];
  pricedItemsCart!: CartItem[];
  hallName: string = "Egypt Factory - Restaurant no. 1";
  itemValue: number = 10;
  totalPrice!: any;
  
  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.getSubsidizedItems();
    this.getPricedItems();
    this.getSubsidizedCartUpdate();
    this.getPricedCartUpdate();
    this.getTotalCart();
  }


  getSubsidizedItems() {
    this.subscription = this.cartService.getItems("subsidized_cart").subscribe(items => {
      this.subsidizedItemsCart = items;
    })
  }

  getPricedItems() {
    this.subscription = this.cartService.getItems("priced_cart").subscribe(items => {
      this.pricedItemsCart = items;
    })
  }

  deleteItem(id: number, type: string){
    this.subscription = this.cartService.deleteItem(id, type).subscribe(items => {
      if(type == "subsidized_cart")
        this.getSubsidizedItems();
      else 
        this.getPricedItems();

    })
  }

  getSubsidizedCartUpdate() {
    this.subscription = this.cartService.subsidizedCartSubject.subscribe(() => {
      this.getSubsidizedItems();
    });
  }

  getPricedCartUpdate() {
    this.subscription = this.cartService.pricedCartSubject.subscribe(() => {
      this.getPricedItems();
    });
  }

  getTotalCart() {
    this.cartService.getTotalPrice().subscribe(value => {
      this.totalPrice = value.value;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
