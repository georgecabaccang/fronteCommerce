import { useState, useEffect } from "react";
import { getUserProductsRequest } from "../../api/productDetailsReqeust";
import useDecryptUser from "../../hooks/useDecryptUser";
import MyProduct from "./MyProduct";
import { AxiosResponse } from "axios";

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
        if (userDetails && !isNull) {
            const response = (await getUserProductsRequest(userDetails!.email)) as AxiosResponse;
            if (response.data != "no posted products") {
                console.log(response);
                setMyProducts(response.data);
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
            {isLoading && <div>Loading...</div>}
            {isEmpty && <div className="text-center mt-3">You Have No Posted Products</div>}
            {!isEmpty && (
                <div>
                    {myProducts
                        .map((product) => {
                            return (
                                <MyProduct
                                    product={product}
                                    key={product._id}
                                    getUserProducts={getUserProducts}
                                />
                            );
                        })
                        .reverse()}
                </div>
            )}
        </div>
    );
}
