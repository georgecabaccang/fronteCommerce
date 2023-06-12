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
        <div>
            Cart
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
                <div>Total Amount: ${cartContext.checkOutDetails.totalAmountToPay.toFixed(2)}</div>
                <div className="my-2">
                    <Button
                        className="border py-2 px-5 my-3 bg-blue-200 disabled:bg-gray-400 rounded"
                        type="submit"
                        name="Checkout"
                        disabled={isDisabled}
                        onClick={() => {
                            activeLinkContext.setActiveLink("checkout");
                        }}
                    />
                </div>
            </form>
        </div>
    );
}
