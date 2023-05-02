import { IProductProperties } from "./productTypes";

export interface IItemsProperties extends IProductProperties {
    quantity: number;
}

export interface ICart {
    cart: Array<IItemsProperties>;
}
