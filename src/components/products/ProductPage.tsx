import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useProductDetails from "../../hooks/useProductDetails";
import { IProductProperties } from "../../types/productTypes";

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

    return (
        <div>
            <div>{productDetails?._id}</div>
            <div>{productFound && "true"}</div>
            <div>{!productFound && "Product Not Found"}</div>
            <div>
                <Button
                    type="submit"
                    name="Add To Cart"
                    className="border rounded-sm px-2 py-1 hover:bg-orange-500"
                    clickEvent={testFn}
                />
            </div>
        </div>
    );
}
