import { useContext, useEffect } from "react";

import Product from "../products/Product";
import { ProductsContext } from "../../providers/ProductsProvider";
import Input from "../shared/Input";

export default function Shop() {
    const productsContext = useContext(ProductsContext);

    // MAKE SEARCH BAR HERE
    useEffect(() => {
        if (productsContext.products ) {}

    }, [productsContext.products]);

    return (
        <div className="mx-5 mt-5">
            <div>
                <Input type="text" />
            </div>
            <div className="grid grid-cols-5 gap-2">
                {productsContext.products.map((product) => {
                    const prod_id = product._id;
                    return <Product product={product} key={prod_id} />;
                })}
            </div>
        </div>
    );
}
