import axios from "axios";

export const refreshTokenRequest = async (refreshToken: string, email: string) => {
    try {
        const { data } = await axios.post("http://localhost:8002/user/refreshLogin", {
            email: email,
            refreshToken: refreshToken,
        });
        console.log(data);
    } catch (error) {
        if (error instanceof Error) return error.message;
    }
};
