import { useContext, FormEvent, useState, useEffect } from "react";
import { CartContext } from "../../providers/CartProvider";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";
import Button from "../shared/Button";
import { ActiveLinkContext } from "../../providers/ActiveLinkProvider";

const CHECKOUT_URL = "/cart/checkout";

export default function Cart() {
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

    return (
        <div>
            Cart
            <form onSubmit={checkoutHandler}>
                <div>
                    {cartContext?.cart?.map((item) => {
                        return (
                            <CartItem
                                key={item._id}
                                productName={item.productName}
                                description={item.description}
                                price={item.price}
                                discount={item.discount}
                                stock={item.stock}
                                image={item.image}
                                prod_id={item.prod_id}
                                quantity={item.quantity}
                            />
                        );
                    })}
                </div>
                <div>Total Amount: ${cartContext.checkOutDetails.totalAmountToPay.toFixed(2)}</div>
                <div className="my-2">
                    <Button
                        className="border py-2 px-5 my-3 bg-blue-100"
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
