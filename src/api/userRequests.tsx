import axios from "axios";

export const updateSellerStatusRequest = async (email: string, user_id: string) => {
    try {
        const { data } = await axios.patch(
            `https://backend-commerce.vercel.app/user/${user_id}/update-user-type`,
            {
                email: email,
            },
            {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            }
        );
        return data;
    } catch (error) {
        if (error instanceof Error) return error.message;
    }
};

export const changePasswordRequest = async (
    email: string,
    user_id: string,
    passwords: { oldPassword: string; newPassword: string }
) => {
    try {
        const { data } = await axios.patch(
            `https://backend-commerce.vercel.app/user/${user_id}/change-password`,
            {
                email: email,
                oldPassword: passwords.oldPassword,
                newPassword: passwords.newPassword,
            },
            {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            }
        );
        return data;
    } catch (error) {
        if (error instanceof Error) return error.message;
    }
};
