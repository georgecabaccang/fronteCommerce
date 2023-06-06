import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { IProductContextPropperties, IProductProperties } from "../types/productTypes";
import { getProductsRequest, searchProductDetailsRequest } from "../api/productDetailsReqeust";

export const ProductsContext = createContext<IProductContextPropperties>({
    products: [],
    getProducts: () => {},
    searchProducts: () => {},
});

export default function ProductsProvider(props: PropsWithChildren) {
    const [products, setProducts] = useState<Array<IProductProperties>>([]);

    const loadProducts = async () => {
        const products = await getProductsRequest();
        setProducts(products);
    };

    const searchProducts = async (query: string) => {
        const response = await searchProductDetailsRequest(query);
        setProducts(response);
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const ProductContextValues: IProductContextPropperties = {
        products: products,
        getProducts: loadProducts,
        searchProducts: searchProducts,
    };
    return (
        <ProductsContext.Provider value={ProductContextValues}>
            {props.children}
        </ProductsContext.Provider>
    );
}
