import { useContext, useState, useEffect } from "react";
import { OrdersContext } from "../../providers/OrdersProvider";
import Orders from "./Orders";
import Button from "../shared/Button";
import { IOrder } from "../../types/orderTypes";

const FILTER_BY_PENDING = "pending";
const FILTER_BY_RECEIVED = "received";
const FILTER_BY_CANCELLED = "cancelled";

export default function OrdersList() {
    const ordersContext = useContext(OrdersContext);
    const [filterOrder, setFilterOrder] = useState<Array<IOrder>>(ordersContext.orders);

    let filteredOrders: Array<IOrder> = [
        {
            items: [],
            totalAmount: 0,
            updatedAt: new Date(),
            _id: "",
            status: "",
        },
    ];

    const filterBy = (filterBy: string) => {
        if (filterBy === FILTER_BY_PENDING) {
            filteredOrders = ordersContext.orders.filter((order) => {
                return order.status === FILTER_BY_PENDING;
            });
        }
        if (filterBy === FILTER_BY_RECEIVED) {
            filteredOrders = ordersContext.orders.filter((order) => {
                return order.status === FILTER_BY_RECEIVED;
            });
        }
        if (filterBy === FILTER_BY_CANCELLED) {
            filteredOrders = ordersContext.orders.filter((order) => {
                return order.status === FILTER_BY_CANCELLED;
            });
        }
        return setFilterOrder(filteredOrders);
    };

    useEffect(() => {
        filterBy(FILTER_BY_PENDING);
    }, [ordersContext.orders]);

    if (!ordersContext.orders) {
        return <div>Loading . . .</div>;
    }

    return (
        <div className="mx-10">
            <div>
                <Button
                    name="Pending"
                    type="button"
                    clickEvent={() => {
                        filterBy(FILTER_BY_PENDING);
                    }}
                />
                <Button
                    name="Received"
                    type="button"
                    clickEvent={() => {
                        filterBy(FILTER_BY_RECEIVED);
                    }}
                />
                <Button
                    name="Cancelled"
                    type="button"
                    clickEvent={() => {
                        filterBy(FILTER_BY_CANCELLED);
                    }}
                />
            </div>
            <div>
                {filterOrder.map((order) => {
                    return (
                        <Orders
                            key={order._id}
                            items={order.items}
                            totalAmount={order.totalAmount}
                            _id={order._id}
                            updatedAt={order.updatedAt}
                            status={order.status}
                        />
                    );
                })}
            </div>
        </div>
    );
}
