import { useState, useContext } from "react";
import { cancelOrderRequest } from "../../api/orderRequests";
import { IOrder } from "../../types/orderTypes";
import Button from "../shared/Button";
import OrderItemList from "./OrderItemList";
import { OrdersContext } from "../../providers/OrdersProvider";

export default function Orders(props: IOrder) {
    const [loading, setLaoding] = useState(false);

    const ordersContext = useContext(OrdersContext);

    const timeOrdered = new Date(props.createdAt).toLocaleString();

    const cancelOrder = async () => {
        setLaoding(true);
        await cancelOrderRequest(props._id);
        ordersContext.getOrders();
    };

    return (
        <div className="border my-10 p-3">
            {loading && "Loadin. . ."}
            {!loading && (
                <div>
                    <div>
                        {props.items.map((orderItem) => {
                            return (
                                <OrderItemList
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
                        <div>Total Amount To Pay: ${props.totalAmount.toFixed(2)}</div>
                        <div>
                            Status:
                            {` ${props.status.charAt(0).toUpperCase()}${props.status.slice(1)}`}
                        </div>
                        <div className="grid grid-cols-2 gap-2 mx-2">
                            <Button name={"Received"} className="border" type="button" />
                            <Button
                                name={"Cancel"}
                                className="border"
                                type="button"
                                clickEvent={cancelOrder}
                            />
                        </div>
                        {/* <div>Dated Issued: {timeOrdered}</div> */}
                        {/* <div>This Receipt is Valid for Five (5) Years After Date Of Issue</div> */}
                    </div>
                </div>
            )}
        </div>
    );
}
