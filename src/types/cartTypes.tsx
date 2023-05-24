import { IProductProperties } from "./productTypes";

export interface IItemsProperties extends IProductProperties {
    quantity: number;
    cart_id?: string;
}

export interface ICheckOut {
    items: Array<IItemsProperties>;
    totalAmountToPay: number;
}

export interface IItemInCheckout {
    quantity: number;
    prod_id: string;
    price: number;
    productName: string;
    discount: number;
    image: string;
}

export interface IICheckoutDetails {
    items: Array<IItemInCheckout>;
    totalAmountToPay: number;
}

export interface ICart {
    cart: Array<IItemsProperties>;
    checkOutDetails: IICheckoutDetails;
    addToCart: (productToBeAddedToCart: { prod_id: string; quantity: number }) => void;
    updateCheckout: (item: IItemInCheckout, action: string) => void;
    resetCheckout: () => void;
    getCartData: () => void;
}
