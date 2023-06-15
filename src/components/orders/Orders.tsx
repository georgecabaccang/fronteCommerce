import { useState } from "react";
import Button from "../shared/Button";
import useDecryptUser from "../../hooks/useDecryptUser";
import { cancelOrderRequest, receiveOrderRequest } from "../../api/orderRequests";
import { Link } from "react-router-dom";
import { IOrder } from "../../types/orderTypes";
import Swal from "sweetalert2";

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
            Swal.fire({
                icon: "info",
                title: "You Cancelled An Order",
            });
            setLaoding(false);
            props.setSearchParams({ filter: "cancelled" });
        }
    };

    const receive = async () => {
        if (userDetails && !isNull) {
            setLaoding(true);
            await receiveOrderRequest(props._id, userDetails?.email);
            props.getOrders();
            Swal.fire({
                icon: "info",
                title: "You Received An Order",
            });
            setLaoding(false);
            props.setSearchParams({ filter: "received" });
        }
    };

    const isPaid = props.status === "received" ? "Paid" : "To Pay";
    const eitherReceivedOrCancelled = props.status != "received" && props.status != "cancelled";

    return (
        <div className="border mb-4 p-3 min-w-[40em] shadow-md">
            {loading && (
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
                                        {currencyFormat.format(productDetails?.discountedPrice)}
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
