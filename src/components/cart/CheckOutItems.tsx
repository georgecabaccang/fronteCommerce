import { useContext } from "react";
import { CartContext } from "../../providers/CartProvider";
import CheckOutItem from "./CheckOutItem";
import Button from "../shared/Button";
import { orderCheckOutRequest } from "../../api/orderRequests";
import { useNavigate } from "react-router-dom";
import useDecryptUser from "../../hooks/useDecryptUser";

const CART_URL = "/cart";
const ORDERS_URL = "/orders";
const BUTTON_CLASSNAME = "border py-2 px-4 bg-blue-200 hover:bg-blue-500 rounded";

export default function CheckOutItems() {
    const { userDetails, isNull } = useDecryptUser();
    const cartContext = useContext(CartContext);

    const navigate = useNavigate();

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        if (userDetails && !isNull) {
            const response = await orderCheckOutRequest(
                cartContext.checkOutDetails,
                userDetails.email
            );
            if (response == "OK") {
                cartContext.resetCheckout();
                return navigate(ORDERS_URL);
            }
            return console.log("Something went wrong");
        }
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
                                image={item.image}
                                productName={item.productName}
                                description={item.description}
                                price={item.price}
                                discount={item.discount}
                                discountedPrice={item.discountedPrice}
                                quantity={item.quantity}
                            />
                        );
                    })}
                </div>
                <div>Total Amount: ${cartContext.checkOutDetails.totalAmountToPay.toFixed(2)}</div>
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
