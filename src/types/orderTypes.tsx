import { IItemsProperties } from "./cartTypes";

export interface IOrder {
    items: Array<IItemsProperties>;
    totalAmountToPay: number;
}

export interface IOrderItem {
    productName: string;
    prod_id: string;
    quantity: number;
    price: number;
    image: string;
    discount: number;
}
