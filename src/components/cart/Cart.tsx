import { useContext } from "react";
import { CartContext } from "../../providers/CartProvider";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";

export default function Cart() {
    const cartContext = useContext(CartContext);

    return (
        <div>
            Cart
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
            <div>Total Amount: ${cartContext.toCheckOutItems.totalAmountToPay.toFixed(2)}</div>
            <div className="my-2">
                <Link
                    className="border py-2 px-5 my-3 bg-blue-100"
                    to={"/cart/checkout"}
                    onClick={(event) => {
                        cartContext.toCheckOutItems.items.length === 0 && event.preventDefault();
                    }}
                >
                    Check Out
                </Link>
            </div>
        </div>
    );
}
