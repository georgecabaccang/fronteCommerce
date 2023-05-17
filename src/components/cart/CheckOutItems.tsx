import { useContext } from "react";
import { CartContext } from "../../providers/CartProvider";
import CheckOutItem from "./CheckOutItem";

export default function CheckOutItems() {
    const cartContext = useContext(CartContext);

    return (
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
    );
}
