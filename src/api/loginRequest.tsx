import { AxiosError } from "axios";
import axios from "../axios";

export const userLogin = async (hashedCredentials: string) => {
    try {
        const { data } = await axios.post(
            "/user/login",
            {
                hashedCredentials: hashedCredentials,
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
