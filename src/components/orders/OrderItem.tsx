import React from "react";
import { IOrderItem } from "../../types/orderTypes";

export default function OrderItem(props: IOrderItem) {
    return <div>{props.productName}</div>;
}
