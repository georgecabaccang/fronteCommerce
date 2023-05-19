import { useContext } from "react";
import { OrdersContext } from "../../providers/OrdersProvider";
import Order from "./order";

export default function OrderList() {
    const ordersContext = useContext(OrdersContext);

    return (
        <div>
            {ordersContext.orders.map((order) => {
                return <Order items={order.items} totalAmountToPay={order.totalAmountToPay} />;
            })}
        </div>
    );
}
