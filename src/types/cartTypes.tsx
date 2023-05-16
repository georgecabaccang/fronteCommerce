import { IProductProperties } from "./productTypes";

export interface IItemsProperties extends IProductProperties {
    quantity: number;
    cart_id?: string;
}

export interface ICheckOut {
    items: Array<IItemsProperties>;
    totalAmountToPay: number;
}

export interface ICart {
    cart: Array<IItemsProperties>;
    toCheckOutItems: ICheckOut;
    addToCart: (productToBeAddedToCart: IItemsProperties) => void;
    addToCheckOut: (productToBeAddedToCheckOut: IItemsProperties) => void;
    getCartData: () => void;
}
