import { PropsWithChildren, createContext, useEffect, useState, useContext } from "react";
import { ICart, ICheckOut, IItemsProperties } from "../types/cartTypes";
import { UserContext } from "./UserProvider";
import {
    addToCartRequest,
    deleteCheckOutInstanceRequest,
    removeFromCheckOutRequest,
} from "../api/cartRequests";

import { addToCheckOutRequest, getCheckOutItemsRequest, getUserCart } from "../api/cartRequests";
import { ActiveLinkContext } from "./ActiveLinkProvider";

export const CartContext = createContext<ICart>({
    cart: [],
    toCheckOutItems: { items: [], totalAmountToPay: 0 },
    addToCart: () => {},
    addToCheckOut: () => {},
    removeFromCheckOut: () => {},
    getCartData: () => {},
});

export default function CartProvider(props: PropsWithChildren) {
    const [cart, setCart] = useState<Array<IItemsProperties>>([]);
    const [toCheckOutItems, setToCheckOutItems] = useState<ICheckOut>({
        items: [],
        totalAmountToPay: 0,
    });

    const userContext = useContext(UserContext);
    const activeLinkContext = useContext(ActiveLinkContext);

    const getCartData = async () => {
        const response = await getUserCart();
        if (typeof response == "string") {
            return;
        }
        return setCart(response.items);
    };

    const getCheckOutItems = async () => {
        const response = await getCheckOutItemsRequest();
        if (typeof response == "string") {
            return;
        }
        return setToCheckOutItems(response);
    };

    const addToCart = async (productToBeAddedToCart: { prod_id: string; quantity: number }) => {
        await addToCartRequest(productToBeAddedToCart);
        getCartData();
    };

    const addToCheckOut = async (item: IItemsProperties) => {
        await addToCheckOutRequest(item);
        getCheckOutItems();
    };

    const removeFromCheckOut = async (prod_id: string) => {
        await removeFromCheckOutRequest(prod_id);
        getCheckOutItems();
    };

    const deleteCheckOutInstance = async () => {
        await deleteCheckOutInstanceRequest();
        setToCheckOutItems({
            items: [],
            totalAmountToPay: 0,
        });
    };

    useEffect(() => {
        if (toCheckOutItems.items.length != 0) deleteCheckOutInstance();
    }, [activeLinkContext.link]);

    useEffect(() => {
        getCheckOutItems();
        getCartData();
    }, [userContext.accessToken]);

    const CartPrroviderValues = {
        cart: cart,
        toCheckOutItems: toCheckOutItems,
        addToCart: addToCart,
        addToCheckOut: addToCheckOut,
        removeFromCheckOut: removeFromCheckOut,
        getCartData: getCartData,
    };

    return (
        <CartContext.Provider value={CartPrroviderValues}>{props.children}</CartContext.Provider>
    );
}
