import { Component } from '@angular/core';
import { ToolBarComponent } from "../shared/tool-bar/tool-bar.component";
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from "./menu/menu.component";
import { TabViewModule } from 'primeng/tabview';
import { ReviewComponent } from './review/review.component';
import { CardModule } from 'primeng/card';
import { CartComponent } from './cart/cart.component';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [RouterOutlet, ToolBarComponent, MenuComponent, TabViewModule, MenuComponent,
       ReviewComponent, CardModule, CartComponent]
})
export class HomeComponent {

  ngOnInit() {
  }
}
