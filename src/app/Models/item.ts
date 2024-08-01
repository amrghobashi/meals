export interface MealItemType{
    id: number;
    name?: string;
    max_choice?: number;
}

export interface Item{
    id: number;
    item_name?: string;
    desc?: string;
    quantity?: number;
    reserved_quantity?: number;
    item_type_id?: number;
    item_type_name?: string;
    max_choice?: number;
    subsidized_menu_id?: number;
    price?: number;
    img: string;
}

export interface Meal{
    id: number;
    name?: string;
}