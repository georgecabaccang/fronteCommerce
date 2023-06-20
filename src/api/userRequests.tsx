import { AxiosError } from "axios";
import axios from "../axios";

export const updateSellerStatusRequest = async (email: string, user_id: string) => {
    try {
        const { data } = await axios.patch(
            `/user/${user_id}/update-user-type`,
            {
                email: email,
            },
            { withCredentials: true }
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
            `/user/${user_id}/change-password`,
            {
                email: email,
                oldPassword: passwords.oldPassword,
                newPassword: passwords.newPassword,
            },
            { withCredentials: true }
        );
        return data;
    } catch (error) {
        if (error instanceof Error) return error.message;
    }
};

export const getUserProfileDetailsRequest = async (email: string) => {
    try {
        const { data } = await axios.post(
            "/user/profile-details",
            {
                email: email,
            },
            { withCredentials: true }
        );
        return data;
    } catch (error) {
        if (error instanceof Error) return error.message;
    }
};

export const deleteAccountRequest = async (email: string) => {
    try {
        const response = await axios.post(
            `user/delete-account`,
            { email: email },
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) return error.message;
    }
};

export const resetPasswordRequest = async (email: string) => {
    try {
        const response = await axios.post("/user/reset-password", { email: email });
        return response;
    } catch (error) {
        if (error instanceof AxiosError) return error.code;
    }
};

export const setNewPasswordRequest = async (
    user_id: string,
    resetPasswordToken: string,
    password: string
) => {
    try {
        const response = await axios.patch(
            `/user/${user_id}/set-new-password/${resetPasswordToken}`,
            { data: { newPassword: password } }
        );
        return response;
    } catch (error) {
        if (error instanceof AxiosError) return error.code;
    }
};
