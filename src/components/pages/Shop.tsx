import { useContext, useEffect, useState, useMemo } from "react";

import Product from "../products/Product";
import { ProductsContext } from "../../providers/ProductsProvider";
import { useSearchParams } from "react-router-dom";

export default function Shop() {
    const productsContext = useContext(ProductsContext);

    const [inShop, setInShop] = useState(productsContext.products);
    const [searchParams, setSearchParams] = useSearchParams();
    const SEARCH_PARAMS_FIND = searchParams.get("find");

    // const matchingFunction = () => {};

    // const foundProductsTwo = useMemo(() => {
    //     return matchingFunction();
    // }, [SEARCH_PARAMS_FIND, inShop]);

    const foundProducts = useMemo(() => {
        return inShop.filter((product) => {
            if (!SEARCH_PARAMS_FIND) {
                return inShop;
            }
            console.log(SEARCH_PARAMS_FIND);
            return product.productName
                .toLowerCase()
                .includes(SEARCH_PARAMS_FIND?.toLocaleLowerCase() as string);
        });
    }, [SEARCH_PARAMS_FIND, inShop]);

    useEffect(() => {
        if (productsContext.products) {
            setInShop(productsContext.products);
        }
    }, [productsContext.products]);

    return (
        <div className="mx-5 mt-5">
            <div className="flex min-w-100% border justify-center">
                <label>Search</label>
                <input
                    type="text"
                    className="border min-w-[50%]"
                    value={SEARCH_PARAMS_FIND as string}
                    onChange={(event) => setSearchParams({ find: event.target.value })}
                />
            </div>
            <div className="grid grid-cols-5 gap-2">
                {foundProducts.map((product) => {
                    const prod_id = product._id;
                    return <Product product={product} key={prod_id} />;
                })}
            </div>
        </div>
    );
}
