import axios from "axios";

export const itemInCartChangeQuantity = async (quantity: number, productID: string) => {
    try {
        const response = await axios.put(
            "http://localhost:8002/cart/change-quantity",
            {
                email: localStorage.getItem("userEmail"),
                quantity: quantity,
                productID: productID,
            },
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        return response;
    } catch (error) {
        if (error instanceof Error) return error.message;
    }
};
