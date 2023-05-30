import { useContext, useState, useEffect } from "react";
import { OrdersContext } from "../../providers/OrdersProvider";
import Orders from "./Orders";
import Button from "../shared/Button";
import { IOrder } from "../../types/orderTypes";
import { useNavigate, useSearchParams } from "react-router-dom";

const FILTER_BY_PENDING = "pending";
const FILTER_BY_RECEIVED = "received";
const FILTER_BY_CANCELLED = "cancelled";

export default function OrdersList() {
    const ordersContext = useContext(OrdersContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const [filterOrder, setFilterOrder] = useState<Array<IOrder>>(ordersContext.orders);
    const [isLoading, setIsLoading] = useState(true);
    const [isEmpty, setIsEmpty] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        let filteredOrders: Array<IOrder> = filterOrder;
        console.log(filteredOrders);
        if (searchParams.get("filter") === FILTER_BY_PENDING) {
            filteredOrders = ordersContext.orders.filter((order) => {
                return order.status === FILTER_BY_PENDING;
            });
        }
        if (searchParams.get("filter") === FILTER_BY_RECEIVED) {
            filteredOrders = ordersContext.orders.filter((order) => {
                return order.status === FILTER_BY_RECEIVED;
            });
        }
        if (searchParams.get("filter") === FILTER_BY_CANCELLED) {
            filteredOrders = ordersContext.orders.filter((order) => {
                return order.status === FILTER_BY_CANCELLED;
            });
        }

        if (filteredOrders.length != 0) {
            setFilterOrder(filteredOrders);
            setIsEmpty(false);
            return setIsLoading(false);
        } else {
            setIsEmpty(true);
            return setIsLoading(false);
        }
    }, [searchParams.get("filter")]);

    useEffect(() => {
        const preFilteredOrders = ordersContext.orders.filter((order) => {
            return order.status === searchParams.get("filter");
        });
        if (preFilteredOrders.length != 0) {
            setFilterOrder(preFilteredOrders);
            setIsEmpty(false);
            return setIsLoading(false);
        } else {
            setIsEmpty(true);
            return setIsLoading(false);
        }
    }, [ordersContext.orders]);

    if (!localStorage.getItem("token")) {
        return navigate("/login");
    }

    return (
        <div className="mx-10">
            <div>
                <Button
                    name="Pending"
                    type="button"
                    clickEvent={() => {
                        setSearchParams({ filter: FILTER_BY_PENDING });
                    }}
                />
                <Button
                    name="Received"
                    type="button"
                    clickEvent={() => {
                        setSearchParams({ filter: FILTER_BY_RECEIVED });
                    }}
                />
                <Button
                    name="Cancelled"
                    type="button"
                    clickEvent={() => {
                        setSearchParams({ filter: FILTER_BY_CANCELLED });
                    }}
                />
            </div>
            <div>
                {filterOrder.length == 0 && isLoading ? (
                    <div>Loading...</div>
                ) : isEmpty ? (
                    <div>Empty</div>
                ) : (
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
                )}
            </div>
        </div>
    );
}
