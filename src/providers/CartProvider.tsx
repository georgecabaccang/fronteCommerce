import { PropsWithChildren, createContext, useEffect, useState, useContext } from "react";
// import { IProductProperties } from "../types/productTypes";
import { ICart, IItemsProperties } from "../types/cartTypes";
import { getUserCart } from "../api/getUserCart";
import { UserContext } from "./UserProvider";

export const CartContext = createContext<ICart>({
    cart: [],
    // toCheckout: [],
});

export default function CartProvider(props: PropsWithChildren) {
    const [cart, setCart] = useState<Array<IItemsProperties>>([]);
    const [toCheckOut, setToCheckOut] = useState([1, 2, 3]);

    const userContext = useContext(UserContext);

    const getCartData = async () => {
        const data = await getUserCart();
        if (typeof data == "string") {
            return console.log("relogin muna");
        }
        setCart(data);
    };

    useEffect(() => {
        getCartData();
    }, [userContext.accessToken]);

    const CartPrroviderValues = {
        cart: cart,
        // toCheckout: toCheckOut,
    };

    return (
        <CartContext.Provider value={CartPrroviderValues}>{props.children}</CartContext.Provider>
    );
}
