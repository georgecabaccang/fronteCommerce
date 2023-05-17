interface ICheckoutProps {
    prod_id: string;
    productName: string;
    price: number;
    discount: number;
    quantity: number;
    stock: number;
    image: string;
}

export default function CheckOutItem(props: ICheckoutProps) {
    return (
        <div className="border grid grid-cols-5 py-4 mx-10 my-5">
            <div>{props.productName}</div>
            <div>Price: ${props.price}</div>
            {props.discount != 0 && <div>Discount: {props.discount * 100}%</div>}
            <div>Quantity: {props.quantity}</div>
            <div>Total: ${(props.price * props.quantity).toFixed(2)}</div>
        </div>
    );
}
