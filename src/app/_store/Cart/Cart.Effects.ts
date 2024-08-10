import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CartService } from "../../home/cart/cart.service";
import { loadCart, loadCartFail, loadCartSuccess } from "./Cart.Actions";
import { catchError, exhaustMap, map, of } from "rxjs";

@Injectable()
export class CartEffects {
    constructor(private actions: Actions, private cartService: CartService) {}

    loadCart = createEffect(() => 
        this.actions.pipe(
            ofType(loadCart),
            exhaustMap((action) => {
                return this.cartService.getItems("subsidized_cart").pipe(
                    map((data) => {
                        return loadCartSuccess({list: data})
                    }),
                    catchError((_err) => of(loadCartFail({error_message: _err.message})))
                )
            })
        )
    )
}