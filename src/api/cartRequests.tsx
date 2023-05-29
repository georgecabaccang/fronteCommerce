import axios from "axios";

// GET USER CART
export const getUserCart = async () => {
    try {
        const { data } = await axios.post(
            "https://backend-commerce.vercel.app/cart",
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
            "https://backend-commerce.vercel.app/cart/add-to-cart",
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

// REMOVE ITEMS FROM CART
export const removeFromCartRequest = async (itemInCartId: string) => {
    try {
        await axios.delete("https://backend-commerce.vercel.app/cart/remove-from-cart", {
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
            "https://backend-commerce.vercel.app/cart/change-quantity",
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
