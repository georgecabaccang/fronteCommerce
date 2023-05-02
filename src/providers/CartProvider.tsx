import { PropsWithChildren, createContext, useState } from "react";

const CartContext = createContext({
    cart: [],
    toCheckout: [],
});

export default function CartProvider(props: PropsWithChildren) {
    const [cart, setCart] = useState([]);

    const CartPrroviderValues = {
        cart: [],
        toCheckout: [],
    };

    return (
        <CartContext.Provider value={CartPrroviderValues}>
            {props.children}
        </CartContext.Provider>
    );
}
