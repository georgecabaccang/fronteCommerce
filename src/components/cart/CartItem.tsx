import { IItemsProperties } from "../../types/cartTypes";

export default function CartItem(props: IItemsProperties) {
    return (
        <div>
            <div>{props.productName}</div>
            <div>{props.quantity}</div>
        </div>
    );
}
