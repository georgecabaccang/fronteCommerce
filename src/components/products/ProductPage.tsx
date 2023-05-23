import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { productDetailsReqeust } from "../../api/productDetailsReqeust";
import { IProductProperties } from "../../types/productTypes";
import styles from "../../styles/product.module.css";

import Button from "../shared/Button";
import Quantity from "../shared/Quantity";

import { CartContext } from "../../providers/CartProvider";
import { UserContext } from "../../providers/UserProvider";
import { deleteCheckOutInstanceRequest, getUserCart } from "../../api/cartRequests";

export default function ProductPage() {
    const [productDetails, setProductDetails] = useState<IProductProperties>({
        productName: "",
        price: 0,
        discount: 0,
        stock: 0,
        prod_id: "",
        image: "",
    });
    const [isLoading, setIsLoading] = useState(true);
    const [productFound, setProductFound] = useState(false);
    const [quantity, setQuantity] = useState<number>(1);
    const [inCart, setInCart] = useState<boolean>(false);

    const { prod_id } = useParams();
    const navigate = useNavigate();

    const cartContext = useContext(CartContext);
    const userContext = useContext(UserContext);

    const addToCart = () => {
        const prod_id = productDetails?._id;

        if (prod_id) {
            const productAddToCart = {
                prod_id: prod_id,
                quantity: quantity,
            };
            cartContext.addToCart(productAddToCart);
        }
    };

    let totalPrice = productDetails?.price;
    if (productDetails?.price) {
        totalPrice = productDetails?.price * quantity;
    }

    const buyNow = async () => {
        const userCart = await getUserCart();
        await deleteCheckOutInstanceRequest();
        const item = {
            quantity: quantity,
            cart_id: userCart._id,
            productName: productDetails.productName,
            price: productDetails.price,
            discount: productDetails.discount,
            stock: productDetails.stock,
            prod_id: productDetails._id as string,
            image: productDetails.image,
        };

        cartContext.addToCheckOut(item);
        navigate("/cart/checkout");
    };

    useEffect(() => {
        const inCart = cartContext.cart.findIndex((product) => {
            return productDetails._id === product.prod_id;
        });

        if (inCart != -1) {
            return setInCart(true);
        }
        return setInCart(false);
    }, [isLoading]);

    useEffect(() => {
        if (prod_id) {
            const getDetails = async () => {
                const returnedDetails = await productDetailsReqeust(prod_id);
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

    const redirectToLogin = () => {
        userContext.setLoginFrom("shop");
        navigate("/login");
    };

    const addToCartLoggedInOrOut = userContext.accessToken ? addToCart : redirectToLogin;
    const buyNowLoggedInOrOut = userContext.accessToken ? buyNow : redirectToLogin;

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
        <div className="pt-8 flex justify-center items-center">
            <div className={`${styles.card} h-[30em] w-[50em] grid grid-cols-3 p-5`}>
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
                        <div>
                            Price: ${productDetails?.price && productDetails?.price.toFixed(2)}
                        </div>
                        <div>
                            <Quantity
                                quantity={quantity}
                                setQuantity={setQuantity}
                                quantityFrom={"shop"}
                            />
                        </div>
                        <div>Total: ${totalPrice?.toFixed(2)}</div>
                    </div>
                    {!inCart && (
                        <div>
                            <Button
                                type="button"
                                name="Buy Now"
                                className="border rounded-sm px-2 py-1 hover:bg-orange-500"
                                clickEvent={buyNowLoggedInOrOut}
                            />
                            <Button
                                type="button"
                                name="Add To Cart"
                                className="border rounded-sm px-2 py-1 hover:bg-orange-500"
                                clickEvent={addToCartLoggedInOrOut}
                            />
                        </div>
                    )}
                    {inCart && <div>In Cart</div>}
                </div>
            </div>
        </div>
    );
}
