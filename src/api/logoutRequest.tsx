import axios from "axios";

export const logoutRequest = async () => {
    try {
        const { data } = await axios.delete(
            "https://backend-commerce.vercel.app/user/logout",
            // "http://localhost:8002/user/logout",
            { withCredentials: true }
        );
        return data.acknowledged;
    } catch (error) {
        if (error instanceof Error) return error.message;
    }
};
