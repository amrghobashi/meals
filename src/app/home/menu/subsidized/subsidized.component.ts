import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { FieldsetModule } from 'primeng/fieldset';
import { ImageModule } from 'primeng/image';
import { SubsidizedService } from './subsidized.service';
import { CommonModule } from '@angular/common';
import { Item, MealItemType } from '../../../Models/item';
import { Subscription } from 'rxjs';
import { CartItem } from '../../../Models/cart';
import { CartService } from '../../cart/cart.service';
import { Message, MessageService } from 'primeng/api';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-subsidized',
  standalone: true,
  imports: [ButtonModule, ToastModule, FieldsetModule, ImageModule, CommonModule],
  templateUrl: './subsidized.component.html',
  styleUrl: './subsidized.component.scss',
  providers: [MessageService]
})
export class SubsidizedComponent {

  itemTypes!: MealItemType[];
  items!: Item[];
  item!: Item;
  cartItem!: CartItem;
  subscription: Subscription = new Subscription;
  countItems: number = 0;
  countItemType!: number;
  alertMessage!: Message[];
  itemTypeArray!: MealItemType[];

  constructor(private subsidizedService: SubsidizedService, private cartService: CartService,
    private messageService: MessageService, private menuService: MenuService
  ) { }

  ngOnInit() {
    this.getItemTypeArray();
    this.getMealType();
  }

  getMealType() {
    this.subscription = this.menuService.selectedMealType.subscribe(id => {
      this.getMealItemType(id);
      this.getMealItem(id);
    })
  }

  getMealItemType(id: number) {
    this.subscription = this.subsidizedService.getItemType(id).subscribe(itemTypes => {
      this.itemTypes = itemTypes;
    })
  }

  getMealItem(id: number) {
    this.subscription = this.subsidizedService.getMealItems(id).subscribe(items => {
      this.items = items;
    })
  }

  addItem(id: number) {
    this.subscription = this.subsidizedService.getOneItem(id).subscribe(item => {
      this.item = item;
      this.cartItem = {
        "id": item.id,
        "item_type_id": item.item_type_id,
        "name": item.item_name,
        "price": Number(item.price),
        "count": 1
      }
      this.addToCart(this.cartItem);
    });
  }

  incrementItem(id: number, count: number, price: number) {
    this.subscription = this.cartService.updateItemCount(id, count, price).subscribe(data => {
      // console.log(data)
      this.cartService.sendAddSubsidized();
    });
  }

  addToCart(cartItem: CartItem) {
    this.subscription = this.cartService.addToCart(cartItem, "subsidized_cart").subscribe(item => {
      this.cartService.sendAddSubsidized();
    })
  }

  updateCart() {
    this.cartService.getItems("subsidized_cart").subscribe();
  }

  checkCartCount(item_type_id: number, item_id: number, type: string) {
    const max = this.itemTypeArray[item_type_id - 1].max_choice ?? 0;
    let countItems = 0;
    this.subscription = this.cartService.getItemTypeCount(item_type_id, type).subscribe(data => {
      for(let i = 0; i < data.length; i++){
        if(countItems < max) {
          countItems += data[i].count?? 0;
        }
      }
      this.countItems = countItems;
      if(this.countItems < max) {
        const count = data.find(i => i.id === item_id)?.count;
        const price = data.find(i => i.id === item_id)?.price ?? 0;
        if(count)
          this.incrementItem(item_id, count +1, price*2);
        else
          this.addItem(item_id);
      }
      else {
          this.messageService.clear();
          this.messageService.add({
            key: 't1', severity: 'error',
            detail: 'Sorry you have reached the maximum count.'
          });
      }
    });
  }

  getItemTypeArray() {
    this.subscription = this.subsidizedService.getItemTypeArray().subscribe(data => {
      this.itemTypeArray = data;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
