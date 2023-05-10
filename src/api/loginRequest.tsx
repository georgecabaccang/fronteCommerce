import axios from "axios";
import { IUserDetails } from "../types/userRequestTypes";

export const userLogin = async (userCredentials: IUserDetails) => {
    try {
        const { data } = await axios.post("http://localhost:8002/user/login", {
            email: userCredentials.email,
            password: userCredentials.password,
        });
        if (data.tokens) {
            localStorage.setItem("userEmail", userCredentials.email as string);
            localStorage.setItem("token", data.tokens.accessToken);
            localStorage.setItem("refreshToken", data.tokens.refreshToken);
        } else {
            return "no tokens";
        }
    } catch (error) {
        if (error instanceof Error) return error.message;
    }
};
