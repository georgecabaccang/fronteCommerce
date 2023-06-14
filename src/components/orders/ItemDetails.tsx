import { Link } from "react-router-dom";
import { IItemDetails } from "../../types/orderTypes";

export default function ItemDetails(props: IItemDetails) {
    const AmountOfItem = props.discountedPrice
        ? props.discountedPrice * props.quantity
        : props.price * props.quantity;
    const currencyFormat = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });
    console.log(props);

    return (
        <div className="grid grid-cols-2 border min-w-[40em] items-center shadow-md rounded">
            <div className="flex place-content-center col-span-1 p-2">
                <Link to={`/shop/product/${props.prod_id}`}>
                    <img src={props.image} className="max-h-[10em] min-h-[10em] max-w-[15em]" />
                </Link>
            </div>
            <div>
                <div className="col-span-3">
                    <h3 className="font-semibold mb-1">{props?.productName}</h3>
                    <p className="inline text-[1em]">Price: </p>
                    <p
                        className={`inline ${
                            props?.discount && "line-through text-[0.8em] text-gray-400"
                        }`}
                    >
                        {props?.price && currencyFormat.format(props.price)}
                    </p>
                    {props?.discountedPrice && (
                        <div className="inline text-[1em]  ms-2">
                            {currencyFormat.format(props.discountedPrice)}{" "}
                            <div className="inline text-sm border px-2 rounded bg-yellow-200">
                                {props.discount * 100}% off
                            </div>
                        </div>
                    )}
                    <div className="my-2">Quantity: {props.quantity}</div>
                    <div>Total Amount: {currencyFormat.format(AmountOfItem)}</div>
                </div>
            </div>
        </div>
    );
}
