import axios from "axios";

export const logoutRequest = async (refreshToken: string) => {
    try {
        const { data } = await axios.post("http://localhost:8002/user/logout", {
            refreshToken: refreshToken,
        });
        return data.acknowledged;
    } catch (error) {
        if (error instanceof Error) return error.message;
    }
};
