import axios from "axios";
import { ICheckOut } from "../types/cartTypes";

export const orderCheckOutRequest = async (checkOutItems: ICheckOut) => {
    try {
        const { data } = await axios.post(
            "http://localhost:8002/orders/order-checkout",
            {
                email: localStorage.getItem("userEmail"),
                toPurchase: checkOutItems,
            },
            {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            }
        );
        console.log(data);
        return data;
    } catch (error) {
        if (error instanceof Error) return error.message;
    }
};

export const getOrdersRequest = async () => {
    try {
        const { data } = await axios.post(
            "http://localhost:8002/orders",
            { email: localStorage.getItem("userEmail") },
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        console.log(data);
        return data;
    } catch (error) {
        if (error instanceof Error) return error.message;
    }
};
