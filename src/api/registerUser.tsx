import axios from "../axios";

export const registerUser = async (hashedCredentials: string) => {
    try {
        const { data } = await axios.post("/user/register", {
            hashedCredentials: hashedCredentials,
        });
        if (data === "email is taken") {
            return data;
        }
        return data;
    } catch (error) {
        if (error instanceof Error) return error.message;
    }
};
