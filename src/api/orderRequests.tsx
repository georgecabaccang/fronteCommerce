import axios from "axios";
import { IICheckoutDetails } from "../types/cartTypes";

export const orderCheckOutRequest = async (checkOutDetails: IICheckoutDetails, email: string) => {
    try {
        const { data } = await axios.post(
            "https://backend-commerce.vercel.app/orders/order-checkout",
            {
                email: email,
                toPurchase: checkOutDetails,
            },
            { withCredentials: true }
        );
        return data;
    } catch (error) {
        if (error instanceof Error) return error.message;
    }
};

export const getOrdersRequest = async (email: string) => {
    try {
        const { data } = await axios.post(
            "https://backend-commerce.vercel.app/orders",
            // "http://localhost:8002/orders",
            { email: email },
            { withCredentials: true }
        );
        return data;
    } catch (error) {
        if (error instanceof Error) return error.message;
    }
};

export const cancelOrderRequest = async (order_id: string, email: string) => {
    try {
        const { data } = await axios.post(
            "https://backend-commerce.vercel.app/orders/cancel-order",
            { email: email, order_id: order_id },
            { withCredentials: true }
        );
        return data;
    } catch (error) {
        if (error instanceof Error) return error.message;
    }
};

export const receiveOrderRequest = async (order_id: string, email: string) => {
    try {
        const { data } = await axios.post(
            "https://backend-commerce.vercel.app/orders/order-status-received",
            { email: email, order_id: order_id },
            { withCredentials: true }
        );
        return data;
    } catch (error) {
        if (error instanceof Error) return error.message;
    }
};
