import { useState, useEffect, useContext } from "react";

import {
    getDetailsOfItemInCartRequest,
    itemInCartChangeQuantity,
    removeFromCartRequest,
} from "../../api/cartRequests";
import { CartContext } from "../../providers/CartProvider";

import Input from "../shared/Input";
import Quantity from "../shared/Quantity";
import useDecryptUser from "../../hooks/useDecryptUser";
import { Link } from "react-router-dom";

interface ICartItem {
    prod_id: string;
    image: string;
    productName: string;
    description: string;
    price: number;
    discount: number;
    discountedPrice: number;
    stock: number;
    quantity: number;
    item_id: string;
    getUserCart: () => {};
}

export default function CartItem(props: ICartItem) {
    const { userDetails, isNull } = useDecryptUser();
    const [itemDetails, setItemDetails] = useState<ICartItem>();
    const [quantity, setQuantity] = useState<number>(props.quantity);
    const [inCheckOut, setInCheckOut] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);

    const cartContext = useContext(CartContext);

    let totalPrice = props?.discountedPrice ? props?.discountedPrice : props?.price;
    if (props?.price) {
        totalPrice = totalPrice! * quantity;
    }
    const currencyFormat = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    const changeQuantityOfItemInCart = async () => {
        if (itemDetails?.prod_id && userDetails && !isNull) {
            const response = await itemInCartChangeQuantity(
                quantity,
                itemDetails.prod_id,
                userDetails.email
            );
            if (response == "OK") {
                return setLoading(false);
            }
            setLoading(false);
            return alert("Smething went wrong");
        }
    };

    const removeFromCart = async () => {
        if (itemDetails?.prod_id && userDetails && !isNull) {
            const response = await removeFromCartRequest(itemDetails.prod_id, userDetails.email);
            if (response == "OK") {
                setLoading(false);
                props.getUserCart();
            }
            setLoading(false);
        }
    };

    const addOrRemoveToOrFromCheckOut = () => {
        const item = {
            prod_id: props.prod_id,
            image: props.image,
            productName: props.productName,
            description: props.description,
            price: props.price,
            discount: props.discount,
            discountedPrice: props.discountedPrice,
            quantity: quantity,
        };
        if (inCheckOut) {
            return cartContext.updateCheckout(item, "add");
        }
        if (!inCheckOut && cartContext.checkOutDetails.totalAmountToPay > 0) {
            return cartContext.updateCheckout(item, "remove");
        }
    };

    const getItemDetails = async () => {
        if (props.prod_id && userDetails && !isNull) {
            const response = await getDetailsOfItemInCartRequest(userDetails.email, props.prod_id);
            setItemDetails(response);
            setLoading(false);
        }
    };

    useEffect(() => {
        addOrRemoveToOrFromCheckOut();
    }, [inCheckOut]);

    useEffect(() => {
        setLoading(true);
        if (quantity === 0) {
            removeFromCart();
            return;
        }
        changeQuantityOfItemInCart();
    }, [quantity]);

    useEffect(() => {
        if (userDetails && !isNull) {
            getItemDetails();
        }
    }, [userDetails]);

    return (
        <div className="border grid grid-cols-5 py-4 mx-10 my-5 shadow-sm">
            {loading && (
                <div role="status">
                    <svg
                        aria-hidden="true"
                        className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                        />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                        />
                    </svg>
                </div>
            )}
            {!loading && quantity != 0 && (
                <>
                    <div className="flex place-content-center col-span-2">
                        <Link to={`/shop/product/${props.prod_id}`}>
                            <img src={itemDetails?.image} className="max-h-[10em] min-h-[10em]" />
                        </Link>
                    </div>

                    <div className="col-span-3">
                        <h3 className="font-semibold mb-1">{props?.productName}</h3>
                        <p className="inline text-[1em]">Price: </p>
                        <p
                            className={`inline ${
                                props?.discount && "line-through text-[0.8em] text-gray-400"
                            }`}
                        >
                            {currencyFormat.format(props.price)}
                        </p>
                        {props?.discount != 0 && (
                            <div className="inline text-[1em]  ms-2">
                                {currencyFormat.format(props.discountedPrice)}{" "}
                                <div className="inline text-sm border px-2 rounded bg-yellow-200">
                                    {props.discount * 100}% off
                                </div>
                            </div>
                        )}
                        <div className="my-2">
                            <Quantity
                                quantity={quantity}
                                setQuantity={setQuantity}
                                quantityFrom="cart"
                                prod_id={props.prod_id}
                                disableButton={inCheckOut}
                            />
                        </div>
                        <div>Total Amount: {currencyFormat.format(totalPrice)}</div>
                        <div className="flex max-w-[9em] justify-between font-sm mt-3">
                            <Input
                                type="checkbox"
                                setStateBoolean={setInCheckOut}
                                getStateBoolean={inCheckOut}
                            />
                            <label>Add To Checkout</label>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
