export interface IProductProperties {
    productName?: string;
    description?: string;
    price?: number;
    discount?: number;
    stock?: number;
    image?: string;
    productID?: string;
}

export interface IAxiosProductResponse {
    data: Array<IProductContextPropperties>;
}

export interface IProductContextPropperties {
    products: Array<IProductProperties>;
    getProducts: () => void;
}
