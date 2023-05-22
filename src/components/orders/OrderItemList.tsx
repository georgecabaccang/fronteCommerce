import { IOrderItem } from "../../types/orderTypes";

export default function OrderItem(props: IOrderItem) {
    return <div className="border border-amber-500 m-2">{props.productName}</div>;
}
