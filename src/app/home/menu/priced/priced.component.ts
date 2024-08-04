import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { FieldsetModule } from 'primeng/fieldset';
import { ImageModule } from 'primeng/image';
import { PricedService } from './priced.service';
import { CommonModule } from '@angular/common';
import { Item, MealItemType } from '../../../Models/item';
import { Subscription } from 'rxjs';
import { CartItem } from '../../../Models/cart';
import { CartService } from '../../cart/cart.service';

@Component({
  selector: 'app-priced',
  standalone: true,
  imports: [ButtonModule, ToastModule, FieldsetModule, ImageModule, CommonModule],
  templateUrl: './priced.component.html',
  styleUrl: './priced.component.scss'
})
export class PricedComponent {

  itemTypes!: MealItemType[];
  items!: Item[];
  item!: Item;
  cartItem!: CartItem;
  subscription: Subscription = new Subscription;
  countItems!: number;


  constructor(private pricedService: PricedService, private cartService: CartService) {}

  ngOnInit() {
    this.getMealItemType();
    this.getMealItem();
  }

  getMealItemType() {
    this.subscription = this.pricedService.getItemType().subscribe(itemTypes => {
      this.itemTypes = itemTypes;
    })
  }

  getMealItem() {
    this.subscription = this.pricedService.getMealItems().subscribe(items => {
      this.items = items;
    })
  }

  addItem(id: number) {
    this.subscription = this.pricedService.getOneItem(id).subscribe(item => {
      this.item = item;
      this.cartItem = {
        "id": item.id,
        "item_type_id": item.item_type_id,
        "name": item.item_name,
        "price": item.price,
        "count": 1
      }
      this.addToCart(this.cartItem);
    });
  }

  addToCart(cartItem: CartItem){
    this.subscription = this.cartService.addToCart(cartItem, "priced_cart").subscribe(item => {
      this.cartService.sendAddPriced();
    })
  }

  updateCart(){
    this.cartService.getItems("priced_cart").subscribe();
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
