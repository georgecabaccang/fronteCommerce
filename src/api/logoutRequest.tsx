import axios from "axios";

export const logoutRequest = async (refreshToken: string) => {
    try {
        const { data } = await axios.post("https://backend-commerce.vercel.app/user/logout", {
            refreshToken: refreshToken,
        });
        return data.acknowledged;
    } catch (error) {
        if (error instanceof Error) return error.message;
    }
};
