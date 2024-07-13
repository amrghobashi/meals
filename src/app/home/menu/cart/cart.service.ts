import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { CartItem, CartTotalPrice } from '../../../Models/cart';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }
  private API_URL = environment.API_URL;
  subsidizedCartSubject = new Subject();
  pricedCartSubject = new Subject();
  

  addToCart(item: CartItem, type: string) {
    return this.http.post(this.API_URL + type, item)
  }

  getItems(type: string): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.API_URL + type);
  }

  getItemsCount(item_type_id: number, type: string): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.API_URL + type +"/?item_type_id="+item_type_id);
  }

  deleteItem(id: number, type: string) {
    return this.http.delete(this.API_URL + type +'/' +id);
  }

  sendAddSubsidized() {
    this.subsidizedCartSubject.next(1);
  }

  sendAddPriced() {
    this.pricedCartSubject.next(1);
  }

  getTotalPrice(): Observable<CartTotalPrice> {
    return this.http.get<CartTotalPrice>(this.API_URL + "total_cart/1");
  }
}
