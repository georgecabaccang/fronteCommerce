import axios from "axios";

export const logout = async (refreshToken: string) => {
    try {
        const { data } = await axios.post("http://localhost:8002/user/logout", {
            refreshToken: refreshToken,
        });
        return data;
    } catch (error) {
        if (error instanceof Error) return error.message;
    }
};
