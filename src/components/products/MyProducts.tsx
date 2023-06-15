import { useState, useEffect } from "react";
import { getUserProductsRequest } from "../../api/productDetailsReqeust";
import useDecryptUser from "../../hooks/useDecryptUser";
import MyProduct from "./MyProduct";

interface IProductDetails {
    _id: string;
    image: string;
    productName: string;
    description: string;
    price: number;
    discount: number;
    discountedPrice: number;
    stock: number;
    salesCount: number;
    postedBy: string;
}

export default function MyProducts() {
    const { userDetails, isNull } = useDecryptUser();
    const [myProducts, setMyProducts] = useState<Array<IProductDetails>>([]);
    const [isEmpty, setIsEmpty] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const getUserProducts = async () => {
        if (!isNull) {
            const response = await getUserProductsRequest(userDetails!.email);
            if (response != "no posted products") {
                setMyProducts(response);
                setIsEmpty(false);
                return setIsLoading(false);
            }
            setIsEmpty(true);
            return setIsLoading(false);
        }
    };

    useEffect(() => {
        getUserProducts();
    }, [userDetails]);

    return (
        <div>
            <div className="text-center mt-5">My Products</div>

            {!isEmpty && !isLoading ? (
                <div>
                    {myProducts
                        .map((product) => {
                            return <MyProduct product={product} key={product._id} />;
                        })
                        .reverse()}
                </div>
            ) : (
                <div>{!isEmpty && isLoading ? "Loading..." : "You Have No Posted Products"}</div>
            )}
        </div>
    );
}
