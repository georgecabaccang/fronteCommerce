import axios from "axios";

export const refreshTokenRequest = async (refreshToken: string, email: string) => {
    try {
        const { data } = await axios.post("https://keen-profiterole-fc0f7a.netlify.app/user/refreshLogin", {
            email: email,
            refreshToken: refreshToken,
        });
        return data;
    } catch (error) {
        if (error instanceof Error) return error.message;
    }
};
