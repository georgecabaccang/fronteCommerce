export interface IProductProperties {
    productName: string;
    price: number;
    image: string;
    _id: string;
}

export interface IProductContextPropperties {
    products: Array<IProductProperties>;
    getProducts: () => void;
}
