import { IOrder } from "../../types/orderTypes";
import OrderItem from "./OrderItem";

export default function Order(props: IOrder) {
    return (
        <div>
            <div>
                {props.items.map((item) => {
                    return (
                        <OrderItem
                            productName={item.productName}
                            prod_id={item.prod_id}
                            quantity={item.quantity}
                            price={item.price}
                            image={item.image}
                            discount={item.discount}
                        />
                    );
                })}
            </div>
        </div>
    );
}
