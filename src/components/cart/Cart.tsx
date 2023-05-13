import { useContext } from "react";
import { CartContext } from "../../providers/CartProvider";
import CartItem from "./CartItem";

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
                            productID={item.productID}
                            quantity={item.quantity}
                        />
                    );
                })}
            </div>
        </div>
    );
}
