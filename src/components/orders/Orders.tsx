import { useState } from "react";
import Button from "../shared/Button";
import OrderItem from "./OrderItem";
import useDecryptUser from "../../hooks/useDecryptUser";
import { cancelOrderRequest, receiveOrderRequest } from "../../api/orderRequests";
export interface IOrder {
    items: Array<{
        productName: string;
        prod_id: string;
        quantity: number;
        price: number;
        image: string;
        discount: number;
    }>;
    totalAmount: number;
    updatedAt: Date;
    _id: string;
    status: string;
    setSearchParams: (filter: { filter: string }) => void;
    getOrders: () => void;
}

export default function Orders(props: IOrder) {
    const { userDetails, isNull } = useDecryptUser();
    const [loading, setLaoding] = useState(false);

    const timeOrdered = new Date(props.updatedAt).toLocaleString();

    const cancel = async () => {
        if (userDetails && !isNull) {
            setLaoding(true);
            await cancelOrderRequest(props._id, userDetails?.email);
            props.getOrders();
            setLaoding(false);
            props.setSearchParams({ filter: "cancelled" });
        }
    };

    const receive = async () => {
        if (userDetails && !isNull) {
            setLaoding(true);
            await receiveOrderRequest(props._id, userDetails?.email);
            props.getOrders();
            setLaoding(false);
            props.setSearchParams({ filter: "received" });
        }
    };

    const isPaid = props.status === "received" ? "Paid" : "To Pay";
    const eitherReceivedOrCancelled = props.status != "received" && props.status != "cancelled";

    return (
        <div className="border my-10 p-3">
            {loading && "Loading. . ."}
            {!loading && (
                <div>
                    <div>
                        {props.items.map((orderItem) => {
                            return (
                                <OrderItem
                                    key={orderItem.prod_id}
                                    productName={orderItem.productName}
                                    prod_id={orderItem.prod_id}
                                    quantity={orderItem.quantity}
                                    price={orderItem.price}
                                    image={orderItem.image}
                                    discount={orderItem.discount}
                                />
                            );
                        })}
                    </div>
                    <div>
                        <div>
                            <p> {`Total Amount ${isPaid}: $${props.totalAmount.toFixed(2)}`}</p>
                        </div>
                        <div>
                            Status:
                            {` ${props.status.charAt(0).toUpperCase()}${props.status.slice(1)}`}
                        </div>
                        {eitherReceivedOrCancelled && (
                            <div className="grid grid-cols-2 gap-2 mx-2">
                                <Button
                                    name={"Received"}
                                    className="border"
                                    type="button"
                                    clickEvent={receive}
                                />
                                <Button
                                    name={"Cancel"}
                                    className="border"
                                    type="button"
                                    clickEvent={cancel}
                                />
                            </div>
                        )}
                        {props.status == "received" && (
                            <div>
                                <div>Dated Issued: {timeOrdered}</div>
                                <div>
                                    This Receipt is Valid for Five (5) Years After Date Of Issue
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
