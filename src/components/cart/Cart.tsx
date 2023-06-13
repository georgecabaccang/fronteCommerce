import { useContext, FormEvent, useState, useEffect } from "react";
import { CartContext } from "../../providers/CartProvider";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";
import Button from "../shared/Button";
import { ActiveLinkContext } from "../../providers/ActiveLinkProvider";
import useDecryptUser from "../../hooks/useDecryptUser";
import { getUserCartRequest } from "../../api/cartRequests";

const CHECKOUT_URL = "/cart/checkout";

interface ICart {
    items: Array<{
        _id: string;
        prod_id: string;
        image: string;
        productName: string;
        description: string;
        price: number;
        discount: number;
        discountedPrice: number;
        stock: number;
        quantity: number;
    }>;
    _id: string;
    cartOwner: string;
}

export default function Cart() {
    const { userDetails, isNull } = useDecryptUser();
    const [cart, setCart] = useState<ICart>();
    const [isLoading, setIsLoading] = useState(true);
    const [isDisabled, setIsDisabled] = useState(true);

    const cartContext = useContext(CartContext);
    const activeLinkContext = useContext(ActiveLinkContext);

    const navigate = useNavigate();

    const totalAmountToPay = cartContext.checkOutDetails.totalAmountToPay;
    const currencyFormat = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    const checkoutHandler = (event: FormEvent) => {
        event.preventDefault();
        navigate(CHECKOUT_URL);
    };

    useEffect(() => {
        if (cartContext.checkOutDetails.items.length != 0) {
            return setIsDisabled(false);
        }
        return setIsDisabled(true);
    }, [cartContext.checkOutDetails]);

    const getUserCart = async () => {
        setIsLoading(true);
        if (userDetails && !isNull) {
            const cartData = await getUserCartRequest(userDetails.email);
            setCart(cartData);
            return setIsLoading(false);
        }
        return setIsLoading(false);
    };

    useEffect(() => {
        if (userDetails) {
            getUserCart();
        }
    }, [userDetails]);

    if (isLoading) {
        return <div>Loading Cart...</div>;
    }

    return (
        <div className="mt-5 mb-20">
            <form onSubmit={checkoutHandler}>
                {cart?.items.length === 0 ? (
                    <div>Cart Is Empty</div>
                ) : (
                    <div>
                        {cart?.items.map((item) => {
                            return (
                                <CartItem
                                    key={item._id}
                                    prod_id={item.prod_id}
                                    productName={item.productName}
                                    description={item.description}
                                    price={item.price}
                                    discount={item.discount}
                                    discountedPrice={item.discountedPrice}
                                    stock={item.stock}
                                    image={item.image}
                                    item_id={item._id}
                                    quantity={item.quantity}
                                    getUserCart={getUserCart}
                                />
                            );
                        })}
                    </div>
                )}
                <div className="min-w-[100%] text-right fixed bottom-0 border bg-gray-100 z-10">
                    <div className="inline mr-16">
                       Checkout Total Amount: {currencyFormat.format(totalAmountToPay)}
                    </div>
                    <div className="my-2 inline mr-10">
                        <Button
                            className="border py-2 px-5 my-3 bg-gray-300 disabled:text-gray-400 disabled:hover:shadow-sm rounded disabled:hover:bg-gray-300 shadow-sm hover:shadow-md hover:bg-white"
                            type="submit"
                            name="Checkout"
                            disabled={isDisabled}
                            onClick={() => {
                                activeLinkContext.setActiveLink("checkout");
                            }}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}
