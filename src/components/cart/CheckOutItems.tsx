import { useContext } from "react";
import { CartContext } from "../../providers/CartProvider";
import CheckOutItem from "./CheckOutItem";
import Button from "../shared/Button";
import { orderCheckOutRequest } from "../../api/orderRequests";
import { OrdersContext } from "../../providers/OrdersProvider";
import { useNavigate } from "react-router-dom";

const CART_URL = "/cart";
const ORDERS_URL = "/orders";

export default function CheckOutItems() {
    const cartContext = useContext(CartContext);
    const odersContext = useContext(OrdersContext);

    const navigate = useNavigate();

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        await orderCheckOutRequest(cartContext.checkOutDetails);
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
                    <Button className={"border py-2 px-4 bg-gray-200"} name="Order" type="submit" />
                    <Button
                        className={"border py-2 px-4 bg-gray-200"}
                        name="Cancel"
                        type="button"
                        clickEvent={cancelCheckoutHandler}
                    />
                </div>
            </form>
        </div>
    );
}
