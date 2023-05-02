import { PropsWithChildren, createContext, useState } from "react";
import { IProductProperties } from "../types/productTypes";
import { ICart, IItemsProperties } from "../types/cartTypes";

export const CartContext = createContext<ICart>({
    cart: [],
    // toCheckout: [],
});

export default function CartProvider(props: PropsWithChildren) {
    const cartSub: IItemsProperties[] = [];
    const [cart, setCart] = useState<Array<IItemsProperties>>([]);
    const [toCheckOut, setToCheckOut] = useState([1, 2, 3]);

    const CartPrroviderValues = {
        cart: cart,
        // toCheckout: toCheckOut,
    };

    return (
        <CartContext.Provider value={CartPrroviderValues}>
            {props.children}
        </CartContext.Provider>
    );
}
