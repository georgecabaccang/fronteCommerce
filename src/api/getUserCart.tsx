import axios from "axios";

export const getUserCart = async () => {
    try {
        const { data } = await axios.get("http://localhost:8002/cart", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        return data;
    } catch (error) {
        if (error instanceof Error) return error.message;
    }
};
