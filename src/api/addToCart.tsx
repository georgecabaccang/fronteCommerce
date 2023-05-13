import axios from "axios";
import { IItemsProperties } from "../types/cartTypes";

export const addToCartRequest = async (productToBeAddedToCart: IItemsProperties) => {
    try {
        const { data } = await axios.post(
            "http://localhost:8002/cart/add-to-cart",
            {
                productID: productToBeAddedToCart.productID,
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
