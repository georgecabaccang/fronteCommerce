import { IOrder } from "../../types/orderTypes";
import OrderItemList from "./OrderItemList";

export default function Orders(props: IOrder) {
    const timeOrdered = new Date(props.createdAt).toLocaleString();

    return (
        <div className="border">
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
            <div>{props.totalAmount}</div>
            <div>Dated Issued: {timeOrdered}</div>
            <div>This Receipt is Valid for Five (5) Years After Date Of Issue</div>
        </div>
    );
}
