import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { ICheckOut } from "../types/cartTypes";
import { UserContext } from "./UserProvider";
import { getOrdersRequest } from "../api/orderRequests";

interface IOrders {
    orders: Array<ICheckOut>;
}

export const OrdersContext = createContext<IOrders>({
    orders: [],
});

export default function OrdersProvider(props: PropsWithChildren) {
    const [orders, setOrders] = useState<Array<ICheckOut>>([]);

    const userContext = useContext(UserContext);

    const getOrders = async () => {
        const response = await getOrdersRequest();
        console.log(response);
        setOrders(response);
    };

    useEffect(() => {
        getOrders();
    }, [userContext.accessToken]);

    const ordersContextValues = {
        orders: orders,
    };

    return (
        <OrdersContext.Provider value={ordersContextValues}>
            {props.children}
        </OrdersContext.Provider>
    );
}
