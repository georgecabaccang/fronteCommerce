interface IProductProperties {
    productName: string;
    price: number;
    image: string;
    id: string;
}

interface IProductContextPropperties {
    products: Array<IProductProperties>;
    getProducts: () => void;
}
