import { useState, useEffect } from "react";
import Orders from "./Orders";
import Button from "../shared/Button";
import { useSearchParams } from "react-router-dom";
import { getOrdersRequest } from "../../api/orderRequests";
import useDecryptUser from "../../hooks/useDecryptUser";
import { IItemDetails } from "../../types/orderTypes";

interface IOrders {
    items: Array<IItemDetails>;
    totalAmount: number;
    status: string;
    _id: string;
    updatedAt: Date;
}

const FILTER_BY_PENDING = "pending";
const FILTER_BY_RECEIVED = "received";
const FILTER_BY_CANCELLED = "cancelled";

const BUTTON_CLASSNAME = "border rounded hover:shadow-md px-3 bg-gray-200";

export default function OrdersList() {
    const { userDetails, isNull } = useDecryptUser();
    const [orders, setOrders] = useState<Array<IOrders>>([]);
    const [searchParams, setSearchParams] = useSearchParams({ filter: "pending" });
    const [filterOrder, setFilterOrder] = useState<Array<IOrders>>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEmpty, setIsEmpty] = useState(false);

    const SEARCH_PARAMS_FILTER = searchParams.get("filter");

    let emptyOrderListByFilter: string = "";
    if (SEARCH_PARAMS_FILTER == FILTER_BY_PENDING) {
        emptyOrderListByFilter = "No Pending Orders";
    } else if (SEARCH_PARAMS_FILTER == FILTER_BY_RECEIVED) {
        emptyOrderListByFilter = "No Received Orders";
    } else {
        emptyOrderListByFilter = "No Cancelled Orders";
    }

    const getOrders = async () => {
        setIsLoading(true);
        if (userDetails && !isNull) {
            const response = await getOrdersRequest(userDetails.email);
            setOrders(response.orders);
            return setIsLoading(false);
        }
    };

    useEffect(() => {
        setIsLoading(true);
        if (!SEARCH_PARAMS_FILTER) {
            setSearchParams({ filter: FILTER_BY_PENDING });
        }

        if (orders.length != 0) {
            const filteredOrders = orders.filter((order) => {
                return order.status == SEARCH_PARAMS_FILTER;
            });
            setFilterOrder(filteredOrders);
            filteredOrders.length != 0 ? setIsEmpty(false) : setIsEmpty(true);
            return setIsLoading(false);
        }
        setIsEmpty(true);
        return setIsLoading(false);
    }, [orders, SEARCH_PARAMS_FILTER]);

    useEffect(() => {
        getOrders();
    }, [userDetails]);

    return (
        <div className="grid grid-cols-1 mx-10">
            <div className="flex justify-center min-w-100% gap-3 mt-3">
                <Button
                    name="Pending"
                    type="button"
                    className={`${BUTTON_CLASSNAME} ${
                        SEARCH_PARAMS_FILTER == FILTER_BY_PENDING ? "shadow-md bg-white" : ""
                    }`}
                    clickEvent={() => {
                        setSearchParams({ filter: FILTER_BY_PENDING });
                    }}
                />
                <Button
                    name="Received"
                    type="button"
                    className={`${BUTTON_CLASSNAME} ${
                        SEARCH_PARAMS_FILTER == FILTER_BY_RECEIVED ? "shadow-md bg-white" : ""
                    }`}
                    clickEvent={() => {
                        setSearchParams({ filter: FILTER_BY_RECEIVED });
                    }}
                />
                <Button
                    name="Cancelled"
                    type="button"
                    className={`${BUTTON_CLASSNAME} ${
                        SEARCH_PARAMS_FILTER == FILTER_BY_CANCELLED ? "shadow-md bg-white" : ""
                    }`}
                    clickEvent={() => {
                        setSearchParams({ filter: FILTER_BY_CANCELLED });
                    }}
                />
            </div>

            {isLoading && <div>Loading...</div>}
            {!isEmpty && !isLoading ? (
                <div className="max-w-[100%] grid place-content-center">
                    {filterOrder
                        .map((order) => {
                            return (
                                <Orders
                                    key={order._id}
                                    items={order.items}
                                    totalAmount={order.totalAmount}
                                    _id={order._id}
                                    updatedAt={order.updatedAt}
                                    status={order.status}
                                    setSearchParams={setSearchParams}
                                    getOrders={getOrders}
                                />
                            );
                        })
                        .reverse()}
                </div>
            ) : (
                !isLoading && (
                    <div className="my-10 place-self-center">{emptyOrderListByFilter}</div>
                )
            )}
        </div>
    );
}
