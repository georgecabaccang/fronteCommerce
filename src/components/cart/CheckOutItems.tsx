import { useContext } from "react";
import { CartContext } from "../../providers/CartProvider";
import CheckOutItem from "./CheckOutItem";
import Button from "../shared/Button";
import { orderCheckOutRequest } from "../../api/orderRequests";
import { useNavigate } from "react-router-dom";
import useDecryptUser from "../../hooks/useDecryptUser";

const CART_URL = "/cart";
const ORDERS_URL = "/orders";
const BUTTON_CLASSNAME =
    "border w-[6em] py-2 px-5 my-3 bg-gray-300 disabled:text-gray-400 disabled:hover:shadow-sm rounded disabled:hover:bg-gray-300 shadow-sm hover:shadow-md hover:bg-white";

export default function CheckOutItems() {
    const { userDetails, isNull } = useDecryptUser();
    const cartContext = useContext(CartContext);

    const navigate = useNavigate();

    const totalAmountToPay = cartContext.checkOutDetails.totalAmountToPay;
    const currencyFormat = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

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
                <div className="min-w-[100%] text-right fixed bottom-0 border bg-gray-100 z-10">
                    <div className="inline mr-10">
                        Total Amount: {currencyFormat.format(totalAmountToPay)}
                    </div>
                    <div className="my-2 inline mr-10">
                        <div className="inline mx-2">
                            <Button className={BUTTON_CLASSNAME} name="Order" type="submit" />
                        </div>
                        <div className="inline ml-2">
                            <Button
                                className={BUTTON_CLASSNAME}
                                name="Cancel"
                                type="button"
                                clickEvent={cancelCheckoutHandler}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
