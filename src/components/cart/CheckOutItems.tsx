import { useContext } from "react";
import { CartContext } from "../../providers/CartProvider";
import CheckOutItem from "./CheckOutItem";
import Button from "../shared/Button";
import { orderCheckOutRequest } from "../../api/orderRequests";

export default function CheckOutItems() {
    const cartContext = useContext(CartContext);

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault();

        const response = await orderCheckOutRequest(cartContext.toCheckOutItems);
        console.log(response);
    };
    return (
        <div>
            <form onSubmit={submitHandler}>
                <div>
                    {cartContext.toCheckOutItems.items.map((item) => {
                        return (
                            <CheckOutItem
                                key={item.prod_id}
                                prod_id={item.prod_id}
                                productName={item.productName}
                                price={item.price}
                                discount={item.discount}
                                quantity={item.quantity}
                                stock={item.stock}
                                image={item.image}
                            />
                        );
                    })}
                </div>
                <div>Total Amount: ${cartContext.toCheckOutItems.totalAmountToPay}</div>
                <div>
                    <Button className={"border py-2 px-4 bg-gray-200"} name="Order" type="submit" />
                </div>
            </form>
        </div>
    );
}
