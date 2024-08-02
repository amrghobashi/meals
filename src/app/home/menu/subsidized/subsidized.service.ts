import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item, MealItemType } from '../../../Models/item';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubsidizedService {

  constructor(private http: HttpClient) { }
  private API_URL = environment.API_URL;

  getItemType(id: number): Observable<MealItemType[]> {
      return this.http.get<MealItemType[]>(this.API_URL + "subsidized_item_type?meal_type_id=" + id);
  }

  getMealItems(id: number): Observable<Item[]> {
      return this.http.get<Item[]>(this.API_URL + "subsidized_meals?meal_type_id=" + id);
  }

  getOneItem(id: number) {
    return this.http.get<Item>(this.API_URL + "subsidized_meals/" + id)
  }
};