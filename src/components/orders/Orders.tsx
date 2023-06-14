import { useState } from "react";
import Button from "../shared/Button";
import useDecryptUser from "../../hooks/useDecryptUser";
import { cancelOrderRequest, receiveOrderRequest } from "../../api/orderRequests";
import { Link } from "react-router-dom";
import { IOrder } from "../../types/orderTypes";

export default function Orders(props: IOrder) {
    const { userDetails, isNull } = useDecryptUser();
    const [loading, setLaoding] = useState(false);
    const productDetails = props.items[0];

    const timeOrdered = new Date(props.updatedAt).toLocaleString();

    const totalAmountToPay = props.totalAmount;
    const currencyFormat = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

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
            const response = await receiveOrderRequest(props._id, userDetails?.email);
            console.log(response);
            props.getOrders();
            setLaoding(false);
            props.setSearchParams({ filter: "received" });
        }
    };

    const isPaid = props.status === "received" ? "Paid" : "To Pay";
    const eitherReceivedOrCancelled = props.status != "received" && props.status != "cancelled";

    return (
        <div className="border my-10 p-3 min-w-[40em] shadow-md">
            {loading && "Loading. . ."}
            {!loading && (
                <div>
                    <div className="grid grid-cols-2">
                        <div className="flex justify-center mb-5">
                            <img
                                src={productDetails.image}
                                alt={productDetails.productName}
                                className="max-h-[5em] min-h-[5em] max-w-[8em]"
                            />
                        </div>
                        <div>
                            <div>{productDetails.productName}</div>
                            <p className="inline text-[1em]">Price: </p>
                            <p
                                className={`inline ${
                                    productDetails?.discount &&
                                    "line-through text-[0.8em] text-gray-400"
                                }`}
                            >
                                {currencyFormat.format(productDetails!.price)}
                            </p>
                            {productDetails?.discount != 0 && (
                                <div className="inline text-[1em] ms-2 m">
                                    <div className="inline me-2">
                                        {currencyFormat.format(productDetails!.discountedPrice)}
                                    </div>
                                    <div className="inline text-sm border px-2 rounded bg-yellow-200">
                                        {productDetails!.discount * 100}% off
                                    </div>
                                </div>
                            )}
                            <div>Quantity: {productDetails.quantity}</div>
                        </div>
                        <div>
                            <Link to={`/orders/${props._id}/view-order/`}>
                                <div className="text-orange-500">{props.items.length} item(s)</div>
                            </Link>
                            <div>
                                {`Total Amount ${isPaid}: ${currencyFormat.format(
                                    totalAmountToPay
                                )}`}
                            </div>
                        </div>
                        <div>
                            Status:
                            {` ${props.status.charAt(0).toUpperCase()}${props.status.slice(1)}`}
                        </div>
                    </div>
                    <div>
                        {eitherReceivedOrCancelled && (
                            <div className="grid grid-cols-2 gap-2 mx-2 mt-3">
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
