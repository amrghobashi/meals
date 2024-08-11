import { Component } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { MenubarModule } from 'primeng/menubar';
import { CartComponent } from '../../home/cart/cart.component';

@Component({
    selector: 'app-tool-bar',
    standalone: true,
    imports: [ToolbarModule, AvatarModule, ButtonModule, CardModule, MenubarModule, DialogModule, CartComponent],
    templateUrl: './tool-bar.component.html',
    styleUrl: './tool-bar.component.scss'
})
export class ToolBarComponent {

    visible: boolean = false;

    ngOnInit() {

    }

    showDialog() {
        this.visible = true;
    }
}
