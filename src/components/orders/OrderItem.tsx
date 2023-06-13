interface IOrderItem {
    prod_id: string;
    image: string;
    productName: string;
    price: number;
    discount: number;
    quantity: number;
}

export default function OrderItem(props: IOrderItem) {
    const totalAmountPerItem = (props.price - props.price * props.discount) * props.quantity;

    return (
        <div className="grid grid-cols-2">
            <div className="flex place-content-center col-span-1">
                <img src={props.image} className="max-h-[10em] min-h-[10em]" />
            </div>
            <div>
                <div className="border border-amber-500">{props.productName}</div>
                <div className="flex flex-col place-content-end h-[8.5em]">
                    <div>Price: ${props.price.toFixed(2)}</div>
                    <div>Quantity: {props.quantity}</div>
                    <div>Discount: {props.discount ? props.discount * 100 : 0}% </div>
                    <div>Total: ${totalAmountPerItem.toFixed(2)}</div>
                </div>
            </div>
        </div>
    );
}
