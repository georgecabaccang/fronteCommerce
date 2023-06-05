import axios from "axios";

export const refreshTokenRequest = async (email: string) => {
    try {
        const { data } = await axios.post(
            "https://backend-commerce.vercel.app/user/refreshLogin",
            // "http://localhost:8002/user/refreshLogin",
            {
                email: email,
            },
            { withCredentials: true }
        );
        return data;
    } catch (error) {
        if (error instanceof Error) return error.message;
    }
};
