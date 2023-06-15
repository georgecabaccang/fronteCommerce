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
        <div className="grid grid-cols-1 mx-auto mt-5">
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

            {isLoading && (
                <div className="grid mt-5 text-center place-content-center min-h-[80vh]">
                    <div role="status">
                        <svg
                            aria-hidden="true"
                            className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                            />
                        </svg>
                    </div>
                </div>
            )}
            {!isEmpty && !isLoading ? (
                <div className="max-w-[100%] grid place-content-center mt-10">
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
