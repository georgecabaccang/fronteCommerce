import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import useProductDetails from "../../hooks/useProductDetails";
import { IProductProperties } from "../../types/productTypes";
import styles from "../../styles/product.module.css";

import Button from "../shared/Button";
import Input from "../shared/Input";
import { CartContext } from "../../providers/CartProvider";

export default function ProductPage() {
    const [productDetails, setProductDetails] = useState<IProductProperties>();
    const [isLoading, setIsLoading] = useState(true);
    const [productFound, setProductFound] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const { _id } = useParams();

    const cartContext = useContext(CartContext);

    const addToCart = () => {
        console.log(productDetails);
        if (
            productDetails?.productName &&
            productDetails?.description &&
            productDetails?.price &&
            productDetails?.discount >= 0 &&
            productDetails?.stock >= 1 &&
            productDetails?.image &&
            productDetails?._id
        ) {
            const productAddToCart = {
                productName: productDetails.productName,
                description: productDetails.description,
                price: productDetails.price,
                discount: productDetails.discount,
                stock: productDetails.stock,
                image: productDetails.image,
                _id: productDetails._id,
                quantity: quantity,
            };
            cartContext.cart.push(productAddToCart);
            console.log("if");
        } else {
            console.log("else");
        }

        console.log(cartContext.cart);
    };

    const minusQuantity = () => {
        setQuantity(quantity - 1);
    };

    const plusQuantity = () => {
        setQuantity(quantity + 1);
    };

    let totalPrice = productDetails?.price;
    if (productDetails?.price) {
        totalPrice = productDetails?.price * quantity;
    }

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
                        <div>
                            Quantity:
                            {
                                <Button
                                    name="-"
                                    className="border px-[0.7em] inline ms-2"
                                    clickEvent={minusQuantity}
                                    getState={quantity}
                                    disabled={quantity == 1 ? true : false}
                                />
                            }
                            {
                                <Input
                                    type="number"
                                    setQuantity={setQuantity}
                                    value={quantity}
                                    min={1}
                                    max={10}
                                    isDisabled={true}
                                    className="inline px-2 border max-w-[2.5em] text-center"
                                />
                            }
                            {
                                <Button
                                    name="+"
                                    className="border px-[0.6em] inline"
                                    getState={quantity}
                                    clickEvent={plusQuantity}
                                    disabled={quantity == 10 ? true : false}
                                />
                            }
                        </div>
                        <div>Total: ${totalPrice?.toFixed(2)}</div>
                    </div>
                    <div>
                        <Button
                            type="button"
                            name="Buy Now"
                            className="border rounded-sm px-2 py-1 hover:bg-orange-500"
                            clickEvent={addToCart}
                        />
                        <Button
                            type="button"
                            name="Add To Cart"
                            className="border rounded-sm px-2 py-1 hover:bg-orange-500"
                            clickEvent={addToCart}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
