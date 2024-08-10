import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, catchError, throwError } from 'rxjs';
import { CartItem, CartTotalPrice } from '../../Models/cart';
import { environment } from '../../../environments/environment';

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

  updateItemCount(id: number, count: number, price: number) {
    return this.http.patch<CartItem>(this.API_URL + "subsidized_cart/" + id, {"count": count, "price": +price});
  }

  updatePricedItem(id: number, count: number, price: number) {
    return this.http.patch<CartItem>(this.API_URL + "priced_cart/" + id, {"count": count, "price": +price});
  }

  getItems(type: string, meal_type_id: number): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.API_URL + type + "?meal_type_id=" + meal_type_id);
  }

  getItemsCount(item_id: number, type: string): Observable<CartItem> {
    return this.http.get<CartItem>(this.API_URL + type +"/?id="+item_id);
  }

  getItemTypeCount(item_type_id: number, type: string): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.API_URL + type +"/?item_type_id="+item_type_id);
  }

  searchPricedCart(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.API_URL +"priced_cart").pipe(
      catchError(this.handleError)
    );
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

  private handleError(error: HttpErrorResponse) {
    console.error('Error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }
}
