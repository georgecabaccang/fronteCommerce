import axios from "axios";
import { IICheckoutDetails } from "../types/cartTypes";

export const orderCheckOutRequest = async (checkOutDetails: IICheckoutDetails) => {
    try {
        const { data } = await axios.post(
            "https://backend-commerce.vercel.app/orders/order-checkout",
            {
                email: localStorage.getItem("userEmail"),
                toPurchase: checkOutDetails,
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
            "https://backend-commerce.vercel.app/orders",
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
            "https://backend-commerce.vercel.app/orders/cancel-order",
            { email: localStorage.getItem("userEmail"), order_id: order_id },
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        return data;
    } catch (error) {
        if (error instanceof Error) return error.message;
    }
};

export const receiveOrderRequest = async (order_id: string) => {
    try {
        const { data } = await axios.post(
            "https://backend-commerce.vercel.app/orders/order-status-received",
            { email: localStorage.getItem("userEmail"), order_id: order_id },
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        return data;
    } catch (error) {
        if (error instanceof Error) return error.message;
    }
};
