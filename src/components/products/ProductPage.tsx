import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useProductDetails from "../../hooks/useProductDetails";
import { IProductProperties } from "../../types/productTypes";

export default function ProductPage() {
    const [productDetails, setProductDetails] = useState<IProductProperties>();
    const { _id } = useParams();

    useEffect(() => {
        if (_id) {
            const getDetails = async () => {
                const returnedDetails = await useProductDetails(_id);
                setProductDetails(returnedDetails);
            };
            getDetails();
        }
    }, []);

    return <div>{productDetails?._id}</div>;
}
