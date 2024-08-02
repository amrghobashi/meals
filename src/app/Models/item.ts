export interface MealItemType{
    id: number;
    name?: string;
    item_type_id?: number;
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
    meal_type_id?: number;
    subsidized_menu_id?: number;
    price?: number;
    img: string;
}

export interface Meal{
    id: number;
    name?: string;
}