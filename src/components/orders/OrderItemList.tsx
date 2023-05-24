import { IOrderItem } from "../../types/orderTypes";

export default function OrderItem(props: IOrderItem) {
    const totalAmountPerItem = (props.price - props.price * props.discount) * props.quantity;
    console.log(typeof props.discount);

    return (
        <div className="grid grid-cols-2">
            <div className="flex place-content-center col-span-1">
                <img src={props.image} className="max-h-[10em] min-h-[10em]" />
            </div>
            <div>
                <div className="border border-amber-500">{props.productName}</div>
                <div>Price: ${props.price}</div>
                <div>Quantity: {props.quantity}</div>
                <div>Discount: {props.discount ? props.discount * 100 : 0}% </div>
                <div>Total: ${totalAmountPerItem.toFixed(2)}</div>
            </div>
        </div>
    );
}
