import { PropsWithChildren, createContext, useEffect, useState, useContext } from "react";
import { ICart, ICheckOut, IItemsProperties } from "../types/cartTypes";
import { UserContext } from "./UserProvider";
import { addToCartRequest } from "../api/cartRequests";

import { addToCheckOutRequest, getCheckOutItemsRequest, getUserCart } from "../api/cartRequests";

export const CartContext = createContext<ICart>({
    cart: [],
    toCheckOutItems: { items: [], totalAmountToPay: 0 },
    addToCart: () => {},
    addToCheckOut: () => {},
    getCartData: () => {},
});

export default function CartProvider(props: PropsWithChildren) {
    const [cart, setCart] = useState<Array<IItemsProperties>>([]);
    const [toCheckOutItems, setToCheckOutItems] = useState<ICheckOut>({
        items: [],
        totalAmountToPay: 0,
    });

    const userContext = useContext(UserContext);

    const getCartData = async () => {
        const response = await getUserCart();
        if (typeof response == "string") {
            return console.log(response);
        }
        return setCart(response);
    };

    const getCheckOutItems = async () => {
        const response = await getCheckOutItemsRequest();
        if (typeof response == "string") {
            return console.log(response);
        }
        return setToCheckOutItems(response);
    };

    const addToCart = async (productToBeAddedToCart: IItemsProperties) => {
        await addToCartRequest(productToBeAddedToCart);
        getCartData();
    };

    const addToCheckOut = async (item: IItemsProperties) => {
        await addToCheckOutRequest(item);
        getCheckOutItems();
    };

    useEffect(() => {
        getCheckOutItems();
        getCartData();
    }, [userContext.accessToken]);

    const CartPrroviderValues = {
        cart: cart,
        toCheckOutItems: toCheckOutItems,
        addToCart: addToCart,
        addToCheckOut: addToCheckOut,
        getCartData: getCartData,
    };

    return (
        <CartContext.Provider value={CartPrroviderValues}>{props.children}</CartContext.Provider>
    );
}
