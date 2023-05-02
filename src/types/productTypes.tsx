interface IProductProperties {
    productName: string;
    price: number;
    image: string;
    _id: string;
}

interface IProductContextPropperties {
    products: Array<IProductProperties>;
    getProducts: () => void;
}
