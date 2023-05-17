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
            <div>
                <Link to={"/cart/checkout"}>Check Out</Link>
            </div>
        </div>
    );
}
