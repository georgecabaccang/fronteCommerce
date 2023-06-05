import axios, { AxiosError } from "axios";
import { IUserDetails } from "../types/userRequestTypes";

export const userLogin = async (userCredentials: IUserDetails) => {
    try {
        const { data } = await axios.post(
            "https://backend-commerce.vercel.app/user/login",
            // "http://localhost:8002/user/login",
            {
                email: userCredentials.email,
                password: userCredentials.password,
            },
            { withCredentials: true }
        );
        return data;
    } catch (error) {
        if (error instanceof AxiosError) return error.message;
    }
};

// export const getUserProfileRequest = async (user_id: string) => {
//     try {
//         const { data } = await axios.get(
//             `https://backend-commerce.vercel.app/user/profile/${user_id}`,
//             {
//                 headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//             }
//         );
//         return data;
//     } catch (error) {
//         if (error instanceof Error) return error.message;
//     }
// };
