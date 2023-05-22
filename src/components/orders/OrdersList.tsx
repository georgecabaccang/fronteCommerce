import { useContext } from "react";
import { OrdersContext } from "../../providers/OrdersProvider";
import Orders from "./Orders";

export default function OrdersList() {
    const ordersContext = useContext(OrdersContext);

    return (
        <div>
            {ordersContext.orders.map((order) => {
                return (
                    <Orders
                        key={order._id}
                        items={order.items}
                        totalAmount={order.totalAmount}
                        _id={order._id}
                        createdAt={order.createdAt}
                        status={order.status}
                    />
                );
            })}
        </div>
    );
}
