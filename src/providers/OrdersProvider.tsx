import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { cancelOrderRequest, getOrdersRequest, receiveOrderRequest } from "../api/orderRequests";
import { IOrder, IOrderList } from "../types/orderTypes";
import useDecryptUser from "../hooks/useDecryptUser";

export const OrdersContext = createContext<IOrderList>({
    orders: [],
    getOrders: () => {},
    cancelOrder: () => {},
    receiveOrder: () => {},
});

export default function OrdersProvider(props: PropsWithChildren) {
    const { userDetails, isNull } = useDecryptUser();
    const [orders, setOrders] = useState<Array<IOrder>>([]);

    const getOrders = async () => {
        if (userDetails && !isNull) {
            const response = await getOrdersRequest(userDetails.email);
            setOrders(response.orders);
        }
    };

    const cancelOrder = async (order_id: string) => {
        if (userDetails && !isNull) {
            await cancelOrderRequest(order_id, userDetails.email);
            getOrders();
        }
    };

    const receiveOrder = async (order_id: string) => {
        if (userDetails && !isNull) {
            await receiveOrderRequest(order_id, userDetails.email);
            getOrders();
        }
    };

    useEffect(() => {
        getOrders();
    }, [userDetails]);

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
