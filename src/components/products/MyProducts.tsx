import { useState, useEffect, useContext } from "react";
import { getUserProductsRequest } from "../../api/productDetailsReqeust";
import { UserContext } from "../../providers/UserProvider";
import Product from "./Product";
import { IProductProperties } from "../../types/productTypes";

export default function MyProducts() {
    const [myProducts, setMyProducts] = useState<Array<IProductProperties>>([]);
    const [isEmpty, setIsEmpty] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const userContext = useContext(UserContext);

    const getUserProducts = async () => {
        const response = await getUserProductsRequest(userContext.userProfileDetails.email);
        console.log(response);
        if (response != "no posted products") {
            setMyProducts(response);
            setIsEmpty(false);
            return setIsLoading(false);
        }
        setIsEmpty(true);
        return setIsLoading(false);
    };

    useEffect(() => {
        if (userContext.user && userContext.userProfileDetails.email) {
            getUserProducts();
        }
    }, [userContext.userProfileDetails.email]);

    return (
        <div>
            My Products
            {!isEmpty && !isLoading ? (
                <div>
                    {myProducts.map((product) => {
                        return <Product product={product} key={product._id} />;
                    })}
                </div>
            ) : (
                <div>{!isEmpty && isLoading ? "Loading..." : "You Have No Posted Products"}</div>
            )}
        </div>
    );
}
