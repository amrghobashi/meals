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
import { CartService } from '../cart/cart.service';
import { Message, MessageService } from 'primeng/api';

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
  countItems!: number;
  alertMessage!: Message[];


  constructor(private subsidizedService: SubsidizedService, private cartService: CartService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getMealItemType();
    this.getMealItem();
  }

  getMealItemType() {
    this.subscription = this.subsidizedService.getItemType().subscribe(itemTypes => {
      this.itemTypes = itemTypes;
    })
  }

  getMealItem() {
    this.subscription = this.subsidizedService.getMealItems().subscribe(items => {
      this.items = items;
      console.log(items);

    })
  }

  addItem(id: number) {
    this.subscription = this.subsidizedService.getOneItem(id).subscribe(item => {
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
    this.subscription = this.cartService.addToCart(cartItem, "subsidized_cart").subscribe(item => {
      this.cartService.sendAddSubsidized();
    })
  }

  updateCart(){
    this.cartService.getItems("subsidized_cart").subscribe();
  }

  checkCount(item_type_id: number, item_id: number) {
    this.subscription = this.cartService.getItemsCount(item_type_id, "subsidized_cart").subscribe(items => {
      this.countItems = items.length;
      if(item_type_id == 1){
        if(this.countItems >= 1)
          {
            this.messageService.clear();
            this.messageService.add({ key: 't1', severity: 'error',
              detail: 'Sorry you have reached the maximum count.' });
          }
        else
          this.addItem(item_id);
      }
      else if(item_type_id == 2){
        if(this.countItems >= 2)
          {
            this.messageService.clear();
            this.messageService.add({ key: 't1', severity: 'error',
              detail: 'Sorry you have reached the maximum count.' });
          }
        else
          this.addItem(item_id);
      }
      else if(item_type_id == 3){
        if(this.countItems >= 1)
          {
            this.messageService.clear();
            this.messageService.add({ key: 't1', severity: 'error',
              detail: 'Sorry you have reached the maximum count.' });
          }
        else
          this.addItem(item_id);
      }
    })
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
