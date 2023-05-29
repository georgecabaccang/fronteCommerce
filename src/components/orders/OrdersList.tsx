import { useContext, useState } from "react";
import { OrdersContext } from "../../providers/OrdersProvider";
import Orders from "./Orders";
import Button from "../shared/Button";
import { IOrder } from "../../types/orderTypes";

const filterByReceived = "received";

export default function OrdersList() {
    // const [filterOrder, setFilterOrder] = useState<IOrder>();
    const ordersContext = useContext(OrdersContext);

    const filterBy = (filterBy: string) => {
        let filteredOrders;
        if (filterBy === filterByReceived) {
            filteredOrders = ordersContext.orders.filter((order) => {
                return order.status === filterByReceived;
            });
        }

        // setFilterOrder(filteredOrders);
    };

    if (!ordersContext.orders) {
        return <div>Loading . . .</div>;
    }

    return (
        <div className="mx-10">
            <Button
                name="Received"
                onClick={() => {
                    filterBy(filterByReceived);
                }}
            />
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
