import React from "react";
import { IItemsProperties } from "../../types/cartTypes";

export default function CartItem(props: IItemsProperties) {
    return <div>{props.productName}</div>;
}
