import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { productDetailsReqeust } from "../../api/productDetailsReqeust";

import Button from "../shared/Button";
import Quantity from "../shared/Quantity";

import { CartContext } from "../../providers/CartProvider";
import { UserContext } from "../../providers/UserProvider";
import { ActiveLinkContext } from "../../providers/ActiveLinkProvider";
import { addToCartRequest, getDetailsOfItemInCartRequest } from "../../api/cartRequests";
import useDecryptUser from "../../hooks/useDecryptUser";
import Swal from "sweetalert2";
import DescriptionModal from "./DescriptionModal";

interface IProductInCart {
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

export default function ProductPage() {
    const { userDetails, isNull } = useDecryptUser();
    const [productDetails, setProductDetails] = useState<IProductInCart>();
    const [isLoading, setIsLoading] = useState(true);
    const [productFound, setProductFound] = useState(false);
    const [quantity, setQuantity] = useState<number>(1);
    const [inCart, setInCart] = useState<boolean>(false);
    const [readDesc, setReadDesc] = useState(false);
    const [showDescriptionModal, setShowDescriptionModal] = useState(false);

    const { prod_id } = useParams();
    const navigate = useNavigate();

    const cartContext = useContext(CartContext);
    const userContext = useContext(UserContext);
    const activeLinkContext = useContext(ActiveLinkContext);

    const currencyFormat = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    const addToCart = async () => {
        if (productDetails?._id && userDetails && !isNull) {
            const productAddToCart = {
                prod_id: productDetails._id,
                quantity: quantity,
            };
            const response = await addToCartRequest(productAddToCart, userDetails?.email);
            if (response == "OK") {
                return Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Added To Cart",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        }
    };

    let totalPrice = productDetails?.discountedPrice
        ? productDetails?.discountedPrice
        : productDetails?.price;
    if (productDetails?.price) {
        totalPrice = totalPrice! * quantity;
    }

    let isSellerOfProduct: boolean = false;
    if (userDetails) {
        isSellerOfProduct = productDetails?.postedBy === userDetails._id;
    }

    const buyNow = async () => {
        if (productDetails) {
            const item = {
                prod_id: productDetails._id as string,
                image: productDetails.image,
                productName: productDetails.productName,
                description: productDetails.description,
                price: productDetails.price,
                discount: productDetails.discount,
                discountedPrice: productDetails.discountedPrice,
                quantity: quantity,
            };

            cartContext.updateCheckout(item, "add");
            activeLinkContext.setActiveLink("checkout");
            navigate("/cart/checkout");
        }
    };

    const checkIfInCart = async () => {
        if (userDetails && !isNull && prod_id) {
            const response = await getDetailsOfItemInCartRequest(userDetails?.email, prod_id);
            if (response === "item not in cart") {
                return setInCart(false);
            }
            return setInCart(true);
        }
    };

    const getDetails = async () => {
        if (prod_id) {
            const returnedDetails = await productDetailsReqeust(prod_id);
            if (returnedDetails.message) {
                setProductFound(false);
                setIsLoading(false);
                return;
            }
            setProductDetails(returnedDetails);
            setProductFound(true);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getDetails();
    }, []);

    useEffect(() => {
        checkIfInCart();
    }, [userDetails]);

    const redirectToLogin = () => {
        userContext.setLoginFrom("shop");
        navigate("/login");
    };

    const addToCartLoggedInOrOut = userContext.user ? addToCart : redirectToLogin;
    const buyNowLoggedInOrOut = userContext.user ? buyNow : redirectToLogin;

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
            {showDescriptionModal && (
                <DescriptionModal
                    description={productDetails!.description}
                    setShowDescriptionModal={setShowDescriptionModal}
                />
            )}
            <div
                className={`border max-h-[30em] max-w-[50em] grid grid-cols-3 p-5 shadow-sm rounded-md`}
            >
                <div className={`col-span-2`}>
                    <div className="h-[20em] flex place-content-center mr-6 mb-2 p-1">
                        <img
                            src={productDetails?.image}
                            className="max-h-[100%] min-h-[10em] object-fill"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 ">
                    <div>
                        <h3 className="font-semibold mb-1">{productDetails?.productName}</h3>
                        <div
                            className="min-h-[8.8em] break-words text-sm line-clamp-6 relative"
                            onMouseEnter={() => {
                                setReadDesc(true);
                            }}
                            onMouseLeave={() => {
                                setReadDesc(false);
                            }}
                        >
                            {readDesc && (
                                <div className="bg-black bg-opacity-70 min-h-[100%] min-w-[100%] rounded absolute flex justify-center items-center">
                                    <Button
                                        name="Read Description"
                                        className="rounded bg-gray-200 hover:bg-white p-2 shadow-gray-500 shadow-sm hover:shadow-md hover:shadow-gray-500 "
                                        clickEvent={() => {
                                            setShowDescriptionModal(true);
                                        }}
                                    />
                                </div>
                            )}
                            {productDetails?.description}
                        </div>
                        <p className="inline text-[1em]">Price: </p>
                        <p
                            className={`inline ${
                                productDetails?.discount &&
                                "line-through text-[0.8em] text-gray-400"
                            }`}
                        >
                            {currencyFormat.format(productDetails!.price)}
                        </p>
                        {productDetails?.discount != 0 && (
                            <div className="inline text-[1em] ms-2 m">
                                <div className="inline me-2">
                                    {currencyFormat.format(productDetails!.discountedPrice)}
                                </div>
                                <div className="inline text-sm border px-2 rounded bg-yellow-200">
                                    {productDetails!.discount * 100}% off
                                </div>
                            </div>
                        )}
                        <div className="flex justify-between items-center">
                            <div className="text-[0.85em] text-gray-400 font-semibold">
                                Stock: {productDetails?.stock}
                            </div>
                            {inCart || isSellerOfProduct && (
                                <div className="text-xs">{productDetails?.salesCount} Sold</div>
                            )}
                        </div>
                    </div>
                    {!inCart && !isSellerOfProduct && (
                        <div>
                            <div className="mb-2">
                                <div className="mb-2">
                                    <Quantity
                                        quantity={quantity}
                                        setQuantity={setQuantity}
                                        quantityFrom={"shop"}
                                    />
                                </div>
                                <div className="flex justify-between items-center">
                                    <div>Total: ${totalPrice?.toFixed(2)}</div>
                                    <div className="text-xs">{productDetails?.salesCount} Sold</div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 max-h-[2.2em] gap-2">
                                <Button
                                    type="button"
                                    name="Buy Now"
                                    className="border rounded-md shadow-sm hover:shadow-md px-2 py-1 hover:bg-white bg-gray-100"
                                    clickEvent={buyNowLoggedInOrOut}
                                />
                                <Button
                                    type="button"
                                    name="Add To Cart"
                                    className="border rounded-md shadow-sm hover:shadow-md px-2 py-1 hover:bg-white bg-gray-100"
                                    clickEvent={addToCartLoggedInOrOut}
                                />
                            </div>
                        </div>
                    )}
                    {inCart && !isSellerOfProduct && (
                        <div className="flex place-content-center items-center border max-h-[3em] shadow-sm rounded font-semibold">
                            Already In Cart
                        </div>
                    )}
                    {isSellerOfProduct && (
                        <div className="flex place-content-center items-center border max-h-[3em] shadow-sm rounded font-semibold">
                            Cannot Buy Own Product
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
