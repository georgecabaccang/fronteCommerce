import { IProductProperties } from "./productTypes";

export interface IItemsProperties extends IProductProperties {
    quantity: number;
    _id?: string;
}

export interface ICart {
    cart: Array<IItemsProperties>;
    addToCart: (productToBeAddedToCart: IItemsProperties) => void;
}
