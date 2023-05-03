import { PropsWithChildren, createContext, useEffect, useState } from "react";
import axios from "axios";
import {
    IProductContextPropperties,
    IProductProperties,
} from "../types/productTypes";

export const ProductsContext = createContext<IProductContextPropperties>({
    products: [],
    getProducts: () => {},
});

export default function ProductsProvider(props: PropsWithChildren) {
    const [products, setProducts] = useState<Array<IProductProperties>>([]);

    const loadProducts = async () => {
        const { data } = await axios("http://localhost:8002/shop");
        setProducts(data);
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const ProductContextValues: IProductContextPropperties = {
        products: products,
        getProducts: loadProducts,
    };
    return (
        <ProductsContext.Provider value={ProductContextValues}>
            {props.children}
        </ProductsContext.Provider>
    );
}
