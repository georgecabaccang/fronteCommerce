import axios from "axios";
import { IICheckoutDetails } from "../types/cartTypes";

export const orderCheckOutRequest = async (checkOutItems: IICheckoutDetails) => {
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
        return data;
    } catch (error) {
        if (error instanceof Error) return error.message;
    }
};

export const cancelOrderRequest = async (order_id: string) => {
    try {
        const { data } = await axios.post(
            "http://localhost:8002/orders/cancel-order",
            { email: localStorage.getItem("userEmail"), order_id: order_id },
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        return data;
    } catch (error) {
        if (error instanceof Error) return error.message;
    }
};
