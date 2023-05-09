import axios from "axios";

export const addToCart = async () => {
    try {
        const { data } = await axios.post("http://localhost:8002/cart/add-to-cart");
        return data;
    } catch (error) {
        if (error instanceof Error) return error.message;
    }
};
