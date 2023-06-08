import { PropsWithChildren, createContext, useEffect, useState, useContext } from "react";
import { ICart, IICheckoutDetails, IItemInCheckout } from "../types/cartTypes";
import { ActiveLinkContext } from "./ActiveLinkProvider";

export const CartContext = createContext<ICart>({
    checkOutDetails: { items: [], totalAmountToPay: 0 },
    updateCheckout: () => {},
    resetCheckout: () => {},
});

export default function CartProvider(props: PropsWithChildren) {
    const [checkOutDetails, setCheckOutDetails] = useState<IICheckoutDetails>({
        items: [],
        totalAmountToPay: 0,
    });

    const activeLinkContext = useContext(ActiveLinkContext);

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
        if (activeLinkContext.link != "checkout") return resetCheckout();
    }, [activeLinkContext.link]);

    const CartPrroviderValues = {
        checkOutDetails: checkOutDetails,
        updateCheckout: updateCheckout,
        resetCheckout: resetCheckout,
    };

    return (
        <CartContext.Provider value={CartPrroviderValues}>{props.children}</CartContext.Provider>
    );
}
