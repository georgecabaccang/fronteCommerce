export interface IItemDetails {
    _id: string;
    prod_id: string;
    image: string;
    productName: string;
    price: number;
    discount: number;
    discountedPrice: number;
    quantity: number;
}

export interface IOrder {
    items: Array<IItemDetails>;
    totalAmount: number;
    updatedAt: Date;
    _id: string;
    status: string;
    setSearchParams: (filter: { filter: string }) => void;
    getOrders: () => void;
}
