import { PropsWithChildren, createContext, useEffect, useState, useContext } from "react";
import { ICart, IICheckoutDetails, IItemInCheckout, IItemsProperties } from "../types/cartTypes";
import { UserContext } from "./UserProvider";
import { addToCartRequest } from "../api/cartRequests";

import { getUserCart } from "../api/cartRequests";
import { ActiveLinkContext } from "./ActiveLinkProvider";

export const CartContext = createContext<ICart>({
    cart: [],
    checkOutDetails: { items: [], totalAmountToPay: 0 },
    addToCart: () => {},
    updateCheckout: () => {},
    resetCheckout: () => {},
    getCartData: () => {},
});

export default function CartProvider(props: PropsWithChildren) {
    const [cart, setCart] = useState<Array<IItemsProperties>>([]);
    const [checkOutDetails, setCheckOutDetails] = useState<IICheckoutDetails>({
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

    const addToCart = async (productToBeAddedToCart: { prod_id: string; quantity: number }) => {
        await addToCartRequest(productToBeAddedToCart);
        getCartData();
    };

    const updateCheckout = async (checkOutItemDetails: IItemInCheckout, action: string) => {
        const priceComputation =
            (checkOutItemDetails.price - checkOutItemDetails.price * checkOutItemDetails.discount) *
            checkOutItemDetails.quantity;
        let newTotalAmountToPay: number = 0;

        if (action === "add") {
            newTotalAmountToPay = checkOutDetails.totalAmountToPay + priceComputation;
            setCheckOutDetails({
                items: [...checkOutDetails.items, checkOutItemDetails],
                totalAmountToPay: newTotalAmountToPay,
            });
            return;
        }
        if (action === "remove") {
            newTotalAmountToPay = checkOutDetails.totalAmountToPay - priceComputation;
            const newCheckoutItems = checkOutDetails.items.filter(
                (item) => item.prod_id != checkOutItemDetails.prod_id
            );
            setCheckOutDetails({
                items: newCheckoutItems,
                totalAmountToPay: newTotalAmountToPay,
            });
        }
    };

    const resetCheckout = () => {
        return setCheckOutDetails({
            items: [],
            totalAmountToPay: 0,
        });
    };

    useEffect(() => {
        console.log(activeLinkContext.link);
        if (activeLinkContext.link != "checkout") return resetCheckout();
    }, [activeLinkContext.link]);

    useEffect(() => {
        getCartData();
    }, [userContext.accessToken]);

    const CartPrroviderValues = {
        cart: cart,
        checkOutDetails: checkOutDetails,
        addToCart: addToCart,
        updateCheckout: updateCheckout,
        resetCheckout: resetCheckout,
        getCartData: getCartData,
    };

    return (
        <CartContext.Provider value={CartPrroviderValues}>{props.children}</CartContext.Provider>
    );
}
