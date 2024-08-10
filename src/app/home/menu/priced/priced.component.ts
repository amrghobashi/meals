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
import { MenuService } from '../menu.service';

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


  constructor(private pricedService: PricedService, private cartService: CartService, private menuService: MenuService) {}

  ngOnInit() {
    this.getMealType();
  }

  getMealType() {
    this.subscription = this.menuService.selectedMealType.subscribe(id => {
      this.getMealItemType(id);
      this.getMealItem(id);
    })
  }

  getMealItemType(id: number) {
    this.subscription = this.pricedService.getItemType(id).subscribe(itemTypes => {
      this.itemTypes = itemTypes;
    })
  }

  getMealItem(id: number) {
    this.subscription = this.pricedService.getMealItems(id).subscribe(items => {
      this.items = items;
    })
  }

  checkCart(id: number) {
    this.subscription = this.cartService.searchPricedCart().subscribe(data => {
      const found = data.find(i => i.id === id);
      if(found) {
        this.updateCartItem(found);
      }
      else {
        this.addItem(id);
      }
    },
    error => {
      console.error('Error fetching cart items:', error);
    });
  }

  addItem(id: number) {
    this.subscription = this.pricedService.getOneItem(id).subscribe(item => {
      this.item = item;
      this.cartItem = {
        "id": item.id,
        "item_type_id": item.item_type_id,
        "name": item.item_name,
        "price": Number(item.price),
        "meal_type_id": item.meal_type_id,
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

  updateCartItem(item: CartItem) {
    const count = item?.count ?? 1;
    const newCount = count +1;
    const price = item?.price ?? 1;
    const unitPrice = price / count;
    const newPrice = unitPrice * newCount;
    this.subscription = this.cartService.updatePricedItem(item.id, newCount, newPrice).subscribe(data => {
      this.cartService.sendAddPriced();
    })
  }

  // updateCart(){
  //   this.cartService.getItems("priced_cart").subscribe();
  // }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
