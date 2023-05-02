import React, { useContext } from "react";
import { CartContext } from "../../providers/CartProvider";
import CartItem from "../cart/CartItem";

export default function Cart() {
    const cartContext = useContext(CartContext);
    return (
        <div>
            Cart
            <div>
                {cartContext?.cart?.map((item) => {
                    return (
                        <CartItem
                            productName={item.productName}
                            description={item.description}
                            price={item.price}
                            discount={item.discount}
                            stock={item.stock}
                            image={item.image}
                            _id={item._id}
                            quantity={item.quantity}
                        />
                    );
                })}
            </div>
        </div>
    );
}
