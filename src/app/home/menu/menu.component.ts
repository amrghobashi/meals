import { Component } from '@angular/core';
import { PricedComponent } from "./priced/priced.component";
import { SubsidizedComponent } from "./subsidized/subsidized.component";
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { CartComponent } from "../cart/cart.component";
import { MenuService } from './menu.service';
import { Meal } from '../../Models/item';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-menu',
    standalone: true,
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.scss',
    imports: [PricedComponent, SubsidizedComponent, TabViewModule, CardModule, CartComponent,
        CalendarModule, DropdownModule, FormsModule]
})
export class MenuComponent {
    
    subscription: Subscription = new Subscription;
    minDate!: Date;
    maxDate!: Date;
    tomorrow: Date = new Date;
    meals!: Meal[];
    selectedMeal!: Meal;
    selectedDate: Date = new Date;

    constructor(private menuService: MenuService) {}

    ngOnInit() {
        this.setDateBoundries();
        this.getMeals();
    }

    setDateBoundries() {
        let today = new Date();
        let month = today.getMonth();
        let year = today.getFullYear();
        let prevMonth = (month === 0) ? 11 : month -1;
        let prevYear = (prevMonth === 11) ? year - 1 : year;
        let nextMonth = (month === 11) ? 0 : month + 1;
        let nextYear = (nextMonth === 0) ? year + 1 : year;
        this.minDate = new Date();
        this.minDate.setMonth(prevMonth);
        this.minDate.setFullYear(prevYear);
        this.maxDate = new Date();
        this.maxDate.setMonth(nextMonth);
        this.maxDate.setFullYear(nextYear);
        this.tomorrow.setDate(this.tomorrow.getDate() +1);
        this.selectedDate = this.tomorrow;
    }

    filter(id: number) {
        this.menuService.selectedMealType.next(id);
    }

    getMeals() {
        this.menuService.getMealType().then((meal) => {
          this.meals = meal;
          this.selectedMeal = this.meals[0];
        });
      }

      ngOnDestroy(): void {
        this.subscription.unsubscribe();
      }
}
