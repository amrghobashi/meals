import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CartList } from "../../Models/cart";

const getCartState = createFeatureSelector<CartList>('cart');

export const getCartList = createSelector(getCartState, (state) => {
    return state.list;
})