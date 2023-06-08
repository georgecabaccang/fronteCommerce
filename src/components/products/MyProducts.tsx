import { useState, useEffect, useContext } from "react";
import { getUserProductsRequest } from "../../api/productDetailsReqeust";
import { UserContext } from "../../providers/UserProvider";
import Product from "./Product";
import { IProductProperties } from "../../types/productTypes";
import useDecryptUser from "../../hooks/useDecryptUser";

export default function MyProducts() {
    const { userDetails, isNull } = useDecryptUser();
    const [myProducts, setMyProducts] = useState<Array<IProductProperties>>([]);
    const [isEmpty, setIsEmpty] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const userContext = useContext(UserContext);

    const getUserProducts = async () => {
        if (!isNull) {
            const response = await getUserProductsRequest(userDetails!.email);
            console.log(response);
            if (response != "no posted products") {
                setMyProducts(response);
                setIsEmpty(false);
                return setIsLoading(false);
            }
            setIsEmpty(true);
            return setIsLoading(false);
        }
        return console.log("no user");
    };

    useEffect(() => {
        getUserProducts();
    }, [userDetails]);

    return (
        <div>
            My Products
            {!isEmpty && !isLoading ? (
                <div>
                    {myProducts.map((product) => {
                        return (
                            <Product
                                product={product}
                                key={product._id}
                                isSeller={userContext.userProfileDetails.isSeller}
                                user_id={userContext.userProfileDetails._id}
                            />
                        );
                    })}
                </div>
            ) : (
                <div>{!isEmpty && isLoading ? "Loading..." : "You Have No Posted Products"}</div>
            )}
        </div>
    );
}
