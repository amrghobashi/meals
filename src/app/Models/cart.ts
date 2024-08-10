export interface CartItem{
    id: number;
    item_type_id?: number;
    name?: string;
    price?: number;
    meal_type_id?: number;
    count?: number;
}

export interface CartTotalPrice{
    id: number;
    value?: string;
}