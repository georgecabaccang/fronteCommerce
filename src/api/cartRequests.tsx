import axios from "axios";

// GET USER CART
export const getUserCartRequest = async (email: string) => {
    try {
        const { data } = await axios.post(
            "https://backend-commerce.vercel.app/cart",
            { email: email },
            { withCredentials: true }
        );
        return data;
    } catch (error) {
        if (error instanceof Error) return error.message;
    }
};

// ADD ITEMS TO CART
export const addToCartRequest = async (
    productToBeAddedToCart: {
        prod_id: string;
        quantity: number;
    },
    email: string
) => {
    console.log(email);
    try {
        const { data } = await axios.post(
            "https://backend-commerce.vercel.app/cart/add-to-cart",
            {
                prod_id: productToBeAddedToCart.prod_id,
                quantity: productToBeAddedToCart.quantity,
                email: email,
            },
            { withCredentials: true }
        );
        return data;
    } catch (error) {
        if (error instanceof Error) return error.message;
    }
};

// REMOVE ITEMS FROM CART
export const removeFromCartRequest = async (itemInCartId: string, email: string) => {
    try {
        await axios.delete("https://backend-commerce.vercel.app/cart/remove-from-cart", {
            data: {
                email: email,
                prod_id: itemInCartId,
            },
            withCredentials: true,
        });
    } catch (error) {
        if (error instanceof Error) return error.message;
    }
};

// CHANGING QUANTITY OF ITEMS IN CRART
export const itemInCartChangeQuantity = async (
    quantity: number,
    prod_id: string,
    email: string
) => {
    try {
        const response = await axios.put(
            "https://backend-commerce.vercel.app/cart/change-quantity",
            {
                email: email,
                quantity: quantity,
                prod_id: prod_id,
            },
            { withCredentials: true }
        );
        return response;
    } catch (error) {
        if (error instanceof Error) return error.message;
    }
};
