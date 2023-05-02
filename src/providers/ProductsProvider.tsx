import { PropsWithChildren, createContext, useEffect, useState } from "react";
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
        const getProducts = await fetch("http://localhost:8002/shop");
        const loadedProducts = await getProducts.json();
        setProducts(loadedProducts);
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
