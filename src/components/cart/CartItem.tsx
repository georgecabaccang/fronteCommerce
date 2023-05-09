import { useState } from "react";

import { IItemsProperties } from "../../types/cartTypes";
import Quantity from "../shared/Quantity";

export default function CartItem(props: IItemsProperties) {
    const [quantity, setQuantity] = useState<string | number>(props.quantity);

    return (
        <div className="border grid grid-cols-5 py-4 mx-10 my-5">
            <div className="flex place-content-center col-span-2">
                <img src={props.image} className="max-h-[10em] min-h-[10em]" />
            </div>
            <div className="col-span-3">
                <div>{props.productName}</div>
                <div>
                    <Quantity quantity={quantity} setQuantity={setQuantity} />
                </div>
            </div>
        </div>
    );
}
