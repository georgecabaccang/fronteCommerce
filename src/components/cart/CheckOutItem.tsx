import { IItemInCheckout } from "../../types/cartTypes";

export default function CheckOutItem(props: IItemInCheckout) {
    let totalPrice = props?.discountedPrice ? props?.discountedPrice : props?.price;
    if (props?.price) {
        totalPrice = totalPrice! * props.quantity;
    }

    const currencyFormat = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    return (
        <div className="border grid grid-cols-5 py-4 mx-10 my-5 shadow-sm">
            <div className="flex place-content-center col-span-2">
                <img src={props?.image} className="max-h-[10em] min-h-[10em]" />
            </div>

            <div className="col-span-3">
                <h3 className="font-semibold mb-1">{props?.productName}</h3>
                <p className="inline text-[1em]">Price: </p>
                <p
                    className={`inline ${
                        props?.discount && "line-through text-[0.8em] text-gray-400"
                    }`}
                >
                    ${props?.price && props?.price.toFixed(2)}
                </p>
                {props?.discountedPrice && (
                    <div className="inline text-[1em]  ms-2">
                        <div className="inline me-2">${props?.discountedPrice.toFixed(2)}</div>
                        <div className="inline text-sm border px-2 rounded bg-yellow-200">
                            {props.discount * 100}% off
                        </div>
                    </div>
                )}
                <div className="my-2">Quantity: {props.quantity}</div>
                <div>Total: {currencyFormat.format(totalPrice)}</div>
            </div>
        </div>
    );
}
