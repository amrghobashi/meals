export interface CartItem{
    id: number;
    item_type_id?: number;
    name?: string;
    price?: number;
    count?: number;
}

export interface CartList{
    list: CartItem[];
    error_message: string;
}

export interface CartTotalPrice{
    id: number;
    value?: string;
}