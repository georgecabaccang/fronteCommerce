import axios from "axios";
import { IItemsProperties } from "../types/cartTypes";

// GET USER CART
export const getUserCart = async () => {
    try {
        const { data } = await axios.post(
            "http://localhost:8002/cart",
            { email: localStorage.getItem("userEmail") },
            {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            }
        );
        return data;
    } catch (error) {
        if (error instanceof Error) return error.message;
    }
};

// ADD ITEMS TO CART
export const addToCartRequest = async (productToBeAddedToCart: {
    prod_id: string;
    quantity: number;
}) => {
    try {
        const { data } = await axios.post(
            "http://localhost:8002/cart/add-to-cart",
            {
                prod_id: productToBeAddedToCart.prod_id,
                quantity: productToBeAddedToCart.quantity,
                email: localStorage.getItem("userEmail"),
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

export const removeFromCartRequest = async (itemInCartId: string) => {
    try {
        await axios.delete("http://localhost:8002/cart/remove-from-cart", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            data: {
                email: localStorage.getItem("userEmail"),
                prod_id: itemInCartId,
            },
        });
    } catch (error) {
        if (error instanceof Error) return error.message;
    }
};

// CHANGING QUANTITY OF ITEMS IN CRART
export const itemInCartChangeQuantity = async (quantity: number, prod_id: string) => {
    try {
        const response = await axios.put(
            "http://localhost:8002/cart/change-quantity",
            {
                email: localStorage.getItem("userEmail"),
                quantity: quantity,
                prod_id: prod_id,
            },
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        return response;
    } catch (error) {
        if (error instanceof Error) return error.message;
    }
};

export const addToCheckOutRequest = async (itemToCheckOut: IItemsProperties) => {
    try {
        const { data } = await axios.post(
            "http://localhost:8002/cart/add-to-checkout",
            { email: localStorage.getItem("userEmail"), itemToCheckOut: itemToCheckOut },
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        return data;
    } catch (error) {
        if (error instanceof Error) return error.message;
    }
};

export const removeFromCheckOutRequest = async (removeFromCheckOut: string) => {
    try {
        const { data } = await axios.post(
            "http://localhost:8002/cart/remove-from-checkout",
            { email: localStorage.getItem("userEmail"), itemToRemove: removeFromCheckOut },
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        return data;
    } catch (error) {
        if (error instanceof Error) return error.message;
    }
};

export const getCheckOutItemsRequest = async () => {
    try {
        const { data } = await axios.post(
            "http://localhost:8002/cart/get-to-checkout-items",
            { email: localStorage.getItem("userEmail") },
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        return data;
    } catch (error) {
        if (error instanceof Error) return error.message;
    }
};

export const deleteCheckOutInstanceRequest = async () => {
    try {
        const { data } = await axios.post(
            "http://localhost:8002/orders/delete-checkout-instance",
            { email: localStorage.getItem("userEmail") },
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        return data;
    } catch (error) {
        if (error instanceof Error) return error.message;
    }
};
