import { useContext, useState, useEffect } from "react";
import { OrdersContext } from "../../providers/OrdersProvider";
import Orders from "./Orders";
import Button from "../shared/Button";
import { IOrder } from "../../types/orderTypes";
import { useSearchParams } from "react-router-dom";

const FILTER_BY_PENDING = "pending";
const FILTER_BY_RECEIVED = "received";
const FILTER_BY_CANCELLED = "cancelled";

const BUTTON_CLASSNAME = "border rounded hover:shadow-md px-3";

// REFACTOR TO MAKE CODE SHORTER. ALSO ADDED STYLINGS FOR BUTTTONS@@@@@@@@@

export default function OrdersList() {
    const ordersContext = useContext(OrdersContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const [filterOrder, setFilterOrder] = useState<Array<IOrder>>(ordersContext.orders);
    const [isLoading, setIsLoading] = useState(true);
    const [isEmpty, setIsEmpty] = useState(false);

    const SEARCH_PARAMS_FILTER = searchParams.get("filter");

    useEffect(() => {
        setIsLoading(true);
        if (!SEARCH_PARAMS_FILTER) {
            setSearchParams({ filter: FILTER_BY_PENDING });
        }

        if (ordersContext.orders) {
            const filteredOrders = ordersContext.orders.filter((order) => {
                return order.status === SEARCH_PARAMS_FILTER;
            });
            setFilterOrder(filteredOrders);

            filteredOrders.length != 0 ? setIsEmpty(false) : setIsEmpty(true);
            return setIsLoading(false);
        }
    }, [SEARCH_PARAMS_FILTER, ordersContext.orders]);

    return (
        <div className="mx-10 place-content-center">
            <div className="flex justify-center min-w-100% gap-3 mt-3">
                <Button
                    name="Pending"
                    type="button"
                    className={`${BUTTON_CLASSNAME} ${
                        SEARCH_PARAMS_FILTER == FILTER_BY_PENDING ? "shadow-md" : ""
                    }`}
                    clickEvent={() => {
                        setSearchParams({ filter: FILTER_BY_PENDING });
                    }}
                />
                <Button
                    name="Received"
                    type="button"
                    className={`${BUTTON_CLASSNAME} ${
                        SEARCH_PARAMS_FILTER == FILTER_BY_RECEIVED ? "shadow-md" : ""
                    }`}
                    clickEvent={() => {
                        setSearchParams({ filter: FILTER_BY_RECEIVED });
                    }}
                />
                <Button
                    name="Cancelled"
                    type="button"
                    className={`${BUTTON_CLASSNAME} ${
                        SEARCH_PARAMS_FILTER == FILTER_BY_CANCELLED ? "shadow-md" : ""
                    }`}
                    clickEvent={() => {
                        setSearchParams({ filter: FILTER_BY_CANCELLED });
                    }}
                />
            </div>

            {isLoading && <div>Loading...</div>}
            {!isEmpty && !isLoading ? (
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
            ) : (
                !isLoading && <div>Empty</div>
            )}
        </div>
    );
}
