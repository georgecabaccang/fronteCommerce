import { PropsWithChildren, createContext, useState } from "react";

export const ProductsContext = createContext<IProductContextPropperties>({
    products: [],
    getProducts: () => {},
});

export default function ProductsProvider(props: PropsWithChildren) {
    const [products, setProducts] = useState<Array<IProductProperties>>();

    const ProductContextValues: IProductContextPropperties = {
        products: [],
        getProducts: () => {},
    };
    return (
        <ProductsContext.Provider value={ProductContextValues}>
            {props.children}
        </ProductsContext.Provider>
    );
}
