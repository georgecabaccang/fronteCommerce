import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { productDetailsReqeust } from "../../api/productDetailsReqeust";

export default function UpdateMyProduct() {
    const [productDetails, setProductDetails] = useState({
        productName: "",
        price: 0,
        discount: 0,
        stock: 0,
        prod_id: "",
        image: "",
    });
    const [productFound, setProductFound] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    const { prod_id } = useParams();

    const getDetails = async () => {
        const returnedDetails = await productDetailsReqeust(prod_id!);
        if (returnedDetails.message) {
            setProductFound(false);
            setIsLoading(false);
            return;
        }
        setProductDetails(returnedDetails);
        setProductFound(true);
        setIsLoading(false);
    };

    useEffect(() => {
        if (prod_id) {
            getDetails();
        }
    }, []);

    return (
        <div>
            {productFound && !isLoading ? (
                <div>{productDetails.productName}</div>
            ) : (
                <div>{productFound && isLoading ? "Loading" : "Product Not Found"}</div>
            )}
        </div>
    );
}
