import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { ICheckOut } from "../types/cartTypes";
import { getPurchasesRequest } from "../api/purchaseRequests";
import { UserContext } from "./UserProvider";

interface IPurcahses {
    purchases: Array<ICheckOut>;
}

export const PruchaseContext = createContext<IPurcahses>({
    purchases: [],
});

export default function PurchaseProvider(props: PropsWithChildren) {
    const [purchases, setPurchases] = useState<Array<ICheckOut>>([]);

    const userContext = useContext(UserContext);

    const getPurchases = async () => {
        const response = await getPurchasesRequest();
        console.log(response);
        setPurchases(response);
    };

    useEffect(() => {
        getPurchases();
    }, [userContext.accessToken]);

    const purchaseContextValues = {
        purchases: purchases,
    };

    return (
        <PruchaseContext.Provider value={purchaseContextValues}>
            {props.children}
        </PruchaseContext.Provider>
    );
}
