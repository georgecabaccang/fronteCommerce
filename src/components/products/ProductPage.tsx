import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useProductDetails from "../../hooks/useProductDetails";
import { IProductProperties } from "../../types/productTypes";

export default function ProductPage() {
    const [productDetails, setProductDetails] = useState<IProductProperties>();
    const [isLoading, setIsLoading] = useState(true);
    const [productFound, setProductFound] = useState(false);
    const { _id } = useParams();

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

    return (
        <div>
            {isLoading && "Loading. . ."}
            <div>{productDetails?._id}</div>
            <div>{productFound && "true"}</div>
            <div>{!productFound && "Product Not Found"}</div>
        </div>
    );
}
