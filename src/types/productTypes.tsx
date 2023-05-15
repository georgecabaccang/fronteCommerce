export interface IProductProperties {
    productName?: string;
    description?: string;
    price?: number;
    discount?: number;
    stock?: number;
    image?: string;
    prod_id?: string;
    _id?: string; // This is just for the ProductProvider. This is just the same as the value of prod_id
}

export interface IAxiosProductResponse {
    data: Array<IProductContextPropperties>;
}

export interface IProductContextPropperties {
    products: Array<IProductProperties>;
    getProducts: () => void;
}
