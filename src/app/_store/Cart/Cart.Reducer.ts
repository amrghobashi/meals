import { createReducer, on } from "@ngrx/store";
import { cartState } from "./Cart.State";
import { loadCartFail, loadCartSuccess } from "./Cart.Actions";

const _CartReducer = createReducer(cartState,
    on(loadCartSuccess, (state, action) => {
        return {
            ...state,
            list: action.list,
            error_message: ''
        }
    }),
    on(loadCartFail, (state, action) => {
        return {
            ...state,
            list: [],
            error_message: action.error_message
        }
    })
);

export function CartReducer(state: any, action: any) {
    return _CartReducer(state, action)
}