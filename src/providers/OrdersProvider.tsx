import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserProvider";
import { cancelOrderRequest, getOrdersRequest, receiveOrderRequest } from "../api/orderRequests";
import { IOrder, IOrderList } from "../types/orderTypes";

export const OrdersContext = createContext<IOrderList>({
    orders: [],
    getOrders: () => {},
    cancelOrder: () => {},
    receiveOrder: () => {},
});

export default function OrdersProvider(props: PropsWithChildren) {
    const [orders, setOrders] = useState<Array<IOrder>>([]);

    const userContext = useContext(UserContext);

    const getOrders = async () => {
        const response = await getOrdersRequest(userContext.userProfileDetails.email);
        setOrders(response.orders);
    };

    const cancelOrder = async (order_id: string) => {
        await cancelOrderRequest(order_id, userContext.userProfileDetails.email);
        getOrders();
    };

    const receiveOrder = async (order_id: string) => {
        await receiveOrderRequest(order_id, userContext.userProfileDetails.email);
        getOrders();
    };

    // MAY FIX SOME BUGS@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    // useEffect(() => {
    //     if (userContext.accessToken) {
    //         getOrders();
    //     }
    // }, [userContext.accessToken]);

    useEffect(() => {
        getOrders();
    }, [userContext.userProfileDetails]);

    const ordersContextValues = {
        orders: orders,
        getOrders: getOrders,
        cancelOrder: cancelOrder,
        receiveOrder: receiveOrder,
    };

    return (
        <OrdersContext.Provider value={ordersContextValues}>
            {props.children}
        </OrdersContext.Provider>
    );
}
