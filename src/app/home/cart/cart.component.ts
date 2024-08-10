import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { CartService } from './cart.service';
import { Subscription } from 'rxjs';
import { CartItem } from '../../Models/cart';
import { CommonModule } from '@angular/common';
import { MenuService } from '../menu/menu.service';

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
  totalPrice: number = 0;
  mealType: number = 1;
  mealTypeName: string = "Breakfast";

  constructor(private cartService: CartService, private menuService: MenuService) { }

  ngOnInit() {
    this.getMealType();
    this.getSubsidizedItems(1);
    this.getPricedItems(1);
    this.getSubsidizedCartUpdate();
    this.getPricedCartUpdate();
  }

  getMealType() {
    this.subscription = this.menuService.selectedMealType.subscribe(id => {
      this.mealType = id;
      if(id == 1)
        this.mealTypeName = "Breakfast";
      else if(id == 2)
        this.mealTypeName = "Lunch";
      else 
        this.mealTypeName = "Dinner";
      this.getSubsidizedItems(id);
      this.getPricedItems(id);
    })
  }

  getSubsidizedItems(meal_id: number) {
    this.subscription = this.cartService.getItems("subsidized_cart", meal_id).subscribe(items => {
      this.subsidizedItemsCart = items;
    })
  }

  getPricedItems(meal_id: number) {
    this.subscription = this.cartService.getItems("priced_cart", meal_id).subscribe(items => {
      this.pricedItemsCart = items;
      this.getTotalCart();
    })
  }

  deleteItem(id: number, type: string) {
    this.subscription = this.cartService.deleteItem(id, type).subscribe(() => {
      if (type == "subsidized_cart") {
        for (let i = 0; i < this.subsidizedItemsCart.length; i++) {
          if (this.subsidizedItemsCart[i].id === id) {
            this.subsidizedItemsCart.splice(i--, 1);
          }
        }
      }
      else {
        for (let i = 0; i < this.pricedItemsCart.length; i++) {
          if (this.pricedItemsCart[i].id === id) {
            this.pricedItemsCart.splice(i--, 1);
          }
        }
      }
      this.getTotalCart();
    })
  }

  getSubsidizedCartUpdate() {
    this.subscription = this.cartService.subsidizedCartSubject.subscribe(data => {
      this.getSubsidizedItems(this.mealType);
      setTimeout(() => {
        this.getTotalCart();
      }, 100);
    });
  }

  getPricedCartUpdate() {
    this.subscription = this.cartService.pricedCartSubject.subscribe(() => {
      this.getPricedItems(this.mealType);
      setTimeout(() => {
        this.getTotalCart();
      }, 100);
    });
  }

  getTotalCart() {
    let firstCart = [...this.subsidizedItemsCart];
    let firstPrice = 0;
    for (let i = 0; i < firstCart.length; i++) {
      firstPrice += firstCart[i].price ?? 0;
    }
    let secondCart = [...this.pricedItemsCart];
    let secondPrice = 0;
    for (let i = 0; i < secondCart.length; i++) {
      secondPrice += secondCart[i].price ?? 0;
    }
    this.totalPrice = firstPrice + secondPrice;
  }

  onChangePricedCart(item: CartItem, event: any) {
    let prevCount = event.formattedValue;
    const prevPrice = this.pricedItemsCart.find(i => i.id === item.id)?.price ?? 0;
    let newCount = item.count??1;
    let unitPrice = prevPrice / prevCount;
    let newPrice = newCount * unitPrice;
    this.subscription = this.cartService.updatePricedItem(item.id, newCount, newPrice).subscribe(data => {
      this.getPricedItems(this.mealType);
      setTimeout(() => {
        this.getTotalCart();
      }, 100);
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
