import { IProductProperties } from "./productTypes";

export interface IItemsProperties extends IProductProperties {
    quantity: number;
    cart_id?: string;
    getUserCart: () => void;
}

export interface ICheckOut {
    items: Array<IItemsProperties>;
    totalAmountToPay: number;
}

export interface IItemInCheckout {
    quantity: number;
    prod_id: string;
    image: string;
    productName: string;
    description: string;
    price: number;
    discount: number;
    discountedPrice: number;
}

export interface IICheckoutDetails {
    items: Array<IItemInCheckout>;
    totalAmountToPay: number;
}

export interface ICart {
    checkOutDetails: IICheckoutDetails;
    updateCheckout: (item: IItemInCheckout, action: string) => void;
    resetCheckout: () => void;
}
