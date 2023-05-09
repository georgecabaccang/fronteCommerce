export interface IProductProperties {
    productName?: string;
    description?: string;
    price?: number;
    discount?: number;
    stock?: number;
    image?: string;
    _id: string;
}

export interface IAxiosProductResponse {
    data: Array<IProductContextPropperties>;
}

export interface IProductContextPropperties {
    products: Array<IProductProperties>;
    getProducts: () => void;
}
