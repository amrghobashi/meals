import { createAction, props } from "@ngrx/store";
import { CartItem } from "../../Models/cart";

export const LOAD_CART = '[cart] load cart';
export const LOAD_CART_SUCCESS = '[cart] load cart succcess';
export const LOAD_CART_FAIL = '[cart] load cart fail';

export const loadCart = createAction(LOAD_CART);
export const loadCartSuccess = createAction(LOAD_CART_SUCCESS, props<{ list: CartItem[] }>());
export const loadCartFail = createAction(LOAD_CART_FAIL, props<{ error_message: string }>());
