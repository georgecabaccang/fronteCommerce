import axios from "axios";
import { IUserDetails } from "../types/userRequestTypes";

export const registerUser = async (userDetails: IUserDetails) => {
    try {
        const { data } = await axios.post("https://backend-commerce.vercel.app/user/register", {
            email: userDetails.email,
            password: userDetails.password,
        });
        if (data === "email is taken") {
            return data;
        }
        return data;
    } catch (error) {
        if (error instanceof Error) return error.message;
    }
};
