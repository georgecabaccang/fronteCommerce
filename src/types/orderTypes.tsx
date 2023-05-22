export interface IOrderItem {
    productName: string;
    prod_id: string;
    quantity: number;
    price: number;
    image: string;
    discount: number;
}

export interface IOrder {
    items: Array<IOrderItem>;
    totalAmount: number;
    createdAt: Date;
    _id: string;
    status: string;
}

export interface IOrderList {
    orders: Array<IOrder>;
    getOrders: () => void;
}
