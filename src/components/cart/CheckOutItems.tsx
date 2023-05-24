import { useContext } from "react";
import { CartContext } from "../../providers/CartProvider";
import CheckOutItem from "./CheckOutItem";
import Button from "../shared/Button";
import { orderCheckOutRequest } from "../../api/orderRequests";
import { OrdersContext } from "../../providers/OrdersProvider";
import { useNavigate } from "react-router-dom";

export default function CheckOutItems() {
    const cartContext = useContext(CartContext);
    const odersContext = useContext(OrdersContext);

    const navigate = useNavigate();

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        await orderCheckOutRequest(cartContext.checkOutDetails);
        odersContext.getOrders();
        navigate("/orders");
    };

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
                </div>
            </form>
        </div>
    );
}
