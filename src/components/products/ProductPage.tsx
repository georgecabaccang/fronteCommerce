import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useProductDetails from "../../hooks/useProductDetails";
import { IProductProperties } from "../../types/productTypes";
import styles from "../../styles/product.module.css";

import Button from "../shared/Button";

export default function ProductPage() {
    const [productDetails, setProductDetails] = useState<IProductProperties>();
    const [isLoading, setIsLoading] = useState(true);
    const [productFound, setProductFound] = useState(false);
    const { _id } = useParams();

    const testFn = () => {
        console.log("okay na");
    };

    useEffect(() => {
        if (_id) {
            const getDetails = async () => {
                const returnedDetails = await useProductDetails(_id);
                if (returnedDetails.message) {
                    setProductFound(false);
                    setIsLoading(false);
                    return;
                }
                setProductDetails(returnedDetails);
                setProductFound(true);
                setIsLoading(false);
            };
            getDetails();
        }
    }, []);

    if (isLoading) {
        return (
            <div>
                <p>"Loading. . ."</p>
            </div>
        );
    }

    if (!productFound) {
        return (
            <div>
                <p>Product Not Found</p>
            </div>
        );
    }

    return (
        <div className="min-h-[80vh] flex justify-center items-center">
            <div
                className={`${styles.card} h-[30em] w-[50em] grid grid-cols-3 p-5`}
            >
                <div className={`col-span-2`}>
                    <div className="h-[20em] flex place-content-center mr-6 mb-2 p-1 border">
                        <img
                            src={productDetails?.image}
                            className="max-h-[100%] min-h-[10em] object-fill"
                        />
                    </div>
                    <p>{productDetails?.description}</p>
                </div>
                <div className="grid grid-cols-1 ">
                    <div>
                        <h1>{productDetails?.productName}</h1>
                        <div className="text-[0.85em] text-gray-400 font-semibold">
                            Stock: {productDetails?.stock}
                        </div>
                        <div>Price: ${productDetails?.price.toFixed(2)}</div>
                        <div>Quantity:</div>
                        <div>Total:</div>
                    </div>
                    <div>
                        <Button
                            type="button"
                            name="Buy Now"
                            className="border rounded-sm px-2 py-1 hover:bg-orange-500"
                            clickEvent={testFn}
                        />
                        <Button
                            type="button"
                            name="Add To Cart"
                            className="border rounded-sm px-2 py-1 hover:bg-orange-500"
                            clickEvent={testFn}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
