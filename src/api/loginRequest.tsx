import axios from "axios";
import { ILoginUser } from "../types/userRequestTypes";

export const userLogin = async (userCredentials: ILoginUser) => {
    try {
        const { data } = await axios.post("http://localhost:8002/user/login", {
            email: userCredentials.email,
            password: userCredentials.password,
        });
        if (data.tokens) {
            localStorage.setItem("token", data.tokens.accessToken);
            localStorage.setItem("refreshToken", data.tokens.refreshToken);
        } else {
            console.log("no tokens");
        }
    } catch (error) {
        if (error instanceof Error) return error.message;
    }
};
