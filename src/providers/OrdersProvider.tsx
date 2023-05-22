import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserProvider";
import { getOrdersRequest } from "../api/orderRequests";
import { IOrder, IOrderList } from "../types/orderTypes";

export const OrdersContext = createContext<IOrderList>({
    orders: [],
});

export default function OrdersProvider(props: PropsWithChildren) {
    const [orders, setOrders] = useState<Array<IOrder>>([]);

    const userContext = useContext(UserContext);

    const getOrders = async () => {
        const response = await getOrdersRequest();
        setOrders(response.orders);
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
