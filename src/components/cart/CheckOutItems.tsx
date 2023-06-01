import { useContext } from "react";
import { CartContext } from "../../providers/CartProvider";
import CheckOutItem from "./CheckOutItem";
import Button from "../shared/Button";
import { orderCheckOutRequest } from "../../api/orderRequests";
import { OrdersContext } from "../../providers/OrdersProvider";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../providers/UserProvider";

const CART_URL = "/cart";
const ORDERS_URL = "/orders";
const BUTTON_CLASSNAME = "border py-2 px-4 bg-gray-200";

export default function CheckOutItems() {
    const cartContext = useContext(CartContext);
    const odersContext = useContext(OrdersContext);
    const userContext = useContext(UserContext);

    const navigate = useNavigate();

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        await orderCheckOutRequest(
            cartContext.checkOutDetails,
            userContext.userProfileDetails.email
        );
        cartContext.getCartData();
        cartContext.resetCheckout();
        odersContext.getOrders();
        navigate(ORDERS_URL);
    };

    const cancelCheckoutHandler = () => {
        cartContext.resetCheckout();
        navigate(CART_URL);
    };

    if (cartContext.checkOutDetails.items.length === 0) {
        navigate(CART_URL);
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <div>
                    {cartContext.checkOutDetails.items.map((item) => {
                        return (
                            <CheckOutItem
                                key={item.prod_id}
                                prod_id={item.prod_id}
                                productName={item.productName}
                                price={item.price}
                                discount={item.discount}
                                quantity={item.quantity}
                                image={item.image}
                            />
                        );
                    })}
                </div>
                <div>Total Amount: ${cartContext.checkOutDetails.totalAmountToPay}</div>
                <div>
                    <Button className={BUTTON_CLASSNAME} name="Order" type="submit" />
                    <Button
                        className={BUTTON_CLASSNAME}
                        name="Cancel"
                        type="button"
                        clickEvent={cancelCheckoutHandler}
                    />
                </div>
            </form>
        </div>
    );
}
